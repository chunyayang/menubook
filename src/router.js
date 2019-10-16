import Vue from 'vue'
import Router from 'vue-router'
import Restaurants from './views/Restaurants.vue'
import Menu from './views/Menu.vue'
import vm from './main';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/restaurants'
    },
    {
      path: '/restaurants',
      component: Restaurants
    },
    {
      path: '/menu/:id',
      component: Menu,
      props: true
    },
    {
      path: '/about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '*',
      component: Restaurants
    }
  ],
  scrollBehavior: (to, from, savedPosition) => {    
    if (savedPosition) {
      return new Promise((resolve) => {
        vm.$root.$once('scrollAfterUpdate', () => {
          resolve(savedPosition);
        });
      });
    }
    if (to.hash) {
      return {
        selector: to.hash,
        offset: { y: 100 } // approximate value to avoid the app bar
      };
    }

    return false;
  }
})
