<template>
  <div class="personal">
    <div class="container">
      <div class="header">
        <span>头像</span>
        <img :src="avatar" alt />
      </div>
      <div class="content">
        <div class="panel">
          <span>手机号</span>
          <div class="right">{{phone}}</div>
        </div>
        <div class="panel">
          <span>姓名</span>
          <div class="right">
            <input
              type="text"
              placeholder="真实姓名，与身份证一致"
              placeholder-style="color:#7E7E7E;font-size:15px"
              v-model="name"
            />
          </div>
        </div>
      </div>
      <p class="tips">请使用真实姓名，不然教练都不知道是你...</p>
      <div class="loginbtn" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
import { register } from "../../api/api";
import { redirectTo } from "../../utils";
export default {
  data() {
    return {
      phone: "",
      name: "",
      avatar: ""
    };
  },
  onLoad() {
    this.phone = wx.getStorageSync("phone");
    this.avatar = wx.getStorageSync("avatar");
    this.name = wx.getStorageSync("username");
  },
  methods: {
    save() {
      if (this.name == "") {
        wx.showToast({ title: "请输入您的真实姓名", icon: "none", mask: true });
        return;
      }
      register({
        telephone: this.phone,
        openid: wx.getStorageSync("openid"),
        avatar: this.avatar,
        name: this.name
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          if (res.data.data == true) {
            wx.showToast({ title: "保存成功", icon: "none", mask: true });
            setTimeout(() => {
              redirectTo("/pages/index/main");
            }, 1000);
          }
        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: "none",
            mask: true
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.personal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: #ededed;
  .container {
    padding-top: 20rpx;
    font-size: 34rpx;
    .header {
      display: flex;
      align-items: center;
      padding: 25rpx 0 25rpx 30rpx;
      background: #fff;
      img {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
        margin-left: 140rpx;
      }
    }
    .content {
      margin-top: 19rpx;
      .panel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 30rpx;
        background: #fff;
        height: 90rpx;
        border-bottom: 1rpx solid #d9d9d9;
        &:last-child {
          border: 0;
        }
        .right {
          width: 513rpx;
          font-size: 30rpx;
          text-align: left;
          input {
            width: 100%;
          }
        }
      }
    }
    .tips {
      font-size: 30rpx;
      color: #7e7e7e;
      padding-left: 27rpx;
      margin-top: 21rpx;
    }
    .loginbtn {
      position: relative;
      width: 600rpx;
      color: #fff;
      height: 100rpx;
      text-align: center;
      line-height: 100rpx;
      font-size: 36rpx;
      background: linear-gradient(90deg, #ea4e27, #fc9148);
      border-radius: 50rpx;
      margin: 52rpx auto 0 auto;
      &::after {
        content: "";
        position: absolute;
        z-index: -1;
        bottom: -10px;
        left: 0;
        right: 0;
        margin: auto;
        height: 105%;
        width: 85%;
        opacity: 0.4;
        border-radius: 50rpx;
        background: inherit;
        -webkit-filter: blur(6px);
        -moz-filter: blur(6px);
        -o-filter: blur(6px);
        -ms-filter: blur(6px);
        filter: blur(6px);
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
      }
    }
  }
}
</style>
