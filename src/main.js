import { createApp } from "vue";
import { Icon } from "@iconify/vue";
import App from "./App.vue";
import router from "./router";

import "./assets/css/index.css";

createApp(App).use(router).component("Icon", Icon).mount("#app");
