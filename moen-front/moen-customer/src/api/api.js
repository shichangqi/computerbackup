import {request} from './request'
import {formatGetUri} from '../utils/index'
// const hostName = 'http://demo.fidescloud.com'
// const hostName = 'https://moen-uat.smartinchain.cn'//uat
const hostName = 'https://moen.smartinchain.cn' //生产


/**
 * 获取授权token
 * @param {*} data 
 */
export const getToken = data => request.get(hostName+'/v1/moenApp/security/oauth/systemtoken', formatGetUri(data))


/**
 * 查询是否当前活动已领券
 * @param {*} data 
 */
export const checkExistCampaignCoupon = data => request.get(hostName+'/v1/moenApp/api/coupon/checkExistCampaignCoupon', formatGetUri(data))


/**
 * 获取活动细则及优惠券信息
 * @param {*} data 
 */
export const getCampaignInfo = data => request.get(hostName+'/v1/moenApp/commondata/getCampaignInfo', formatGetUri(data))


/**
 * 发送注册验证码
 * @param {*} data 
 */
export const sendVerficationCode = data => request.get(hostName+'/v1/moenApp/security/oauth/sendVerficationCode', formatGetUri(data))


/**
 * 注册验证码校验
 * @param {*} data 
 */
export const checkVerficationCode = data => request.get(hostName+'/v1/moenApp/security/oauth/checkVerficationCode', formatGetUri(data))



/**
 * 注册
 * @param {*} data 
 */
export const register = data => request.post(hostName+'/v1/moenApp/api/visitors/register',data)

/**
 * 领券
 * @param {*} data 
 */
export const addCampaignCoupon = data => request.post(hostName+'/v1/moenApp/api/coupon/addCampaignCoupon',data)


/**
 * 获取用户信息
 */
export const getMemberInfo = data => request.get(hostName+'/v1/moenApp/api/member/getMemberInfo', formatGetUri(data))



/**
 * 获取用户有效优惠券
 */
export const getEffictiveCoupon = data => request.get(hostName+'/v1/moenApp/api/coupon/searchMemberEffictiveCoupon', formatGetUri(data))

/**
 * 获取已使用优惠券
 */

export const getUsedCoupon = data => request.get(hostName+'/v1/moenApp/api/coupon/searchMemberHistoryCoupon', formatGetUri(data))



/**
 * 获取失效优惠券
 */
export const getOutOfCoupon = data => request.get(hostName+'/v1/moenApp/api/coupon/searchMemberOutOfDateCoupon', formatGetUri(data))


/**
 * 获取交易历史
 */
export const getTransactionHistory = data => request.get(hostName+'/v1/moenApp/api/member/getTransactionHistory', formatGetUri(data))


/**
 * 查询用户是否可重复领券
 * @param {*} data 
 */
export const getCouponAgainInfo = data => request.get(hostName+'/v1/moenApp/api/coupon/getCampaignCouponAgainInfo', formatGetUri(data))