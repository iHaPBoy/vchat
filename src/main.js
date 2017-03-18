import Vue from 'vue'
import App from './App.vue'
import VueSocketio from 'vue-socket.io'
import Vuex from 'vuex'
import store from './store'
import VueMoment from 'vue-moment'

Vue.use(VueSocketio, 'http://localhost:3000')

Vue.use(Vuex)

Vue.use(VueMoment);

Vue.moment().locale('zh-CN');

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

Vue.directive('auto-bottom', {
  inserted: function (el) {
    setTimeout(function () {
      el.scrollTop = el.scrollHeight;
    }, 0);
  },
  update: function (el) {
    setTimeout(function () {
      el.scrollTop = el.scrollHeight;
    }, 0);
  }
})

const app = new Vue({
  store,
  el: '#app',
  render: h => h(App)
})

if (window.Notification && Notification.permission !== "granted") {
  Notification.requestPermission(function (status) {
    if (Notification.permission !== status) {
      Notification.permission = status;
    }
  });
}