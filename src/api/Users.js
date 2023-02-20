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
  async createUser({ userName, firstName, lastName, pass, isActive }) {
    const response = await API.post("/users/", {
      username: userName,
      first_name: firstName,
      last_name: lastName,
      password: pass,
      is_active: isActive,
    });
    if (response) {
      return response.data;
    }
  },
  async updateUserStatus(id, { isActive }) {
    const response = await API.patch(`/users/${id}/`, {
      is_active: isActive,
    });
    if (response) {
      return response.data;
    }
  },
};
