import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Home from '@/pages/Home.vue';
const Login = () => import('@/pages/Login.vue' /* webpackChunkName: 'login' */);

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'projects',
          component: undefined,
          name: 'projects'
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (store.getters.isLoggedIn) {
          next({name: 'home'});
        } else {
          next();
        }
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!store.getters['isLoggedIn'] && to.name !== 'login') {
    return next({name: 'login'});
  }
  next();
});

export default router;
