<script>
export default {
  onLaunch(option){
    console.log('cui-option', option)
    if (option.referrerInfo) wx.setStorageSync('extraData',option.referrerInfo.extraData)
    else  wx.removeStorage('extraData')
  },
}
</script>

<style>
page{
  background: #F6F6F6;
}
::-webkit-scrollbar{
  width: 0;
  height: 0;
  color: transparent;
}
</style>
