import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";
import Main from "@/views/Main.vue";
import Album from "@/views/Album.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: Main
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
