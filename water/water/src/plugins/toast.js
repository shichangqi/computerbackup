const toast = {
  text: (text, callback) => {
    wx.showToast({
      icon: 'none',
      title: text
    })

    setTimeout(() => {
      callback && callback()
    }, 1500)
  },
  success: (text, callback) => {
    wx.showToast({
      title: text
    })

    setTimeout(() => {
      callback && callback()
    }, 1500)
  },
  showLoading: (text = 'Loading') => {
    wx.showLoading({
      title: text,
      mask: true
    })
  },
  hideLoading: () => {
    wx.hideLoading()
  }
}

export default toast
