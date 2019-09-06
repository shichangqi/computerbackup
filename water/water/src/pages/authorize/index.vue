<template lang="html">
  <div class="authorize">
    <button open-type="getUserInfo" @getuserinfo="getUserInfo">获取微信授权</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      info: {
        code: null
      }
    };
  },
  onShow() {
    let that = this;
    this.info = {
      code: null
    };
    wx.login({
      success(resLogin) {
        if (resLogin.code) {
          that.info["code"] = resLogin.code;
          that.$store.commit("RECORD_TOKEN", resLogin.code);
        }
      }
    });
  },
  methods: {
    ...mapActions(["getAccessToken"]),

    getUserInfo (e) {
      // console.log(e,'456')
      const userInfo = e.target && e.target.userInfo
      if (!userInfo) {
        wx.showToast({ title:'拒绝授权，将无法使用本小程序全部功能，请重新获取授权！', icon:'none', mask: true})
        return
      }
      this.info.nickname = e.target.userInfo.nickName
      this.info.headimgurl = e.target.userInfo.avatarUrl
      this.info.sex =  userInfo.gender
      this.$store.dispatch('getAccessToken', this.info).then(res => {
        debugger
        if (res) {
          //  授权成功，获取到用户信息
          wx.redirectTo({
            url: '/pages/conservancy/main'
          })
        }
      })
    }
  }
};
</script>

<style lang="less">
.authorize {
  width: 100vw;
  height: 100vh;
  background: #fff;
  clear: both;
  overflow: hidden;
  img {
    display: block;
    width: 168px;
    height: 57px;
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 80px;
  }
  p {
    width: 100%;
    text-align: center;
    font-size: 13px;
    color: #888;
    margin-bottom: 10px;
  }
  button {
    width: 160px;
    height: 44px;
    background: linear-gradient(
      143deg,
      rgba(252, 116, 132, 1) 0%,
      rgba(255, 76, 76, 1) 100%
    );
    box-shadow: 0px 4px 8px 0px rgba(255, 76, 76, 0.3);
    border-radius: 22px;
    line-height: 44px;
    font-size: 16px;
    color: #ffffff;
    margin: 100px auto;
  }
}
</style>
