import Fly from 'flyio'
import { getTimestamp, newGuid } from '../utils';
import md5 from 'js-md5'
import { reLaunch } from '../utils/index'
import { loginUrl, sendCodeUrl, verifyCodeUrl } from './api';

const tstamp = getTimestamp();
const guid = newGuid();
const request = new Fly()


request.interceptors.request.use((req) => {
  const token = wx.getStorageSync('token');
  if (token) {
    req.headers['access_token'] = token;
  } else if (req.url !== loginUrl) {
    reLaunch('/pages/login/main');
  }
  req.headers['Content-Type'] = 'application/json'
  req.headers['timestamp'] = tstamp;
  req.headers['request_id'] = guid;
  if (req.body && req.url !== loginUrl && req.url !== sendCodeUrl && req.url !== verifyCodeUrl) {
    req.body = { 'bu_content': req.body }
  }
  req.headers['signature'] = md5(`${guid}&${tstamp}&` + (req.method.toUpperCase() === 'GET' ? '&' : `${JSON.stringify(req.body)}&`));
  return req
})

request.interceptors.response.use(
  (response, promise) => {
    switch (response.data.code) {
      //没有token
      case '40001':
        reLaunch('/pages/login/main');
        break;
      //token过期
      case '40002':
        reLaunch('/pages/login/main');
        break;
      //其他错误提示  
      default:

    }
    return promise.resolve(response)
  },
  (err, promise) => {

    switch (err.status) {
      //未授权或者token失效
      case 401:
        // wx.redirectTo({ url: '/pages/authorization/main' })
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
export { request }