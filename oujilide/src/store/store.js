// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import { getToken } from '../api/api'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    windowHeight: null,
    token: null,
    checkInfo: null,
    questionDetail: null
  },
  mutations: {
      /**
       * token
       */
    token (state, token) {
      state.token = token
    },

    /**
     * 选择地址类型
     */
    checkInfo (state, checkInfo) {
        state.checkInfo = checkInfo
    },

    questionDetail (state, questionDetail) {
        state.questionDetail = questionDetail
    },
  },
  actions: {
    getAccessToken ({state, commit}, formData) {
      return new Promise(async (resolve, reject) => {
        try {
          await getToken(formData).then(function (res) {
            commit('token', res.data.data.token)
            wx.setStorageSync('token', res.data.data.token)
            resolve(true)
          })
        } catch (e) {
          reject(false, e)
        }
      })
    }
  },
  getters: {
    token: state => state.token || wx.getStorageSync('token')
  }
})
export default store
