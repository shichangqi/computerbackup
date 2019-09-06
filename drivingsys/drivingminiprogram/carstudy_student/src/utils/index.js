function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
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


export const promisic = func => {
  return (params = {}) => {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        }
      })
      func(args)
    })
  }
}