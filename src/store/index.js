import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: null,
    messages: []
  },

  actions: {
    setCurrentUser: ({commit}, {user}) => {
      // Save User Info
      localStorage.setItem('currentUser', JSON.stringify(user));
      // Update State
      commit('SET_CURRENT_USER', {user})
    },
    addMessage: ({commit}, {message}) => {
      commit('ADD_MESSAGE', {message})
    }
  },

  mutations: {
    SET_CURRENT_USER: (state, {user}) => {
      state.currentUser = user;
    },
    ADD_MESSAGE: (state, {message}) => {
      state.messages.push(message);
    }
  },

  getters: {
    currentUser(state) {
      return state.currentUser
    },
    messages(state) {
      return state.messages
    }
  }
});

export default store