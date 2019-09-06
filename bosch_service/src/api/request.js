import Fly from 'flyio'
const request = new Fly()
const bsrequest = new Fly()
const notrequest = new Fly()
// import {toast} from '@/utils/index'

request.interceptors.request.use((req) => {
  const token = wx.getStorageSync('token')
  if (token) {
    req.headers['authorization'] = token;
    req.headers['Content-Type'] = 'application/json'
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
          const pages = getCurrentPages()
          const currentPage = pages[pages.length - 1]

          if(currentPage.options.id){
            wx.redirectTo({url: `/pages/authorization/main?id=${currentPage.options.id}&type=${currentPage.options.type}`})
          }else{
            wx.redirectTo({url: '/pages/authorization/main'});
          }
            break;
        //用户未注册
        case 403:
            // wx.redirectTo({url: '/pages/register/main'})
            break;
        //没有权限使用小程序
        case 405:
            // wx.reLaunch({url: '/pages/noPermission/main'})
            break;
        //其他错误提示  
        default:
            // toast(err.response.data.msg)

    }
    return promise.resolve(err.response)
  }
)


bsrequest.interceptors.request.use((req) => {
  const token = wx.getStorageSync('bstoken')
  if (token) {
    req.headers['authorization'] = token;
    req.headers['Content-Type'] = 'application/json'
  }
  return req
})

bsrequest.interceptors.response.use(
  (response, promise) => {
    return promise.resolve(response)
  },
  (err, promise) => {
    switch(err.status){
      //未授权或者token失效
      case 401:
        // wx.showToast({ title: '授权过期，请重新选择', icon: 'none', mask: true })
        // wx.redirectTo({url: '/pages/boschindex/main'});
        break;
      //用户未注册
      case 403:
        // wx.redirectTo({url: '/pages/register/main'})
        break;
      //没有权限使用小程序
      case 405:
        // wx.reLaunch({url: '/pages/noPermission/main'})
        break;
      //其他错误提示
      default:
      // toast(err.response.data.msg)

    }
    return promise.resolve(err.response)
  }
)

notrequest.interceptors.request.use((req) => {
  req.headers['Content-Type'] = 'application/json'
  return req
})

notrequest.interceptors.response.use(
  (response, promise) => {
    return promise.resolve(response)
  },
  (err, promise) => {
    switch(err.status){
      //未授权或者token失效
      case 401:
        // wx.showToast({ title: '授权过期，请重新选择', icon: 'none', mask: true })
        // wx.redirectTo({url: '/pages/boschindex/main'});
        break;
      //用户未注册
      case 403:
        // wx.redirectTo({url: '/pages/register/main'})
        break;
      //没有权限使用小程序
      case 405:
        // wx.reLaunch({url: '/pages/noPermission/main'})
        break;
      //其他错误提示
      default:
      // toast(err.response.data.msg)

    }
    return promise.resolve(err.response)
  }
)
export  {request,bsrequest,notrequest}
