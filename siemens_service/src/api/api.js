// import {bsrequest,request} from "./request";
// // import querystring from 'querystring'
// import { formatGetUri } from '../utils/formatHttp'
// // const hostName = 'https://csshoptest.wechat.bshg.com.cn'
// const hostName = 'https://dob.wechat.bshg.com.cn'
// const mmhostName = 'https://siemensqrmp.bshg.com.cn/apd'

// const hostName = 'http://192.168.110.62:10005'

import {bsrequest,request,notrequest} from "./request";
// import querystring from 'querystring'
import { formatGetUri } from '../utils/formatHttp'
// const hostName = 'https://csshoptest.wechat.bshg.com.cn'
const hostName = 'https://dob.wechat.bshg.com.cn'
const mmhostName = 'https://Siemenswechatmp.bshg.com.cn/siemenscs'
// const hostName = 'http://192.168.110.62:10005'
// const mmhostName2 = 'http://adminb.frp.dev.wmeimob.com/api'
const mmhostName2 = 'https://cmstest.bshg.com.cn/api'
// const hostName = 'http://192.168.110.62:10005'



/**
 * 获取apptoken授权登录
 * @param data
 * @returns {FlyPromise<any>}
 */
export const getAppToken = data => request.get(mmhostName+'/wx_code/wx-token', formatGetUri(data))


/**
 * 获取用户信息
 * @param data
 * @returns {FlyPromise<any>}
 */

export const getUserInfo = data => request.get(mmhostName+'/wx/user/getUserInfo')

/**
 * 保存订单
 * @param data
 * @returns {FlyPromise<any>}
 */
export const wxordersave = data => request.post(mmhostName+'/wx/order',data)

/**
 * 更新用户信息
 * @param data
 * @returns {FlyPromise<any>}
 */
export const updateuser = data => request.post(mmhostName+'/wx/user/updateUser',data)
/**
 * 订单列表
 * @param data
 * @returns {FlyPromise<any>}
 */
export const wxorderList = data => request.get(mmhostName+'/wx/order/list',data)

/**
 * 获取产品列表
 * @param data
 * @returns {FlyPromise<any>}
 */
export const productList = data => request.get(mmhostName+'/wx/user/getProduct',data)

/**
 * 获取产品问题详细列表
 * @param data
 * @returns {FlyPromise<any>}
 */
export const productProblem = data => notrequest.get(mmhostName2+'/cms/web',data)

/**
 * 获取产品问题详细富文本
 * @param data
 * @returns {FlyPromise<any>}
 */
export const richContent = data => notrequest.get(mmhostName2+'/cms/web/fullText/' + data.id)

/**
 * 获取产品问题详细
 * @param data
 * @returns {FlyPromise<any>}
 */
export const problemDetail = data => notrequest.get(mmhostName2+'/cms/web/getCmsById',data)

/**
 * 收藏取消问题
 * @param data
 * @returns {FlyPromise<any>}
 */
export const problemCollect = data => notrequest.get(mmhostName2+'/cms/web/upLove',data)

/**
 * 当天是否点击过维修
 * @param data
 * @returns {FlyPromise<any>}
 */
export const getUserredis = data => request.get(mmhostName+'/wx/user/getUserRedis')

/**
 * 查询服务问题
 * @param data
 * @returns {FlyPromise<any>}
 */
export const getservicecontent = data => request.get(mmhostName+'/wx/servicecontent',formatGetUri(data))


/**
 * 获取最近的服务点
 * @param data
 * @returns {FlyPromise<any>}
 */

export const getrecentservice = data => request.get(mmhostName+'/wx/cms/mobile',formatGetUri(data))


/**
 * 机器绑定
 * @param data
 * @returns {FlyPromise<any>}
 */
export const productBind = data => request.post(mmhostName+'/wx/user/binding',data);


/**
 * 查询机器绑定
 * @param data
 * @returns {FlyPromise<any>}
 */
