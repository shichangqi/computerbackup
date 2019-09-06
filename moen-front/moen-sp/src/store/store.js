// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    eyeshow: false,
    shopmanager: false,
    getlevel: false,
  },
  mutations: {
    eyeshow(state, eyeshow) {
      state.eyeshow = eyeshow;
    },
    shopmanager(state, shopmanager) {
      state.shopmanager = shopmanager;
    },
    getlevel(state, getlevel) {
      state.getlevel = getlevel;
    },
  },
  actions: {

  },
  getters: {
    eyeshow: state => state.eyeshow,
    shopmanager: state => state.shopmanager,
    getlevel: state => state.getlevel
  }
})
export default store
