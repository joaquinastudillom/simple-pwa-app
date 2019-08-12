import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    displayCameraModal: false
  },
  mutations: {
    SET_CAMERA_MODAL_VALUE(state) {
      state.displayCameraModal = !state.displayCameraModal;
    }
  },
  actions: {
    setCamereModalValue: ({ commit }) => {
      commit("SET_CAMERA_MODAL_VALUE");
    }
  },
  getters: {
    displayCameraModal: state => {
      return state.displayCameraModal;
    }
  }
})
