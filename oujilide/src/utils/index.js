
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
function formatTwo (n) {
  if (n >= 10) return n
  else return '0' + n
}


export function formatDate (date){
  var date = new Date(date);  
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
   
  return [year, month, day].map(formatNumber).join('-')
  }

  export function formatTime (date){
    var date = new Date(date);  
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
     
    return [year, month, day].map(formatNumber).join('-') + '   ' +  [hour, minute, second].map(formatNumber).join(':')
    }

    /**
     * 页面跳转
     */
    export function navigate(url) {
        wx.navigateTo({ url: url });
    }

    /**
     * 返回上一页
     */
    export function goBack(){
        wx.navigateBack({delta: 1})
    }


// 是否为手机号
export function isPhone (str) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/
  return reg.test(str)
}

export function formatImgStr (str) {
  const newStr = str.substr(0,str.length-1)
  return newStr
}

export function gmtCreate (allList, type) {
  if (typeof (allList) === 'object' && !isNaN(allList.length) === false) {
    if (type === 'hours') allList.gmtCreate = formatTime(allList.gmtCreate, 'hours')
    else allList.gmtCreate = formatTime(allList.gmtCreate)
    return allList
  } else {
    allList = allList.map((item, index) => {
      let obj = item
      if (item.commentList) obj['pageNum'] = item.commentList.length
      // if (item.commentList.length === 5) obj['currentPage'] = 2
      // else obj['currentPage'] = 1
      if (isNaN(obj.gmtCreate) === false) {
        if (type === 'day') obj.gmtCreate = formatTime(obj.gmtCreate)
        else if (type === 'open') {
          obj['open'] = false
          obj.gmtCreate = formatTime(obj.gmtCreate, 'hours')
        } else obj.gmtCreate = formatTime(obj.gmtCreate, 'hours')
      }
      return obj
    })
  }
}

export function toast (text, type,duration = 1500, callback) {
  if(type === 'success'){
    wx.showToast({
      title: text,
      duration:duration,
      icon: 'success'
    })
  } else if(type === 'loading'){
    wx.showToast({
      title: text,
      duration:duration,
      icon: 'loading'
    })
  } else {
    wx.showToast({
      title: text,
      duration:duration,
      icon: 'none'
    })
  }
  if (callback) {
    setTimeout(function () {
      callback()
    }, 1000)
  }
}


// 微信支付
export function requestPayment (res, callback) {
  wx.requestPayment({
    'timeStamp': res.timeStamp,
    'nonceStr': res.nonceStr,
    'package': res.pkg,
    'signType': 'MD5',
    'paySign': res.paySign,
    'success': function (res) {
      console.log(res)
      callback(res)
    },
    'fail': function (res) {
      console.log(res)
    }
  })
}

/**
 * 获取当前页面
 */
export function getCurrentPageUrl(){
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length-1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  return url
  }
