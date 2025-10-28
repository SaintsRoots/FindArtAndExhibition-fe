import { useState, useEffect, useRef } from "react";
import { Send, MessageCircle, Paperclip, X, FileText } from "lucide-react";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserConversations,
  getMessagesBetweenUsers,
  sendMessage as sendMessageAPI,
  getUnreadCount,
  getAllArtists,
  getOrCreateConversation,
  selectConversations,
  selectMessages,
  selectArtists,
  selectChatLoading,
  selectUnreadCount,
} from "../features/chats/chartSlice";
import { useSocket } from "../context/SocketContext";

const Chat = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("messages");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);
  const [localConversations, setLocalConversations] = useState([]);
  const [localArtists, setLocalArtists] = useState([]);
  const [localUnreadCount, setLocalUnreadCount] = useState(0);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const socketRef = useRef(null);

  const userId = localStorage.getItem("identity");
  const userName = localStorage.getItem("name");
  const userProfile = localStorage.getItem("profile");
  const dispatch = useDispatch();

  const reduxConversations = useSelector(selectConversations);
  const reduxMessages = useSelector(selectMessages);
  const reduxArtists = useSelector(selectArtists);
  const loading = useSelector(selectChatLoading);
  const reduxUnreadCount = useSelector(selectUnreadCount);

  const {
    socket,
    isConnected,
    conversations: socketConversations,
    unreadCount: socketUnreadCount,
    onlineUsers,
    currentMessages,
    typingUsers,
    sendMessage: socketSendMessage,
    startTyping: socketStartTyping,
    stopTyping: socketStopTyping,
    markMessageAsRead,
    setCurrentConversation: setSocketCurrentConversation,
  } = useSocket();

  // Initialize socket reference
  useEffect(() => {
    socketRef.current = socket;
  }, [socket]);

  // Use real-time data when available, fallback to Redux data
  const displayConversations =
    socketConversations.length > 0
      ? socketConversations
      : localConversations.length > 0
      ? localConversations
      : reduxConversations;

  const displayUnreadCount =
    socketUnreadCount > 0
      ? socketUnreadCount
      : localUnreadCount > 0
      ? localUnreadCount
      : reduxUnreadCount;

  const displayArtists = localArtists.length > 0 ? localArtists : reduxArtists;

  // Load initial data and set up socket listeners
  useEffect(() => {
    if (userId) {
      // Load initial data via Redux as fallback
      dispatch(getUserConversations(userId));
      dispatch(getUnreadCount(userId));
      dispatch(getAllArtists());

      // Set up socket listeners if socket is available
      if (socket && isConnected) {
        setupSocketListeners();

        // Request real-time data
        socket.emit("conversations:load");
        socket.emit("unread:count");
        socket.emit("artists:load");
      }
    }

    return () => {
      // Clean up socket listeners
      if (socketRef.current) {
        socketRef.current.off("conversations:loaded");
        socketRef.current.off("messages:loaded");
        socketRef.current.off("artists:loaded");
        socketRef.current.off("unread:count");
        socketRef.current.off("conversation:created");
        socketRef.current.off("conversations:updated");
      }
    };
  }, [dispatch, userId, socket, isConnected]);

  // Set up socket event listeners
  const setupSocketListeners = () => {
    if (!socket) return;

    socket.on("conversations:loaded", (conversations) => {
      setLocalConversations(conversations);
    });

    socket.on("messages:loaded", (data) => {
      if (activeConversation) {
        const otherUser = activeConversation.participants.find(
          (p) => p._id !== userId
        );
        if (otherUser && data.otherUserId === otherUser._id) {
          setLocalMessages(data.messages);
        }
      }
    });

    socket.on("artists:loaded", (artists) => {
      setLocalArtists(artists);
    });

    socket.on("unread:count", (count) => {
      setLocalUnreadCount(count);
    });

    socket.on("conversation:created", (conversation) => {
      setActiveConversation(conversation);
      setActiveTab("messages");
      const otherUser = conversation.participants.find((p) => p._id !== userId);
      if (otherUser) {
        setSocketCurrentConversation(otherUser._id);
        // Load messages for the new conversation
        socket.emit("messages:load", { otherUserId: otherUser._id });
      }
    });

    socket.on("conversations:updated", (conversations) => {
      setLocalConversations(conversations);
    });
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [reduxMessages, currentMessages, localMessages]);

  // Set current conversation and load messages when active conversation changes
  useEffect(() => {
    if (activeConversation && userId) {
      const otherUser = activeConversation.participants.find(
        (p) => p._id !== userId
      );
      if (otherUser) {
        setSocketCurrentConversation(otherUser._id);

        // Load messages via socket if connected, otherwise use Redux
        if (socket && isConnected) {
          socket.emit("messages:load", { otherUserId: otherUser._id });
        } else {
          dispatch(
            getMessagesBetweenUsers({ userId, otherUserId: otherUser._id })
          );
        }

        // Mark messages as read when opening conversation
        const messagesToMark =
          localMessages.length > 0 ? localMessages : reduxMessages;
        messagesToMark.forEach((message) => {
          if (message.sender._id !== userId && !message.isRead) {
            markMessageAsRead(message._id, message.sender._id);
          }
        });
      }
    }
  }, [
    activeConversation,
    userId,
    socket,
    isConnected,
    dispatch,
    setSocketCurrentConversation,
    markMessageAsRead,
  ]);

  // Handle typing indicators
  useEffect(() => {
    if (activeConversation) {
      const otherUser = activeConversation.participants.find(
        (p) => p._id !== userId
      );
      if (otherUser && typingUsers.has(otherUser._id)) {
        setIsTyping(true);

        // Clear existing timeout
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        // Auto-clear typing after 3 seconds
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      } else {
        setIsTyping(false);
      }
    }
  }, [typingUsers, activeConversation, userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoadMessages = (otherUserId) => {
    if (socket && isConnected) {
      socket.emit("messages:load", { otherUserId });
    } else {
      dispatch(getMessagesBetweenUsers({ userId, otherUserId }));
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!newMessage.trim() && !selectedFile) || !activeConversation) return;

    const otherUser = activeConversation.participants.find(
      (p) => p._id !== userId
    );
    if (!otherUser) return;

    // Stop typing indicator
    socketStopTyping(otherUser._id);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    try {
      // Use socket for real-time messaging (preferred)
      if (isConnected && socket) {
        socketSendMessage(
          otherUser._id,
          newMessage.trim(),
          selectedFile ? "file" : "text"
        );

        // Optimistically add message to local state
        const optimisticMessage = {
          _id: Date.now().toString(), // Temporary ID
          senderId: userId,
          senderName: userName,
          senderImg: userProfile,
          receiverId: otherUser._id,
          content: newMessage.trim(),
          messageType: selectedFile ? "file" : "text",
          timestamp: new Date(),
          isRead: false,
          isOptimistic: true, // Flag to identify optimistic messages
        };

        setLocalMessages((prev) => [...prev, optimisticMessage]);
      } else {
        // Fallback to API
        const messageData = {
          sender: userId,
          receiver: otherUser._id,
          content: newMessage.trim(),
          messageType: selectedFile
            ? selectedFile.type.startsWith("image/")
              ? "image"
              : "file"
            : "text",
          fileUrl: selectedFile || null,
        };

        await dispatch(sendMessageAPI(messageData)).unwrap();
        dispatch(getUserConversations(userId));
      }

      setNewMessage("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove optimistic message if there was an error
      setLocalMessages((prev) => prev.filter((msg) => !msg.isOptimistic));
    }
  };

  const handleTyping = () => {
    if (!activeConversation || !isConnected) return;

    const otherUser = activeConversation.participants.find(
      (p) => p._id !== userId
    );
    if (!otherUser) return;

    // Start typing
    socketStartTyping(otherUser._id);

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      socketStopTyping(otherUser._id);
    }, 3000);
  };

  const startNewConversation = async (artist) => {
    try {
      if (socket && isConnected) {
        // Use socket to create conversation in real-time
        socket.emit("conversation:create", { otherUserId: artist._id });
      } else {
        // Fallback to Redux
        const result = await dispatch(
          getOrCreateConversation({
            userId1: userId,
            userId2: artist._id,
          })
        ).unwrap();

        setActiveConversation(result);
        setActiveTab("messages");
        setSocketCurrentConversation(artist._id);
        handleLoadMessages(artist._id);
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    const otherUser = conversation.participants.find((p) => p._id !== userId);
    if (otherUser) {
      setSocketCurrentConversation(otherUser._id);
      handleLoadMessages(otherUser._id);
    }
    setActiveTab("messages");
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  // Combine all message sources for display
  const getDisplayMessages = () => {
    if (!activeConversation) return [];

    const otherUser = activeConversation.participants.find(
      (p) => p._id !== userId
    );
    if (!otherUser) return [];

    // Get messages from all sources
    const apiMessages = reduxMessages || [];
    const socketMessages = currentMessages || [];
    const localMessagesList = localMessages || [];

    // Create a map to avoid duplicates (using ID as key)
    const messageMap = new Map();

    // Add API messages first
    apiMessages.forEach((msg) => {
      if (msg._id) {
        messageMap.set(msg._id, {
          ...msg,
          senderId: msg.sender?._id,
          timestamp: msg.createdAt,
        });
      }
    });

    // Add socket messages (override with latest)
    socketMessages.forEach((msg) => {
      if (
        msg._id &&
        (msg.senderId === otherUser._id ||
          (msg.senderId === userId && msg.receiverId === otherUser._id))
      ) {
        messageMap.set(msg._id, {
          ...msg,
          sender:
            msg.senderId === userId
              ? { _id: userId, name: userName, img: userProfile }
              : {
                  _id: otherUser._id,
                  name: otherUser.name,
                  img: otherUser.img,
                },
          createdAt: msg.timestamp,
        });
      }
    });

    // Add local messages (including optimistic ones)
    localMessagesList.forEach((msg) => {
      if (
        msg._id &&
        (msg.senderId === otherUser._id ||
          (msg.senderId === userId && msg.receiverId === otherUser._id))
      ) {
        messageMap.set(msg._id, {
          ...msg,
          sender:
            msg.senderId === userId
              ? { _id: userId, name: userName, img: userProfile }
              : {
                  _id: otherUser._id,
                  name: otherUser.name,
                  img: otherUser.img,
                },
          createdAt: msg.timestamp,
        });
      }
    });

    // Convert to array and sort by timestamp
    return Array.from(messageMap.values()).sort(
      (a, b) =>
        new Date(a.createdAt || a.timestamp) -
        new Date(b.createdAt || b.timestamp)
    );
  };

  const displayMessages = getDisplayMessages();

  if (loading && !displayConversations.length) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">Loading conversations...</div>
      </div>
    );
  }

  return (
    <div className="container px-10 p-5 mx-auto">
      <div className="flex h-screen mt-32 container mx-auto p-3 bg-gray-100 shadow-md rounded-lg">
        {/* Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-3">
              Chat {isConnected ? "🟢" : "🔴"}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("messages")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                  activeTab === "messages"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="relative">
                  Messages{" "}
                  {displayUnreadCount > 0 && (
                    <span className="-ml-2 absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {displayUnreadCount}
                    </span>
                  )}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("artists")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                  activeTab === "artists"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Artists
              </button>
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-140px)]">
            {activeTab === "messages" ? (
              <div>
                {displayConversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No conversations yet. Start by messaging an artist!
                  </div>
                ) : (
                  displayConversations.map((conversation) => {
                    const otherUser = conversation.participants.find(
                      (p) => p._id !== userId
                    );
                    const isOnline = onlineUsers.includes(otherUser._id);

                    return (
                      <div
                        key={conversation._id}
                        onClick={() => handleSelectConversation(conversation)}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                          activeConversation?._id === conversation._id
                            ? "bg-blue-50"
                            : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <img
                              src={otherUser.img}
                              alt={otherUser.name}
                              className="w-12 h-12 rounded-full mr-3 object-cover"
                              onError={(e) =>
                                (e.target.src = "/fallback-avatar.png")
                              }
                            />
                            {isOnline && (
                              <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium truncate">
                                {otherUser.name}
                              </h3>
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                {formatTime(
                                  conversation.lastMessageAt ||
                                    conversation.updatedAt
                                )}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {conversation.lastMessage?.content ||
                                "Start a conversation"}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-blue-500">
                                {otherUser.role}
                              </span>
                              {isOnline && (
                                <span className="text-xs text-green-500">
                                  Online
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <div className="p-2">
                <h3 className="font-medium p-2 mb-1">Available Artists</h3>
                {displayArtists.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No artists available
                  </div>
                ) : (
                  displayArtists.map((artist) => {
                    const isOnline = onlineUsers.includes(artist._id);
                    return (
                      <div
                        key={artist._id}
                        onClick={() => startNewConversation(artist)}
                        className="flex items-center p-3 hover:bg-blue-50 rounded-lg cursor-pointer mb-1"
                      >
                        <div className="relative">
                          <img
                            src={artist.img}
                            alt={artist.name}
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                            onError={(e) =>
                              (e.target.src = "/fallback-avatar.png")
                            }
                          />
                          {isOnline && (
                            <div className="absolute bottom-0 right-2 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate flex items-center gap-2">
                            {artist.name}
                            {isOnline && (
                              <span className="text-xs text-green-500">
                                Online
                              </span>
                            )}
                          </div>
                          <div className="text-xs flex items-center gap-2 text-gray-500 truncate">
                            <FaLocationDot />
                            {artist.province &&
                            artist.district &&
                            artist.sector ? (
                              <>
                                {artist.province} / {artist.district} /{" "}
                                {artist.sector}
                              </>
                            ) : (
                              <span>No Location Provided</span>
                            )}
                          </div>
                        </div>
                        <button className="text-blue-500 text-sm font-medium hover:text-blue-700">
                          Message
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {(() => {
                      const otherUser = activeConversation.participants.find(
                        (p) => p._id !== userId
                      );
                      const isOnline = onlineUsers.includes(otherUser._id);

                      return (
                        <>
                          <div className="relative">
                            <img
                              src={otherUser.img}
                              alt={otherUser.name}
                              className="w-10 h-10 rounded-full mr-3 object-cover"
                              onError={(e) =>
                                (e.target.src = "/fallback-avatar.png")
                              }
                            />
                            {isOnline && (
                              <div className="absolute bottom-0 right-2 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{otherUser.name}</h3>
                            <p className="text-sm text-gray-500">
                              {otherUser.role} {isOnline && "• Online"}
                              {!isConnected && " • Connecting..."}
                            </p>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  {!isConnected && (
                    <div className="text-xs text-orange-500 bg-orange-50 px-2 py-1 rounded">
                      Offline - reconnecting...
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {loading && displayMessages.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">
                    Loading messages...
                  </div>
                ) : displayMessages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <MessageCircle
                      size={48}
                      className="mx-auto mb-2 opacity-50"
                    />
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  displayMessages.map((message, index) => {
                    const showDateHeader =
                      index === 0 ||
                      formatDate(message.createdAt || message.timestamp) !==
                        formatDate(
                          displayMessages[index - 1].createdAt ||
                            displayMessages[index - 1].timestamp
                        );

                    const isOwnMessage =
                      message.sender?._id === userId ||
                      message.senderId === userId;
                    const isOptimistic = message.isOptimistic;

                    return (
                      <div key={message._id || message.timestamp?.getTime()}>
                        {showDateHeader && (
                          <div className="text-center text-xs text-gray-500 my-4">
                            {formatDate(message.createdAt || message.timestamp)}
                          </div>
                        )}
                        <div
                          className={`flex ${
                            isOwnMessage ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              isOwnMessage
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-800 border border-gray-200"
                            } ${isOptimistic ? "opacity-700" : ""}`}
                          >
                            {message.messageType === "image" &&
                              message.fileUrl && (
                                <div className="mb-2">
                                  <img
                                    src={message.fileUrl}
                                    alt="Shared content"
                                    className="max-w-full max-h-64 h-auto rounded object-contain"
                                    onError={(e) =>
                                      (e.target.src = "/fallback-image.png")
                                    }
                                  />
                                </div>
                              )}
                            {message.messageType === "file" &&
                              message.fileUrl && (
                                <div className="mb-2 flex items-center">
                                  <FileText size={16} className="mr-2" />
                                  <a
                                    href={message.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                  >
                                    Download file
                                  </a>
                                </div>
                              )}
                            {message.content &&
                              message.content.trim().length > 0 && (
                                <p className="break-words">{message.content}</p>
                              )}
                            <p className="text-xs mt-1 opacity-75 text-right">
                              {formatTime(
                                message.createdAt || message.timestamp
                              )}
                              {message.isRead && " • Read"}
                              {/* {isOptimistic && " • Sending..."} */}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-white text-gray-800 border border-gray-200">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* File Preview */}
              {selectedFile && (
                <div className="p-3 bg-gray-100 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    {selectedFile.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="w-12 h-12 rounded mr-2 object-cover"
                        onError={(e) => (e.target.src = "/fallback-image.png")}
                      />
                    ) : (
                      <FileText size={20} className="text-blue-500 mr-2" />
                    )}
                  </div>
                  <button
                    onClick={removeSelectedFile}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-gray-200 bg-white"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                  >
                    <Paperclip size={20} />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      if (e.target.value.trim()) {
                        handleTyping();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                    placeholder="Type a message..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {(newMessage.trim() || selectedFile) && (
                    <button
                      type="submit"
                      disabled={loading}
                      className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <Send size={20} />
                      )}
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center text-gray-500 p-4">
                <MessageCircle size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-1">
                  Welcome to your messages
                </p>
                <p className="text-sm">
                  Select a conversation or start a new one with an artist
                </p>
                <button
                  onClick={() => setActiveTab("artists")}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Browse Artists
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
