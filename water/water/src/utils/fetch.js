import Fly from 'flyio/dist/npm/wx'
import store from '@/store'
import toast from '@/plugins/toast'
// import {getCookie} from '../utils/cookie'
const fetch = new Fly()

fetch.config.baseURL = process.env.baseURL

fetch.interceptors.request.use(req => {
  if (store.getters.token) {
    req.headers['authorization'] = store.getters.token
  }
  toast.showLoading('加载中')
  return req
})

fetch.interceptors.response.use((response, promise) => {
  toast.hideLoading()
  return promise.resolve(response)
}, (err, promise) => {
  toast.hideLoading()
  switch (err.status) {
    case 401:
      wx.navigateTo({
        url: '/pages/authorize/main'
      })
      break
    case 405:
      toast.text('您的账号已被禁用')
      break
    default:
  }
  return promise.reject(err.response)
})

export default fetch
