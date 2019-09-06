import wx from 'wx'
import Fly from 'flyio'

const request = new Fly()

request.interceptors.request.use((request) => {
//   wx.showNavigationBarLoading()
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    // wx.hideNavigationBarLoading()
    wx.showModal({
      title: err.message
      // content: '这是一个模态弹窗'

    })
    return promise.resolve()
  }
)

export default request
