import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";
import Main from "../views/Main.vue";
import Album from "../views/Album.vue";
import { theme, toggleTheme } from "../lib/theme";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: Main,
    props: { theme: theme.value, toggleTheme }
  },
  {
    path: "/album/:id",
    name: "Album",
    component: Album
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
