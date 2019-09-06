/**
 * 拼接对象为请求字符串
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 */
export function formatGetUri (obj) {
  const params = []
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    if (typeof value === 'undefined' || value === null || value === '') {
    } else {
      params.push([key, encodeURIComponent(value)].join('='))
    }
  })
  return params.join('&')
}
export function formatGetUri2 (obj) {
  const params = []
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    if (typeof value === 'undefined' || value === null || value === '') {
    } else {
      params.push([key, encodeURIComponent(value)].join('='))
    }
  })
  return   params.join('&')
}
// export function formatFormData (obj) {
//   const formData = new FormData()
//   Object.keys(obj).forEach((key) => {
//     let value = obj[key]
//     if (typeof value === 'undefined') {
//       value = ''
//     }
//     formData.append(key, value)
//   })
//   return formData
// }
