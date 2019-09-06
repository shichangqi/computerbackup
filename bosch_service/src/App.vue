<script>

export default {
  onShow(option){
    wx.removeStorageSync('extraData')
    console.log(121111)
    console.log(option.referrerInfo.extraData)
    if(option.referrerInfo.extraData){
      wx.setStorageSync('extraData',option.referrerInfo.extraData)
    }
  },
}
</script>

<style lang="less">
page{
  background: #F6F6F6;
}
::-webkit-scrollbar{
  width: 0;
  height: 0;
  color: transparent;
}
.wxcontent{
.p{
  padding: 0 15px!important;
}
}
  .iframe{
    width: 100%!important;
  }
  ul,ol,li{
    list-style: none;
  }
</style>
