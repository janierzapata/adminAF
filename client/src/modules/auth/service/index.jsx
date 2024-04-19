import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export class AuthService {
  static login(email, password) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseUrl}/auth/login`, {
          email,
          password,
        })
        .then((response) => {
          const { data } = response;
          console.log({ data });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
