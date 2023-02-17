import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

import "./assets/styles/main.scss";

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");

app.component("EasyDataTable", Vue3EasyDataTable);
