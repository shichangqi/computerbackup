// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
// import users from './users'
import home from './home'

import { queryToken } from '../api/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // users,
    home,
  },
  state: {
    windowHeight: null,
    token: null,
    code: null
  },
  mutations: {
    getWindowHeight: (state) => {
      wx.getSystemInfo({
        success: (res) => {
          state.windowHeight = res.windowHeight
        }
      })
    },
    RECORD_TOKEN: (state, token) => {
      state.token = token
    },
    RECORD_CODE: (state, code) => {
      state.code = code
    }
  },
  actions: {
    getAccessToken ({state, commit, dispatch}, params) {
      return new Promise(async (resolve, reject) => {
        const { data } = await queryToken(params)
        //  保存token
        wx.setStorageSync('token', data.token)
        commit('RECORD_TOKEN', data.code)
        resolve(data)
      })
    }
  },
  getters: {
    token: state => state.token || wx.getStorageSync('token')
  }
})

export default store
