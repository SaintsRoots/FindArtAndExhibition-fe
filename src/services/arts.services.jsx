import http from "../axiosInstance";

class artsDataService {
  getAll() {
    return http.get("/arts");
  }

  get(id) {
    return http.get(`/arts/${id}`);
  }

  create(data, token) {
    return http.post(`/arts`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  update(id, data, token) {
    return http.put(`/arts/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  delete(id, token) {
    return http.delete(`/arts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const artsService = new artsDataService();
export default artsService;
