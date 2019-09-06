<template>
  <div class="scanidentitycode">
    <div class="top">
      <img src="/static/images/qrcode.png" alt @click="scanqrcode" />
      <p>扫描身份码</p>
    </div>
    <div class="phone">
      <div class="tip">无身份码请输入客户手机号</div>
    </div>
    <div class="nextbtn">下一步</div>
  </div>
</template>
<script>
import { navigate } from "../../utils";

export default {
  data() {
    return {
      userId: 0
    };
  },
  onUnload(){
    wx.removeStorage({key:'orderinfo'})
  },
  methods: {
    scanqrcode() {
      let that = this;
      wx.scanCode({
        success: res => {
          that.userId = decodeURI(res.result).split(",")[2];
          let orderinfo = {
            member_id: that.userId *1
          };
          wx.setStorageSync("orderinfo", orderinfo);
          navigate(`/pages/addGoods/main?userid=${that.userId}`);
        },
        fail: res => {
          console.log(res);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.scanidentitycode {
  position: absolute;
  top: 0;
  left: 0;
  background: #f4f4f4;
  height: 100%;
  width: 100%;
  .top {
    height: 380rpx;
    background: #b7c9d3;
    text-align: center;
    font-size: 32rpx;
    color: #fff;
    img {
      width: 160rpx;
      height: 150rpx;
      margin: 73rpx 0 40rpx 0;
    }
  }
  .phone {
    padding: 0 32rpx;
    margin-top: 50rpx;
    font-size: 32rpx;
    color: rgba(255, 255, 255, 0.5);
    .tip {
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      background: rgba(204, 204, 204, 1);
      border-radius: 10rpx;
      text-align: center;
    }
  }
  .nextbtn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 44px;
    z-index: 99999;
    background: #cccccc;
    line-height: 44px;
    text-align: center;
    color: #fff;
  }
}
</style>
