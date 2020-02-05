import Vue from 'vue';
import vuetify from './plugins/vuetify';
import router from './router';
import App from './App.vue';

var EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus;
    }
  }
});

export default new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
