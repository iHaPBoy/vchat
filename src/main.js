import Vue from 'vue'
import App from './App.vue'
import VueSocketio from 'vue-socket.io'

Vue.use(VueSocketio, 'http://localhost:3000')

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

new Vue({
  el: '#app',
  render: h => h(App)
})