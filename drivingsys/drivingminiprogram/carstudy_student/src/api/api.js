import {request,request1} from './request'
import {formatGetUri} from '../utils/index'

const hostName = 'https://h5.xingjiadao.cn' 
const hostName1 = 'http://120.79.113.109:81' 
export const phoneUrl = hostName+'/miniapp/getPhone';
export const payUrl = hostName+'/miniapp/payOrder';
export const uploadimg = hostName1+'/upload/image';

/**
 * 获取授权openid
 * @param {*} data 
 */
export const getopenid = data => request.get(hostName+'/miniapp/studentLogin', formatGetUri(data))

/**
 * 获取授权手机号openid
 * @param {*} data 
 */
export const getphone = data => request.post(hostName+'/miniapp/getPhone', data)

// http://h5.xingjiadao.cn//miniapp/payOrder?openid=otQ9X43PGxj_R_g5m0YJZ0VV1gLc&money=0.01&trade_no=123&payApp=student 
/**
 * 支付
 * @param {*} data 
 */
export const payOrder = data => request.post(hostName+'/miniapp/payOrder', data)


/**
 * 获取教练详情
 * @param {*} data 
 */
export const studentdetail = data => request1.post(hostName1+'/student/show',data)


/**
 * 获取教练首页信息
 * @param {*} data 
 */
export const studentindex = data => request1.post(hostName1+'/student/index',data)


/**
 * 学员注册 
 * @param {*} data 
 */
export const register = data => request1.post(hostName1+'/student/register',data)


/**
 * 学员练车记录
 * @param {*} data 
 */
export const studentorder = data => request1.post(hostName1+'/student/order',data)


/**
 * 学员未支付账单
 * @param {*} data 
 */
export const studentunpay = data => request1.post(hostName1+'/student/unpay',data)


/**
 * 获取订单详情
 * @param {*} data 
 */
export const orderdetail = data => request1.post(hostName1+'/order/show',data)


/**
 * 学员当前登录设备
 * @param {*} data 
 */
export const login_equipment = data => request1.post(hostName1+'/student/login_equipment',data)


/**
 * 学员登出设备
 * @param {*} data 
 */
export const studentlogout = data => request1.post(hostName1+'/student/logout',data)

