import http from "../axiosInstance";

class usersDataService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  update(id, data, token) {
    return http.put(`/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  delete(id, token) {
    return http.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const artistService = new usersDataService();
export default artistService;
