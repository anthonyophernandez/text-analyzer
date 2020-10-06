import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    content: ''
  },
  mutations: {
    SET_CONTENT (state, content) {
      state.content = content
    }
  },
  actions: {
    setContent ({ commit }, content) {
      commit('SET_CONTENT', content)
    }
  },
  modules: {
  }
})
