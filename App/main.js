import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Generator from './pages/Generator.vue'
import AdminProfile from './pages/AdminProfile.vue'
import AdminLogin from './pages/AdminLogin.vue'
import History from './pages/History.vue'
import Problem from './pages/Problem.vue'
import { createRouter, createWebHistory } from 'vue-router'
import './assets/icon/iconfont.css'
import VueCookies from 'vue-cookies';
import LZString from 'lz-string';

const app = createApp(App);

app.use(VueCookies);

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: "/",
            redirect: '/Generator'
        },
        {
            path: "/Generator",
            name: "Generator",
            component: Generator,
          },
        {
            path: "/AdminProfile",
            name: "AdminProfile",
            component: AdminProfile,
          },
        {
            path: "/AdminLogin",
            name: "AdminLogin",
            component: AdminLogin,
          },
          {
            path: "/History",
            name: "History",
            component: History,
          },
          {
            path: "/Problem",
            name: "Problem",
            component: Problem,
          }
    ]
  });

app.use(router);
app.mount("#app");

export default router;
