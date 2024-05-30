import http from "../axiosInstance";

class loginDataService {
  login(data) {
    return http.post("/users/auth", data);
  }
  signup(data) {
    return http.post("/users", data);
  }
}

const loginService = new loginDataService();
export default loginService;
