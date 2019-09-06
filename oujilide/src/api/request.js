import Fly from 'flyio'
const request = new Fly()
import {toast} from '@/utils/index'

request.interceptors.request.use((req) => {
  const token = wx.getStorageSync('token')
  if (token) {
    req.headers['authorization'] = token
  }
  return req
})

request.interceptors.response.use(
  (response, promise) => {
    return promise.resolve(response)
  },
  (err, promise) => {
    switch(err.status){
        //未授权或者token失效
        case 401:
            wx.redirectTo({url: '/pages/authorization/main'})
            break;
        //用户未注册
        case 403:
            wx.redirectTo({url: '/pages/register/main'})
            break;
        //没有权限使用小程序
        case 405:
            wx.reLaunch({url: '/pages/noPermission/main'})
            break;
        //其他错误提示  
        default:
            toast(err.response.data.msg)

    }
    return promise.resolve(err.response)
  }
)
export default request
