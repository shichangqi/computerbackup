import { request } from './request'
import { formatGetUri } from '../utils/index'
// export const hostName = 'http://demo.fidescloud.com'
// export const hostName = 'https://moen-uat.smartinchain.cn' //uat
export const hostName = 'https://moen.smartinchain.cn' //生产
export const loginUrl = hostName + '/cas/oauth2.0/accessToken';
export const sendCodeUrl = hostName + '/v1/moenApp/security/oauth/sendVerficationCode';
export const verifyCodeUrl = hostName + '/v1/moenApp/security/oauth/checkVerficationCode';

/**
 * 获取登录token
 * @param {*} data 
 */
export const getToken = data => request.get(hostName + '/cas/oauth2.0/accessToken', formatGetUri(data))


/**
 * 个人信息查询
 * @param {*} data 
 */
export const getEmployeeInfo = data => request.post(hostName + '/v1/moen/transaction/getEmployeeInfoByUser', data)


/**
 * 员工KPI
 * @param {*} data 
 */
export const queryEmployeeKPI = data => request.post(hostName + '/v1/moen/transaction/queryEmployeeTransactionKPIDetail', data)


/**
 * 查询员工等级
 * @param {*} data 
 */
export const queryEmployeeRoleLevel = data => request.post(hostName + '/v1/moen/transaction/queryEmployeeRoleLevel', data)


/**
 * 首页kpi值
 * @param {*} data 
 */
export const queryMonthEmployeeKPI = data => request.post(hostName + '/v1/moen/transaction/queryEmployeeMonthTransactionKPI', data)


/**
 * 根据手机号查询交易历史
 * @param {*} data 
 */
export const queryMemberTransactionHistory = data => request.post(hostName + '/v1/moen/transaction/queryMemberTransactionHistory', data)


/**
 * 创建或者退单
 * @param {*} data 
 */
export const createTransaction = data => request.post(hostName + '/v1/moen/transaction/createTransaction', data)



/**
 * 发送注册验证码
 * @param {*} data 
 */
export const sendVerficationCode = data => request.get(hostName + '/v1/moenApp/security/oauth/sendVerficationCode', formatGetUri(data))


/**
 * 注册验证码校验
 * @param {*} data 
 */
export const checkVerficationCode = data => request.get(hostName + '/v1/moenApp/security/oauth/checkVerficationCode', formatGetUri(data))



/**
 * 获取商品数据
 * @param {*} data 
 */
export const getProductData = data => request.post(hostName + '/v1/moen/transaction/getProductData', data)



/**
 * 获取会员有效优惠券
 * @param {*} data 
 */
export const getMemberEffectiveCoupon = data => request.post(hostName + '/v1/moen/transaction/getMemberEffectiveCoupon', data)



/**
 * 查询店长/店员待核销、已核销总额
 * @param {*} data 
 */
export const queryEmployeePoints = data => request.post(hostName + '/v1/moen/transaction/queryEmployeePoints', data)


/**
 * 获取店员待核销列表
 * @param {*} data 
 */
export const getPointsListByUser = data => request.post(hostName + '/v1/moen/transaction/getPointsListByUser', data)



/**
 * 获取店铺待核销列表
 * @param {*} data 
 */
export const getPointsListByStore = data => request.post(hostName + '/v1/moen/transaction/getPointsListByStore', data)




/**
 * 查询店长/店员已核销列表
 * @param {*} data 
 */
export const queryClearPointsList = data => request.post(hostName + '/v1/moen/transaction/getClearPointsList', data)



/**
 * 获取选择优惠券的礼品列表
 * @param {*} data 
 */
export const getCouponGiftList = data => request.post(hostName + '/v1/moen/transaction/getCouponGiftList', data)



/**
 * 上传交易小票
 * @param {*} data 
 */
export const uploadTransImage = data => request.post(hostName + '/oss/image/master/file/upload', data)
