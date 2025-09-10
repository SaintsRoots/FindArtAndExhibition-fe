import http from "../axiosInstance";

class ChatDataService {
  constructor() {
    this.handleError = this.handleError.bind(this);
  }

  handleError(error, operation) {
    console.error(`Failed to ${operation}:`, error);
    throw new Error(error.response?.data?.message || `Failed to ${operation}`);
  }

  async getUserConversations(userId) {
    try {
      const response = await http.get(`/messages/conversations/${userId}`);
      return response.data;
    } catch (error) {
      this.handleError(error, 'get user conversations');
    }
  }

  async getMessagesBetweenUsers(userId, otherUserId, page = 1, limit = 50) {
    try {
      const response = await http.get(`/messages/${userId}/${otherUserId}`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      this.handleError(error, 'get messages between users');
    }
  }

  async sendMessage(messageData) {
    try {
  
      const response = await http.post("/messages/sendMessage", messageData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      this.handleError(error, 'send message');
    }
  }

  async getAllArtists() {
    try {
      const response = await http.get("/messages/artists/all");
      return response.data;
    } catch (error) {
      this.handleError(error, 'get all artists');
    }
  }

  async getUnreadCount(userId) {
    try {
      const response = await http.get(`/messages/unread/${userId}`);
      return response.data;
    } catch (error) {
      this.handleError(error, 'get unread count');
    }
  }

  async markAsRead(messageId, userId) {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      
      const response = await http.put(`/messages/read/${messageId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      this.handleError(error, 'mark as read');
    }
  }

  async deleteMessage(messageId, userId) {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      
      const response = await http.delete(`/messages/${messageId}`, {
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      this.handleError(error, 'delete message');
    }
  }

  async getOrCreateConversation(userId1, userId2) {
    try {
      const response = await http.get(`/messages/conversation/${userId1}/${userId2}`);
      return response.data;
    } catch (error) {
      this.handleError(error, 'get or create conversation');
    }
  }
}

const chatService = new ChatDataService();
export default chatService;