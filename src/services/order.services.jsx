import http from "../axiosInstance";

class checkoutDataService {
  getAll() {
    return http.get("/checkout");
  }
  getAllByOwner() {
    return http.get("/checkout/owner");
  }

  get(orderId) {
    return http.get(`/checkout/${orderId}`);
  }

  create(cartId, data, token) {
    return http.post(`/checkout/${cartId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const checkoutService = new checkoutDataService();
export default checkoutService;
