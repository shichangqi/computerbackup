// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import {getAppToken,saveUnionId,saveuniondid,getToken} from "../api/api";
let WXBizDataCrypt = require('../utils/RdWXBizDataCrypt.js');
let appid = 'wxe89498bdbf291da2';
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: null,
    tab:0
  },
  mutations: {
    /**
     * token
     */
    token(state,token){
      state.token = token;
    },
    tab(state,tab){
      state.tab = tab;
    }
  },
  actions: {
    getAccessToken({state, commit}, formData){
      return new Promise(async (resolve, reject) => {
        try {
          await getAppToken(formData).then(res=>{
            console.log(res.data)
            if(res.status == 200){
              wx.setStorageSync('token', res.data.token)
              wx.setStorageSync('openid', res.data.openid)
              var pc = new WXBizDataCrypt(appid, res.data.session_key)
              wx.getUserInfo({
                success:function(re) {
                  let data = pc.decryptData(re.encryptedData, re.iv)
                  wx.setStorageSync('unionid', data.unionId);
                  const da={
                    openid:res.data.openid,
                    unionid:data.unionId
                  }
                  saveUnionId(da).then(res=>{
                  })
                  const datass={
                    openId:res.data.openid,
                    unionId:data.unionId,
                    source:0
                  }
                  const formData = {
                    account: "admin",
                    password: "admin"
                  };
                  wx.removeStorageSync("bstoken");
                  getToken(formData).then(function(res) {
                    wx.setStorageSync("bstoken", res.data.data.token);

                    saveuniondid(datass).then(res=>{
                      console.log(res.data)
                    })
                  });

                },
                fail:function(res) {
                  console.log(res)
                }
              })
              resolve(true)
            }else{
              wx.showToast({ title: '网络异常，请重试！', icon: 'none', mask: true })
            }
          });
        } catch (e) {
          reject(false, e)
        }
      })
    }

  },
  getters: {
  token: state => state.token || wx.getStorageSync('token'),
    tab: state => state.tab

  }
})
export default store
