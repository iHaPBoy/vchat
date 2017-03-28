import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: null,
    messages: [],
    concurrentUsers: 0
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
    },
    setConcurrentUsers: ({commit}, count) => {
      commit('SET_CONCURRENT_USERS', count)
    }
  },

  mutations: {
    SET_CURRENT_USER: (state, {user}) => {
      state.currentUser = user;
    },
    ADD_MESSAGE: (state, {message}) => {
      state.messages.push(message);
    },
    SET_CONCURRENT_USERS: (state, count) => {
      state.concurrentUsers = count;
    }
  },

  getters: {
    currentUser(state) {
      return state.currentUser;
    },
    messages(state) {
      return state.messages;
    },
    concurrentUsers(state) {
      return state.concurrentUsers;
    }
  }
});

export default store