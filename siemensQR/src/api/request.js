import Fly from 'flyio'
const request = new Fly()
const bsrequest = new Fly()
const notrequest = new Fly()
const lightrequest = new Fly()
import { formatGetUri } from '../utils/formatHttp'
import { btoa } from './baot.js'
// const {atob,btoa} = polyfill;
// import {toast} from '@/utils/index'
// 获取地址栏信息
// function getCurrentPageUrl () {
//   const pages = getCurrentPages()
//   const currentPage = pages[pages.length - 1]
//   console.log(decodeURIComponent(currentPage.options.q).split("?")[1], 'currentPagecurrentPage')
//   let str = currentPage.options.q ? decodeURIComponent(currentPage.options.q).split("?")[1] : undefined
//
//   // if (decodeURIComponent(currentPage.options.q).split("?")[1]) {
//   if (decodeURIComponent(currentPage.options.q).split("?")[1]) {
//     console.log(11111111111111)
//     query = decodeURIComponent(currentPage.options.q).split("?")[1]
//   } else {
//     query = str
//   }
//   console.log(query, 'queryqueryqueryquery')
//   // }
// }
// var query

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
        // wx.removeStorageSync('token');
        const pages = getCurrentPages()
        const currentPage = pages[pages.length - 1]
        if(!decodeURIComponent(currentPage.options.q).split("?")[1], 'decodeURIComponent(currentPage.options.q).split("?")[1]') {
          wx.removeStorageSync('productInfo')
        }
        if(currentPage.options.id){
          wx.redirectTo({url: `/pages/authorization/main?id=${currentPage.options.id}&type=${currentPage.options.type}`})
        }else{
          wx.redirectTo({url: '/pages/authorization/main' +  (decodeURIComponent(currentPage.options.q).split("?")[1] ? '?'+decodeURIComponent(currentPage.options.q).split("?")[1]  : '')});
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

lightrequest.interceptors.request.use((req) => {
  req.headers['Authorization'] = "Basic " + btoa('QRCODE' + ":" + 'bca68ec460')
  req.headers['Content-Type'] = 'application/json';
  req.headers['appid'] = 'QRCODE';
  req.headers['appContext'] = 'boschcn';

  return req
})

lightrequest.interceptors.response.use(
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


export  {request,bsrequest,notrequest,lightrequest}
