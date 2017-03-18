import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		currentUser: null
	},

	actions: {
		setCurrentUser: ({
			commit
		}, {
			user
		}) => {
			commit('SET_CURRENT_USER', {
				user
			})
		}
	},

	mutations: {
		SET_CURRENT_USER: (state, {
			user
		}) => {
			state.currentUser = user;
		}
	},

	getters: {
		currentUser(state) {
			return state.currentUser
		}
	}
})

export default store