import axios from "axios";
import { apiHost } from "./config";

const API_URL = apiHost + "auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", {
        email: user.email,
        password: user.password
      })
      .then(this.handleResponse)
      .then(response => {
        if (response.data.accessToken) {
          console.log("set localStorage user");
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  validateAccessCode(validateAccessCodeEntity) {
    return axios
      .post(API_URL + "validateAccessCode", {
        access_code: validateAccessCodeEntity.accessCode,
        access_url: validateAccessCodeEntity.accessURL
      })
      .then(this.handleResponse)
      .then(response => {
        return response.data;
      });
  }

  handleResponse(response) {
    if (response.status === 401) {
      this.logout();
      location.reload(true);

      const error = response.data && response.data.message;
      return Promise.reject(error);
    }

    return Promise.resolve(response);
  }
}

export default new AuthService();
