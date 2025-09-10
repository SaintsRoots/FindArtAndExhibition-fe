import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "../../services/chats.service";

// Initial state
const initialState = {
  conversations: [],
  messages: [],
  artists: [],
  currentConversation: null,
  unreadCount: 0,
  loading: false,
  error: null,
};

// Thunk to get user conversations
export const getUserConversations = createAsyncThunk(
  "chat/getUserConversations",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await chatService.getUserConversations(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to get messages between users
export const getMessagesBetweenUsers = createAsyncThunk(
  "chat/getMessagesBetweenUsers",
  async ({ userId, otherUserId, page = 1, limit = 50 }, { rejectWithValue }) => {
    try {
      const response = await chatService.getMessagesBetweenUsers(userId, otherUserId, page, limit);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to send a message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await chatService.sendMessage(messageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to get all artists
export const getAllArtists = createAsyncThunk(
  "chat/getAllArtists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatService.getAllArtists();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to get unread count
export const getUnreadCount = createAsyncThunk(
  "chat/getUnreadCount",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await chatService.getUnreadCount(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to mark message as read
export const markAsRead = createAsyncThunk(
  "chat/markAsRead",
  async ({ messageId, userId }, { rejectWithValue }) => {
    try {
      const response = await chatService.markAsRead(messageId, userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to delete a message
export const deleteMessage = createAsyncThunk(
  "chat/deleteMessage",
  async ({ messageId, userId }, { rejectWithValue }) => {
    try {
      const response = await chatService.deleteMessage(messageId, userId);
      return { messageId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to get or create conversation
export const getOrCreateConversation = createAsyncThunk(
  "chat/getOrCreateConversation",
  async ({ userId1, userId2 }, { rejectWithValue }) => {
    try {
      const response = await chatService.getOrCreateConversation(userId1, userId2);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Add a new message to the current conversation (for real-time updates)
    addNewMessage: (state, action) => {
      if (state.messages) {
        state.messages.push(action.payload);
      }
    },
    
    // Update conversation last message
    updateConversationLastMessage: (state, action) => {
      const { conversationId, lastMessage } = action.payload;
      const conversation = state.conversations.find(conv => conv._id === conversationId);
      if (conversation) {
        conversation.lastMessage = lastMessage;
        conversation.lastMessageAt = new Date().toISOString();
      }
    },
    
    // Clear current messages
    clearMessages: (state) => {
      state.messages = [];
    },
    
    // Clear current conversation
    clearCurrentConversation: (state) => {
      state.currentConversation = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Increment unread count (for real-time updates)
    incrementUnreadCount: (state) => {
      state.unreadCount += 1;
    },
    
    // Decrement unread count when messages are read
    decrementUnreadCount: (state, action) => {
      state.unreadCount = Math.max(0, state.unreadCount - action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Get user conversations
      .addCase(getUserConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
        state.error = null;
      })
      .addCase(getUserConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get messages between users
      .addCase(getMessagesBetweenUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessagesBetweenUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(getMessagesBetweenUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        // Add the new message to the messages array
        state.messages.push(action.payload);
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Get all artists
      .addCase(getAllArtists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = action.payload;
        state.error = null;
      })
      .addCase(getAllArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get unread count
      .addCase(getUnreadCount.pending, (state) => {
        state.error = null;
      })
      .addCase(getUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload.unreadCount;
        state.error = null;
      })
      .addCase(getUnreadCount.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Mark as read
      .addCase(markAsRead.pending, (state) => {
        state.error = null;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        // Update the message in the messages array
        const index = state.messages.findIndex(msg => msg._id === action.payload._id);
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Delete message
      .addCase(deleteMessage.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        // Remove the message from the messages array
        state.messages = state.messages.filter(msg => msg._id !== action.payload.messageId);
        state.error = null;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Get or create conversation
      .addCase(getOrCreateConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrCreateConversation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentConversation = action.payload;
        state.error = null;
      })
      .addCase(getOrCreateConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  addNewMessage,
  updateConversationLastMessage,
  clearMessages,
  clearCurrentConversation,
  clearError,
  incrementUnreadCount,
  decrementUnreadCount,
} = chatSlice.actions;

// Selectors
export const selectConversations = (state) => state.chat.conversations || [];
export const selectMessages = (state) => state.chat.messages || [];
export const selectArtists = (state) => state.chat.artists || [];
export const selectCurrentConversation = (state) => state.chat.currentConversation;
export const selectUnreadCount = (state) => state.chat.unreadCount;
export const selectChatLoading = (state) => state.chat.loading;
export const selectChatError = (state) => state.chat.error;

export default chatSlice.reducer;