import style from './assets/style.css'

import Vue from 'vue'
import App from './App.vue'
import VueSocketio from 'vue-socket.io'
import Vuex from 'vuex'
import store from './store'
import {
    router
} from './router'
import VueMoment from 'vue-moment'
import {
    WEBSOCKET_ROOT
} from './config.js'

Vue.use(VueSocketio, WEBSOCKET_ROOT)

Vue.use(Vuex)

Vue.use(VueMoment)

Vue.moment().locale('zh-CN')

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
    router,
    store,
    ...App
}).$mount('#app')

if (window.Notification && Notification.permission !== "granted") {
    Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
            Notification.permission = status;
        }
    });
}