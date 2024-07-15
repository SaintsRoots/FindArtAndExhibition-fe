import http from "../axiosInstance";

class contactDataService {
  getAll() {
    return http.get("/messages");
  }

  get(id) {
    return http.get(`/messages/${id}`);
  }

  create(data, token) {
    return http.post(`/messages`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  update(id, data, token) {
    return http.put(`/messages/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  delete(id, token) {
    return http.delete(`/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const contactService = new contactDataService();
export default contactService;
