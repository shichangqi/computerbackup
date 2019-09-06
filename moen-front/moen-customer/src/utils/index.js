function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
   date = new Date(date.replace(/\-/g, '/'));
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  // const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1}`
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


/**
 * 数字转化为千分位金额格式
 * @param {*} number  要格式化的数字
 * @param {*} decimals 保留几位小数
 * @param {*} dec_point 小数点的符号
 * @param {*} thousands_sep 千分位符号
 */
export function formatToMoeny(number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

export function remoney(e) {
  return parseFloat(e.replace(/[^\d\.-]/g, ""));
}
