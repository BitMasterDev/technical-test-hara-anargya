import { createRouter, createWebHistory } from "vue-router";

import Layout from "../layout/Layout.vue";
import Dashboard from "../pages/dashboard/Dashboard.vue";
import Overview from "../pages/overview/Overview.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "overview",
        name: "Overview",
        component: Overview,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
