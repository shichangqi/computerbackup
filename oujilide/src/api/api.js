import request from './request'
// import querystring from 'querystring'
import { formatGetUri } from '../utils/formatHttp'
const hostName = 'https://wx.euclidsys.com.cn'
// const hostName = 'http://192.168.110.62:10005'
/**
 * 获取用户信息
 */
export const getUserInfo = data => request.get(hostName + '/wechat/basic/', data)
/**
 * 授权登录
 */
export const getToken = data => request.get(hostName + '/wechat/basic/getToken', formatGetUri(data))
/**
 * 获取验证码
 */
export const getCode = data => request.get(hostName + '/wechat/common/reg-sms', formatGetUri(data))
/**
 * 提交第一步注册信息
 */
export const submitFirstRegister = data => request.get(hostName + '/wechat/basic/code', data)
/**
 * 提交第二步注册信息
 */
export const submitSecondRegister = data => request.post(hostName + '/wechat/basic/register', data)
/**
 * 获取所有话题
 */
export const getTopic = data => request.get(hostName + '/wechat/basic/topic', data)
export const getTopicUser = data => request.get(hostName + '/wechat/basic/topicUser', data)
/**
 * 修改用户信息
 */
export const updateInfo = data => request.put(hostName + '/wechat/basic/', data)
/**
 * 验真
 */
export const checkManagement = data => request.post(hostName + '/wechat/checkManagement/', data)
/**
 * 获取纪录
 */
export const checkRecord = data => request.get(hostName + '/wechat/checkManagement/checkRecord', data)
/**
 * 查询所有问题名称
 */
export const questionList = data => request.get(hostName + '/wechat/questionsAndAnswers/', data)
/**
 * 根据id查询题目
 */
export const listById = data => request.get(hostName + '/wechat/questionsAndAnswers/list', formatGetUri(data))
/**
 * 查询答案
 */
export const problemManagement = data => request.get(hostName + `/wechat/questionsAndAnswers/problemManagement/${data.id}`, data)
/**
 * 获取查验验证码
 */
export const getCode1 = data => request.get(hostName + '/wechat/basic/getCode', data)
/**
 * 通知书
 */
export const system = data => request.get(hostName + '/wechat/basic/system', data)
