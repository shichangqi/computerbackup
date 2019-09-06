<template>
  <div class="authorization">
    <div class="bg">
      <img src="/static/images/authorization_bg.png" alt />
    </div>
    <div class="content">
      <button v-if="canIUse" open-type="getUserInfo" @getuserinfo="getUserInfo">微信授权</button>
      <div v-else>请升级微信版本</div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import {
  getToken,
  checkExistCampaignCoupon,
  getCampaignInfo,
  getCouponAgainInfo
} from "../../api/api";
import { reLaunch } from "../../utils/index";
export default {
  data() {
    return {
      canIUse: wx.canIUse("button.open-type.getUserInfo")
    };
  },
  onLoad(options) {},
  methods: {
    /**
     * 获取Actions
     */
    ...mapActions(["getAccessToken"]),

    /**
     * 登录授权按钮
     */
    getUserInfo(e) {
      let userInfo = e.target ? e.target.userInfo : null;
      console.log(e);
      console.log(userInfo);
      if (!userInfo) {
        return wx.showToast({
          title: "为了更好的体验，请允许授权 ",
          icon: "none"
        });
      }
      // 点击了授权
      wx.showToast({ title: "授权成功", icon: "sucess" });
      wx.login({
        success(res) {
          if (!res.code) return;
          //获取到code和用户信息
          wx.setStorageSync("code", res.code);
          let data = {
            code: res.code,
            encryptedData: e.mp.detail.encryptedData,
            iv: e.mp.detail.iv
          };
          getToken(data).then(res => {
            if (res.data.return_message == "Success") {
              wx.setStorageSync("is_member", res.data.result.is_member);
              wx.setStorageSync("token", res.data.result.token);
              wx.setStorageSync("encryptedData", e.mp.detail.encryptedData);
              wx.setStorageSync("iv", e.mp.detail.iv);
              wx.setStorageSync("userinfo", e.mp.detail.userInfo);
              getCampaignInfo({
                //判断是否有活动
                cam_code: wx.getStorageSync("channel")
              }).then(re => {
                if (re.data.return_message == "Success") {
                  if (res.data.result.is_member) {
                    //如果已注册
                    if (re.data.return_result.campaginCoupon) {
                      wx.setStorageSync("hasactivity", true);
                      getCouponAgainInfo({}).then(res1=>{
                        if(res1.data.return_message == "Success"){
                          if(res1.data.return_result.hasRepeatCoupon){
                            reLaunch("/pages/getCoupon/main?show=false"); //show=false表示到领券页取消弹窗
                          }else{
                            reLaunch("/pages/index/main");
                          }
                        }
                      });
                      // checkExistCampaignCoupon({
                      //   //判断是否当前活动领过券
                      // }).then(res1 => {
                      //   if (!res1.data.return_result) {
                      //     reLaunch("/pages/getCoupon/main?show=false"); //show=false表示到领券页取消弹窗
                      //   } else {
                      //     reLaunch("/pages/index/main");
                      //   }
                      // });
                    } else {
                      reLaunch("/pages/index/main");
                    }
                  } else {
                    //未注册
                    if (re.data.return_result.campaginCoupon) {
                      wx.setStorageSync("hasactivity", true);
                      reLaunch("/pages/getCoupon/main?show=false"); //show=false表示到领券页取消弹窗
                    } else {
                      reLaunch("/pages/register/main");
                    }
                  }
                }
              });
            } else {
              wx.showToast({
                title: `${res.data.return_message}`,
                icon: "none",
                mask: true
              });
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
page {
  height: 100%;
  overflow: hidden;
}
.authorization {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    button {
      position: absolute;
      bottom: 40px;
      left: 0;
      right: 0;
      margin: auto;
      width: 275px;
      height: 44px;
      background: #1b365d;
      color: #fff;
      font-size: 16px;
      border-radius: 25px;
      text-align: center;
      line-height: 44px;
      box-shadow: 0px 12px 12px rgba(91, 127, 149, 0.24);
    }
  }
}
</style>

