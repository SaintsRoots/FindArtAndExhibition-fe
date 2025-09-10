import { useState, useEffect, useRef } from "react";
import {
  Send,
  MessageCircle,
  Paperclip,
  X,
  FileText,
} from "lucide-react";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserConversations,
  getMessagesBetweenUsers,
  sendMessage,
  getUnreadCount,
  getAllArtists,
  getOrCreateConversation,
  selectConversations,
  selectMessages,
  selectArtists,
  selectChatLoading,
  selectUnreadCount,
  // selectChatError,
  // selectCurrentConversation,
} from "../features/chats/chartSlice";

const Chat = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("messages");
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const userId = localStorage.getItem("identity");
  const dispatch = useDispatch();
  const conversations = useSelector(selectConversations);
  const messages = useSelector(selectMessages);
  const artists = useSelector(selectArtists);
  const loading = useSelector(selectChatLoading);
  const unreadCount = useSelector(selectUnreadCount);
  // const error = useSelector(selectChatError);
  // const currentConversation = useSelector(selectCurrentConversation);

  useEffect(() => {
    if (userId) {
      dispatch(getUserConversations(userId));
      dispatch(getUnreadCount(userId));
      dispatch(getAllArtists());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoadMessages = (otherUserId) => {
    dispatch(getMessagesBetweenUsers({ userId, otherUserId }));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!activeConversation) return;

    const otherUser = activeConversation.participants.find(
      (p) => p._id !== userId
    );
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

    try {
      await dispatch(sendMessage(messageData)).unwrap();
      setNewMessage("");
      setSelectedFile(null);
      dispatch(getUserConversations(userId));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const startNewConversation = async (artist) => {
    try {
      const result = await dispatch(
        getOrCreateConversation({
          userId1: userId,
          userId2: artist._id,
        })
      ).unwrap();
      setActiveConversation(result);
      setActiveTab("messages");
      dispatch(
        getMessagesBetweenUsers({
          userId,
          otherUserId: artist._id,
        })
      );
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    const otherUser = conversation.participants.find((p) => p._id !== userId);
    handleLoadMessages(otherUser._id);
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

  if (loading && !conversations.length) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">Loading conversations...</div>
      </div>
    );
  }

  return (
    <div className="container px-10 p-5 mx-auto">
      <div className="flex h-screen mt-32 container mx-auto p-3  bg-gray-100 shadow-md rounded-lg">
        {/* Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-3">Chat</h2>
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
                  {unreadCount > 0 && (
                    <span className="-ml-2 absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
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
                {conversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No conversations yet. Start by messaging an artist!
                  </div>
                ) : (
                  conversations.map((conversation) => {
                    const otherUser = conversation.participants.find(
                      (p) => p._id !== userId
                    );
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
                          <img
                            src={otherUser.img}
                            alt={otherUser.name}
                            className="w-12 h-12 rounded-full mr-3 object-cover"
                            onError={(e) =>
                              (e.target.src = "/fallback-avatar.png")
                            }
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium truncate">
                                {otherUser.name}
                              </h3>
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                {formatTime(conversation.lastMessageAt)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {conversation.lastMessage?.content ||
                                "Start a conversation"}
                            </p>
                            <span className="text-xs text-blue-500">
                              {otherUser.role}
                            </span>
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
                {artists.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No artists available
                  </div>
                ) : (
                  artists.map((artist) => (
                    <div
                      key={artist._id}
                      onClick={() => startNewConversation(artist)}
                      className="flex items-center p-3 hover:bg-blue-50 rounded-lg cursor-pointer mb-1"
                    >
                      <img
                        src={artist.img}
                        alt={artist.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                        onError={(e) => (e.target.src = "/fallback-avatar.png")}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {artist.name}
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
                  ))
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
                <div className="flex items-center">
                  {(() => {
                    const otherUser = activeConversation.participants.find(
                      (p) => p._id !== userId
                    );
                    return (
                      <>
                        <img
                          src={otherUser.img}
                          alt={otherUser.name}
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                          onError={(e) =>
                            (e.target.src = "/fallback-avatar.png")
                          }
                        />
                        <div>
                          <h3 className="font-medium">{otherUser.name}</h3>
                          <p className="text-sm text-gray-500">
                            {otherUser.role}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {loading ? (
                  <div className="text-center text-gray-500 py-4">
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <MessageCircle
                      size={48}
                      className="mx-auto mb-2 opacity-50"
                    />
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((message, index) => {
                    const showDateHeader =
                      index === 0 ||
                      formatDate(message.createdAt) !==
                        formatDate(messages[index - 1].createdAt);

                    return (
                      <div key={message._id}>
                        {showDateHeader && (
                          <div className="text-center text-xs text-gray-500 my-4">
                            {formatDate(message.createdAt)}
                          </div>
                        )}
                        <div
                          className={`flex ${
                            message.sender._id === userId
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender._id === userId
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-800 border border-gray-200"
                            }`}
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
                              {formatTime(message.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* File Preview without File Name */}
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
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {(newMessage.trim() || selectedFile) && (
                    <button
                      type="submit"
                      className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      {
                        loading ? "Sending..." :  <Send size={20} />

                      }
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
