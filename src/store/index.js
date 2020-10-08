import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    content: '',
    darkMode: false
  },
  mutations: {
    SET_CONTENT (state, content) {
      state.content = content
    },
    SET_DARK_MODE (state, isDarkMode) {
      state.darkMode = isDarkMode
    }
  },
  actions: {
    setContent ({ commit }, content) {
      commit('SET_CONTENT', content)
    },
    setDarkMode ({ commit }, isDarkMode) {
      commit('SET_DARK_MODE', isDarkMode)
    }
  },
  modules: {
  }
})
