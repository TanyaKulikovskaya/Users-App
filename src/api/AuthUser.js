import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async login({ username, password }) {
    const response = await API.post("/login/", {
      username,
      password,
    });
    if (response) {
      return response.data;
    }
  },
};
