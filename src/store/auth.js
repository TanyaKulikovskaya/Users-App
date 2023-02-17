import AuthUser from "../api/AuthUser";
import router from "../router";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || "",
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
  },
  actions: {
    async login({ commit }, credentials) {
      const { token } = await AuthUser.login(credentials);
      if (token) {
        commit("SET_TOKEN", token);
        router.replace({ name: "root" });
      }
    },
    logout({ commit }) {
      commit("CLEAR_TOKEN");
      router.replace({ name: "login" });
    },
  },
};
