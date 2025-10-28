"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { io } from "socket.io-client";

const SocketContext = createContext({
  socket: null,
  isConnected: false,
  conversations: [],
  unreadCount: 0,
  onlineUsers: [],
  currentMessages: [],
  typingUsers: new Map(),
  sendMessage: () => {},
  startTyping: () => {},
  stopTyping: () => {},
  markMessageAsRead: () => {},
  setCurrentConversation: () => {},
});

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }) {
  const apiUrl = process.env.REACT_APP_SOCKET_URL;
  console.log("Socket API URL &&&&&&&&&&", apiUrl);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Map());
  const [currentConversationUserId, setCurrentConversationUserId] =
    useState(null);

  const userId = localStorage.getItem("identity");
  const profile = localStorage.getItem("profile");
  const name = localStorage.getItem("name");
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(new Map());

  useEffect(() => {
    // Only initialize socket if user is logged in
    if (!userId) {
      if (socketRef.current) {
        console.log("Disconnecting socket due to no user/token");
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
        setIsConnected(false);
        setConversations([]);
        setUnreadCount(0);
        setOnlineUsers([]);
        setCurrentMessages([]);
      }
      return;
    }

    if (socketRef.current) {
      return;
    }

    // Initialize socket.io connection with userId in auth
    const socketInstance = io(apiUrl, {
      auth: {
        userId, // Send userId for authentication
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      transports: ["websocket", "polling"],
    });

    // Connection established
    socketInstance.on("connect", () => {
      console.log("Initializing socket connection");
      console.log("Socket connected with ID:", socketInstance.id);
      setIsConnected(true);
    });

    // User connected - receive initial data
    socketInstance.on("user:connected", (data) => {
      console.log("User connected data received:", data);
      setConversations(data.conversations || []);
      setUnreadCount(data.unreadCount || 0);
    });

    // Receive new message
    socketInstance.on("message:received", (message) => {
      console.log("New message received:", message);

      // Add to current messages if in conversation with sender
      if (currentConversationUserId === message.senderId) {
        setCurrentMessages((prev) => [...prev, message]);
      }

      // Update unread count
      setUnreadCount((prev) => prev + 1);

      // Update conversations list
      setConversations((prev) => {
        const updatedConversations = [...prev];
        const convIndex = updatedConversations.findIndex((conv) =>
          conv.participants.some((p) => p.id === message.senderId)
        );

        if (convIndex !== -1) {
          const conv = updatedConversations[convIndex];
          conv.lastMessage = message;
          conv.lastMessageAt = message.timestamp;
          // Move to top
          updatedConversations.splice(convIndex, 1);
          updatedConversations.unshift(conv);
        }

        return updatedConversations;
      });

      // Show notification (optional)
      if (
        typeof window !== "undefined" &&
        Notification.permission === "granted"
      ) {
        new Notification(`New message from ${message.senderName}`, {
          body: message.content.substring(0, 50),
          icon: message.senderImg,
        });
      }
    });

    // Message sent confirmation
    socketInstance.on("message:sent", (data) => {
      console.log("Message sent successfully:", data);
    });

    // User online status
    socketInstance.on("user:online", (data) => {
      console.log("User online:", data.userId);
      setOnlineUsers((prev) => {
        if (!prev.includes(data.userId)) {
          return [...prev, data.userId];
        }
        return prev;
      });
    });

    // User offline status
    socketInstance.on("user:offline", (data) => {
      console.log("User offline:", data.userId);
      setOnlineUsers((prev) => prev.filter((id) => id !== data.userId));
    });

    // Typing indicator
    socketInstance.on("user:typing", (data) => {
      console.log("User typing:", data.userId);
      setTypingUsers((prev) => {
        const newMap = new Map(prev);
        newMap.set(data.userId, true);
        return newMap;
      });

      // Clear existing timeout
      if (typingTimeoutRef.current.has(data.userId)) {
        clearTimeout(typingTimeoutRef.current.get(data.userId));
      }

      // Set timeout to clear typing status
      const timeout = setTimeout(() => {
        setTypingUsers((prev) => {
          const newMap = new Map(prev);
          newMap.delete(data.userId);
          return newMap;
        });
      }, 3000);

      typingTimeoutRef.current.set(data.userId, timeout);
    });

    // Stopped typing
    socketInstance.on("user:stopped_typing", (data) => {
      console.log("User stopped typing:", data.userId);
      setTypingUsers((prev) => {
        const newMap = new Map(prev);
        newMap.delete(data.userId);
        return newMap;
      });

      // Clear timeout
      if (typingTimeoutRef.current.has(data.userId)) {
        clearTimeout(typingTimeoutRef.current.get(data.userId));
        typingTimeoutRef.current.delete(data.userId);
      }
    });

    // Message read receipt
    socketInstance.on("message:read_receipt", (data) => {
      console.log("Message read:", data);
      setCurrentMessages((prev) =>
        prev.map((msg) =>
          msg._id === data.messageId ? { ...msg, isRead: true } : msg
        )
      );
    });

    // Disconnect
    socketInstance.on("disconnect", (reason) => {
      console.log("Socket disconnected, reason:", reason);
      setIsConnected(false);
    });

    // Connection error
    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
      setIsConnected(false);
    });

    // General error
    socketInstance.on("error", (error) => {
      console.error("Socket error:", error);
    });

    // Store the socket in both state and ref
    socketRef.current = socketInstance;
    setSocket(socketInstance);

    // Request notification permission
    if (
      typeof window !== "undefined" &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }

    // Clean up
    return () => {
      console.log("Cleaning up socket connection");

      // Clear all typing timeouts
      typingTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
      typingTimeoutRef.current.clear();

      socketInstance.disconnect();
      socketRef.current = null;
    };
  }, [userId, currentConversationUserId]);

  // Send message function
  const sendMessage = useCallback(
    (receiverId, content, messageType = "text") => {
      if (!socket || !isConnected) {
        console.error("Socket not connected");
        return;
      }

      socket.emit("message:send", {
        receiverId,
        content,
        messageType,
      });

      // Optimistically add message to current messages
      const optimisticMessage = {
        senderId: userId || "",
        senderName: name || "",
        senderImg: profile,
        content,
        messageType,
        timestamp: new Date(),
        isRead: false,
      };

      if (currentConversationUserId === receiverId) {
        setCurrentMessages((prev) => [...prev, optimisticMessage]);
      }
    },
    [socket, isConnected, userId, currentConversationUserId]
  );

  // Start typing indicator
  const startTyping = useCallback(
    (receiverId) => {
      if (!socket || !isConnected) return;
      socket.emit("typing:start", receiverId);
    },
    [socket, isConnected]
  );

  // Stop typing indicator
  const stopTyping = useCallback(
    (receiverId) => {
      if (!socket || !isConnected) return;
      socket.emit("typing:stop", receiverId);
    },
    [socket, isConnected]
  );

  // Mark message as read
  const markMessageAsRead = useCallback(
    (messageId, senderId) => {
      if (!socket || !isConnected) return;
      socket.emit("message:read", { messageId, senderId });
      setUnreadCount((prev) => Math.max(0, prev - 1));
    },
    [socket, isConnected]
  );

  // Set current conversation
  const setCurrentConversation = useCallback((userId) => {
    setCurrentConversationUserId(userId);
    // Clear current messages when switching conversations
    setCurrentMessages([]);
  }, []);

  const value = {
    socket,
    isConnected,
    conversations,
    unreadCount,
    onlineUsers,
    currentMessages,
    typingUsers,
    sendMessage,
    startTyping,
    stopTyping,
    markMessageAsRead,
    setCurrentConversation,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
