import AuthUser from "../api/AuthUser";
import router from "../router";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || "",
    errorMessage: "",
  },
  getters: {
    errorMessage(state) {
      return state.errorMessage;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      localStorage.setItem("token", token);
      state.token = token;
    },
    CLEAR_TOKEN(state) {
      localStorage.removeItem("token");
      state.token = "";
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const { token } = await AuthUser.login(credentials);
        if (token) {
          commit("SET_TOKEN", token);
          commit("SET_ERROR_MESSAGE", "");
          router.replace({ name: "root" });
        }
      } catch (error) {
        commit("CLEAR_TOKEN");
        commit("SET_ERROR_MESSAGE", error.response.data.non_field_errors[0]);
      }
    },
    logout({ commit }) {
      commit("CLEAR_TOKEN");
      router.replace({ name: "login" });
    },
  },
};