export const queryProductBind = data => request.get(mmhostName+'/wx/user/apparatus');
/**
 * 保存用户unionid
 * @param data
 * @returns {FlyPromise<any>}
 */

export const saveUnionId = data => request.post(mmhostName+'/wx_code/insert_user',data)

/**
 * 获取用户微信手机号
 * @param data
 * @returns {FlyPromise<any>}
 */
export const getUserPhone = data => request.get(mmhostName+'/wx_code/decodeUserInfo',formatGetUri(data))
/**
 * 绑定机器
 * @param data
 * @returns {FlyPromise<any>}
 */

export const bindProduct = data => request.post(mmhostName+'/wx/user/binding',data);

/**
 * 博西接口授权
 */
// export const getToken = data => request.get(hostName + '/wechat/basic/getToken', formatGetUri(data))

export const getToken = data => bsrequest.post(hostName + '/dob_api/token/getToken', data)

/**
 * 获取地址信息
 * @param data
 * @returns {FlyPromise<any>}
 */
export const getAddress = data => bsrequest.post(hostName + '/dob_api/addressInfo/list', data)


/**
 * 获取24小时是否聊天
 * @param data
 * @returns {FlyPromise<any>}
 */
export const gethourchat = data => bsrequest.post(hostName + '/dob_api/contact/isContact', data)

/**
 * 获取dob历史订单
 * @param data
 * @returns {FlyPromise<any>}
 */

export const getdoborder = data => bsrequest.post(hostName + '/dob_api/orderInfo/orderList', data)
/**       
 * 保存UnionId
 * @param data
 * @returns {FlyPromise<any>}
 */
export const saveuniondid = data => bsrequest.post(hostName + '/dob_api/uniondId/save', data)

/**
 * 获取省市区
 * @param data
 * @returns {FlyPromise<any>}
 */

export const getAreaInfo = data => bsrequest.post(hostName + '/dob_api/areaInfo/getAreaJson')

/**
 * 获取产品组
 * @param data
 * @returns {FlyPromise<any>}
 */

export const getInstallProductTypes = data => bsrequest.post(hostName + '/dob_api/productInfo/productTypes',data)
/**
 * 获取安装产品组
 * @param data
 * @returns {FlyPromise<any>}
 */

export const getProductTypes = data => bsrequest.post(hostName + '/dob_api/productInfo/installProductTypes',data)

/**
 * 获取产品型号
 * @param data
 * @returns {FlyPromise<any>}
 */
// export const getProductModal = data => bsrequest.post(hostName + '/dob_api/productInfo/cosmosProducts',data)
export const getProductModal = data => bsrequest.post(hostName+'/dob_api/productInfo/cosmosProducts',data)

/**
 * 提交订单
 * @param data
 * @returns {FlyPromise<any>}
 */

export const saveOrder = data => bsrequest.post(hostName + '/dob_api/orderInfo/saveOrder',data);

/**
 * 添加地址
 * @param data
 * @returns {FlyPromise<any>}
 */
export const addAddress = data => bsrequest.post(hostName + '/dob_api/addressInfo/add',data);

/**
 * 修改地址
 * @param data
 * @returns {FlyPromise<any>}
 */
export const editAddress = data => bsrequest.post(hostName + '/dob_api/addressInfo/edit',data);

/**
 * 获取验证码
 * @param data
 * @returns {FlyPromise<any>}
 */

export const getcode = data => bsrequest.post(hostName + '/dob_api/addressInfo/sendVaild',data);


/**
 * 删除地址
 * @param data
 * @returns {FlyPromise<any>}
 */
export const deleteaddress = data => bsrequest.post(hostName + '/dob_api/addressInfo/delete',data);

/**
 * 预约维修产品组查询
 * @param data
 * @returns {FlyPromise<any>}
 */
export const getrepairtypes = data => bsrequest.post(hostName + '/dob_api/productInfo/installProductTypes',data);





export const keyCos = data => bsrequest.get(mmhostName + '/user/cos',data);
