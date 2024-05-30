import http from "../axiosInstance";

class cartDataService {
  getAllCart() {
    return http.get("/cart");
  }

  getCartById(id) {
    return http.get(`/cart/${id}`);
  }

  creteCart(data, token) {
    return http.post(`/cart`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  addTocart(productId, data, token) {
    return http.post(`/cart/${productId}/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateCart(productId, data, token) {
    return http.put(`/cart/${productId}/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteCart(id, token) {
    return http.delete(`/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const cartService = new cartDataService();
export default cartService;
