<script>
export default {
  onLaunch() {
    this._launch()
  },
  methods: {
    _launch() {
      if (!wx.getStorageSync('token')) {
        wx.reLaunch({
          url: '/pages/authorize/main'
        })
      }
    }
  }
}
</script>

<style lang="less">
@import url("~mpvue-wxparse2/src/wxParse.css");
page {
  min-height: 100vh;
}
button {
  margin-left: 0;
  margin-right: 0;
  &::after {
    content: none;
  }
}
.container {
  min-height: 100vh;
  box-sizing: border-box;
  background: #FAFAFA;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
