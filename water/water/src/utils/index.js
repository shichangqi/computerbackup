// import Qs from 'qs'
// import md5 from 'js-md5'
// import Data from '@/data'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

// function formatParams ({ body, url }) {
//   let params = Qs.stringify(body, {sort: (a, b) => a.localeCompare(b), encode: false})
//   let str = `${params}&key=b6f07d1770814725acee637fb1570f68`
//   body.sign = md5(str).toUpperCase()
//
//   return Qs.stringify(body)
// }
//
// function formatResponse (code) {
//   return Data.statusCode[code]
// }

function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// 随机数
function randomString (len) {
  len = len || 32
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = chars.length
  var pwd = ''
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
export default {
  formatNumber,
  formatTime,
  // formatParams,
  // formatResponse,
  randomString
}
