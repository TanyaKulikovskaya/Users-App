import axios from "axios";
import auth from "../store/auth.js";

const API = axios.create({
  baseURL: "https://test-assignment.emphasoft.com/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Token ${auth.state.token}`,
  },
});

export default {
  async fetchUsers() {
    const response = await API.get("/users/");
    if (response) {
      return response.data;
    }
  },
};
