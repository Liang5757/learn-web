import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: "/homepage",
    name: "homepage",
    component: homepage,
  },
  {
    path: "/login",
    name: "login",
    component: logining,
  },
  {
    path: "/register",
    name: "registering",
    component: registering,
  },
  {
    path: "/",
    name: "Home",
    redirect: "/homepage",
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;