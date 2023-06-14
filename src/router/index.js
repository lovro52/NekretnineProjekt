import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import Home from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import ProfileView from "../views/ProfileView.vue";
import NekretnineView from "../views/NekretnineView.vue";
import DetaljiNekretnineView from "../views/DetaljiNekretnineView.vue";
import NovaNekretninaView from "../views/NovaNekretninaView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login-view",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register-view",
    component: RegisterView,
  },
  {
    path: "/profile",
    name: "profile-view",
    component: ProfileView,
  },
  {
    path: "/nekretnine",
    name: "nekretnine-view",
    component: NekretnineView,
  },
  {
    path: "/recepti/:recept_id",
    name: "detaljinekretnine-view",
    component: DetaljiNekretnineView,
  },
  {
    path: "/dodaj",
    name: "dodajnekretninu",
    component: NovaNekretninaView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
