<template>
  <div class="minecoach">
    <div class="container">
      <div class="content">
        <p>
          <span class="s1">我的教练</span>
          <span class="s2">{{info.coach_name}}</span>
        </p>
        <p>
          <span class="s1">设备编号</span>
          <span class="s2">{{info.equipment_id}}</span>
        </p>
        <p>
          <span class="s1">练车单价</span>
          <span class="s2">{{info.price}}元/小时</span>
        </p>
        <p>
          <span class="s1">收费模式</span>
          <span class="s2">{{info.charging_model}}</span>
        </p>
      </div>
      <div class="loginbtn" @click="loginout">退出设备</div>
    </div>
  </div>
</template>

<script>
import { login_equipment, studentlogout } from "../../api/api";
export default {
  data() {
    return {
      info: {},
      equipment_id: 123
    };
  },
  onLoad() {
    this.getinfo();
  },
  methods: {
    loginout() {
      studentlogout({
        openid: wx.getStorageSync("openid"),
        equipment_id: this.equipment_id
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          if (res.data.data == true) {
            wx.showToast({
              title: "退出设备成功！",
              icon: "none",
              mask: true
            });
          }
        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: "none",
            mask: true
          });
        }
      });
    },
    getinfo() {
      login_equipment({
        equipment_id: this.equipment_id
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.info = res.data.data;
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
.minecoach {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: #ededed;
  .container {
    padding-top: 20rpx;
    font-size: 30rpx;
    .content {
      padding: 32rpx 29rpx 29rpx 29rpx;
      background: #fff;
      p {
        margin-bottom: 11rpx;
        &:last-child {
          margin: 0;
        }
        .s1 {
          color: #7e7e7e;
        }
        .s2 {
          margin-left: 114rpx;
        }
      }
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
      margin: 50rpx auto 0 auto;
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
