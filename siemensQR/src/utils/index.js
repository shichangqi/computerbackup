import { getToken } from "../api/api";

export  function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1}`
  // return `${t1} ${t2}`
}
export function arrayTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber)

  return t1
  // return `${t1} ${t2}`
}
// 格式化时间
export function formatTime2(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

/**
 * 页面跳转
 */
export function navigate(url) {
  wx.navigateTo({ url: url });
}
/**
 * 页面跳转替换当前页
 */
export function redirectTo(url) {
  wx.redirectTo({ url: url });
}
/**
 * 页面跳转清空所有页面
 */
export function reLaunch(url) {
  wx.reLaunch({ url: url });
}

/**
 * 返回上一页
 */
export function goBack() {
  wx.navigateBack({ delta: 1 })
}

export function genID(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

export function getBStoken() {

  const formData = {
    account: "admin",
    password: "admin"
  }
  getToken(formData).then(function (res) {
    console.log(res.data)
    wx.setStorageSync('bstoken', res.data.data.token)
  })
}
