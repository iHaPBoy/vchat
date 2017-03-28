import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'main',
    component: MainView,
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: '/chat/:name',
  //   name: 'chat',
  //   component: ChatView,
  // },
  // {
  //   path: '/square',
  //   name: 'square',
  //   component: SquareView,
  // },
  // {
  //   path: '*',
  //   redirect: `/404`
  // }
];

export const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || !user.userName) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }
  }
  next();
});