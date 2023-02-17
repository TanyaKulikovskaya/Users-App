import { createRouter, createWebHistory } from "vue-router";
import auth from "../store/auth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/users",
    },
    {
      path: "/users",
      name: "users",
      component: () => import("../views/UsersView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authenticated = !!auth.state.token;
  if (to.name !== "login" && !authenticated) next({ name: "login" });
  else if (to.name === "login" && authenticated) next({ name: "root" });
  else next();
});

export default router;
