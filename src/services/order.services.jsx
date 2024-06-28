import http from "../axiosInstance";

class checkoutDataService {
  getAll() {
    return http.get("/checkout");
  }
  getAllByOwner() {
    return http.get("/checkout/owner");
  }
  getAllCustomer() {
    return http.get("/checkout/customer");
  }
  getordersByArtist() {
    return http.get("/checkout/artsOwner");
  }

  get(orderId) {
    return http.get(`/checkout/${orderId}`);
  }

  create(cartId, data) {
    return http.post(`/checkout/${cartId}`, data);
  }
}

const checkoutService = new checkoutDataService();
export default checkoutService;
