<template>
  <div class="register">
    <img src="/static/images/moen_logo.png" alt class="logo" />
    <div class="form">
      <div class="phone">
        <img src="/static/images/regist_phone.png" alt />
        <input
          type="number"
          placeholder="请输入您的手机号"
          placeholder-style="color:rgba(27, 54, 93, .5);font-size:16px"
          v-model="phone"
          @blur="inputphone"
        />
      </div>
      <div class="phonecode">
        <img src="/static/images/regist_code.png" alt />
        <input
          type="number"
          placeholder="请输入验证码"
          v-model="verifyCode"
          placeholder-style="color:rgba(27, 54, 93, .5);font-size:16px"
        />
        <div class="getcode" @click="getcode">{{codeBtn}}</div>
      </div>
      <p class="statement" @click="check">
        <img
          :src="checked?'/static/images/regist_checked.png':'/static/images/register_check.png'"
          alt
        />
        <span class="text">
          我已阅读摩恩俱乐部
          <span @click.stop="goprivacy">隐私声明</span>，同意加入
        </span>
      </p>
      <div class="registerBtn" @click="register">提交验证</div>
    </div>
  </div>
</template>

<script>
import storage from "../../utils/storage";
import {
  sendVerficationCode,
  checkVerficationCode,
  register,
  addCampaignCoupon
} from "../../api/api";
import { reLaunch, navigate } from "../../utils/index";
export default {
  data() {
    return {
      checked: false,
      count: "",
      timer: null,
      codeBtn: "获取验证码",
      phone: "",
      verifyCode: ""
    };
  },
  onLoad() {
    // this.phone = storage.get("phone");
  },
  onUnload() {
    clearInterval(this.timer);
  },
  methods: {
    goprivacy() {
      navigate("/pages/privacyStatement/main");
    },
    check() {
      this.checked = !this.checked;
    },
    getcode() {
      const TIME_COUNT = 60;
      if (this.count > 0 && this.count <= TIME_COUNT) {
        return;
      }
      if (!this.timer) {
        this.count = TIME_COUNT;

        sendVerficationCode({
          mobile: this.phone
        }).then(res => {
          if (res.data.return_message == "Success") {
            wx.showToast({ title: "发送成功", icon: "none", mask: true });
            this.timer = setInterval(() => {
              if (this.count <= 0) {
                this.codeBtn = "重新获取";
                clearInterval(this.timer);
                this.timer = null;
              } else {
                this.count--;
                this.count == 0
                  ? (this.codeBtn = "重新获取")
                  : (this.codeBtn = `${this.count}s`);
              }
            }, 1000);
          } else {
            wx.showToast({
              title: `${res.data.return_message}`,
              icon: "none",
              mask: true
            });
          }
        });
      }
    },
    register() {
      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))){ 
        wx.showToast({ title: "手机号格式不正确！", icon: "none", mask: true });
        return;
      }
      if (this.verifyCode == "") {
        wx.showToast({ title: "请输入验证码！", icon: "none", mask: true });
        return;
      }
      if (!this.checked) {
        wx.showToast({ title: "请勾选隐私声明！", icon: "none", mask: true });
      } else {
        checkVerficationCode({
          mobile: this.phone,
          verificationCode: this.verifyCode
        }).then(res => {
          if (res.data.return_message == "Success") {
            if (res.data.return_result.checkFlag) {
              console.log(wx.getStorageSync("channel"));
              register({
                full_name: wx.getStorageSync("userinfo").nickName,
                mobile: this.phone,
                register_channel_code: wx.getStorageSync("channel")
              }).then(res1 => {
                if (res1.data.return_message == "Success") {
                  wx.setStorageSync("token", res1.data.result.token);
                  if (wx.getStorageSync("hasactivity")) {
                    addCampaignCoupon({}).then(res2 => {
                      if (res2.data.return_message == "Success") {
                        if (wx.getStorageSync("receivecoupon")) {
                          reLaunch("/pages/getCoupon/main?show=true");
                        } else {
                          reLaunch("/pages/index/main");
                        }
                      }
                    });
                  } else {
                    wx.reLaunch({
                      url: "/pages/index/main"
                    });
                  }
                }
              });
            }else{
               wx.showToast({
              title: '验证码错误',
              icon: "none",
              mask: true
            });
            }
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.register {
  position: absolute;
  background: #7490a5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  .logo {
    width: 103px;
    height: 23px;
    margin-top: 59px;
  }
  .form {
    padding: 57px 32px 0 32px;
    text-align: left;
    input {
      height: 44px;
      font-size: 16px;
      color: #fff;
    }
    .phone {
      display: flex;
      align-items: center;
      height: 44px;
      border-bottom: 1px solid #b7c9d3;
      img {
        width: 11px;
        height: 18px;
        margin-right: 11px;
      }
    }
    .phonecode {
      position: relative;
      display: flex;
      align-items: center;
      height: 44px;
      border-bottom: 1px solid #b7c9d3;
      input {
        width: 70%;
      }
      img {
        width: 29rpx;
        height: 36rpx;
        margin-right: 9px;
      }
      .getcode {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        font-size: 14px;
        color: #7490a5;
        width: 80px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        background: #b7c9d3;
        border-radius: 2px;
      }
    }
    .statement {
      display: flex;
      align-items: center;
      margin-top: 10px;
      color: #b7c9d3;
      font-size: 14px;
      img {
        width: 15px;
        height: 15px;
      }
      .text {
        margin-left: 9px;
        span {
          color: #c6893f;
        }
      }
    }
    .registerBtn {
      width: 100%;
      height: 44px;
      background: rgba(183, 201, 211, 1);
      border-radius: 4px;
      text-align: center;
      line-height: 44px;
      font-size: 16px;
      color: #7490a5;
      margin-top: 59px;
    }
  }
}
</style>
