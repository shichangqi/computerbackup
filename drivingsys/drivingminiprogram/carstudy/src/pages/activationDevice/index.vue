<template>
  <div class="activationDevice">
    <div class="container">
      <div class="device">
        <div class="panel">
          <span>设备序列号</span>
          <span class="devicenum">12345678</span>
        </div>
      </div>
      <div class="content2">
        <div class="panel panel1">
          <span>所在城市</span>
          <span class="gray city">请选择练车城市</span>
          <img src="/static/images/arrow_right.png" alt />
        </div>
        <div class="panel">
          <span>代理商编号</span>
          <input
            type="number"
            placeholder="5位数字编号"
            placeholder-style="color:#7E7E7E;font-size:17px"
            class="proxynum"
          />
        </div>
      </div>
      <div class="content2">
        <div class="panel">
          <span>姓名</span>
          <input
            type="text"
            placeholder="您的真实姓名"
            placeholder-style="color:#7E7E7E;font-size:17px"
            class="sexname"
          />
        </div>
        <div class="panel panel1">
          <span>手机号</span>
          <input
            type="number"
            placeholder="11位手机号"
            placeholder-style="color:#7E7E7E;font-size:17px"
            class="phone"
            v-model="phone"
          />
          <span @click="getcode">{{codeBtn}}</span>
        </div>
        <div class="panel">
          <span>验证码</span>
          <input
            type="number"
            placeholder="数字验证码"
            placeholder-style="color:#7E7E7E;font-size:17px"
            class="phone"
          />
        </div>
      </div>
    </div>
    <div class="loginbtn">保存</div>
  </div>
</template>
<script>
import {sendPhoneCode} from '../../api/api'

export default {
  data(){
    return{
      phone:'',
      count: "",
      timer: null,
      codeBtn: "获取验证码",
    }
  },
  methods:{
       getcode() {
      const TIME_COUNT = 60;
      if (this.count > 0 && this.count <= TIME_COUNT) {
        return;
      }
      if (!this.timer) {
        this.count = TIME_COUNT;
        sendPhoneCode({
          phone:this.phone
        }).then(res=>{
          if(res.data.code == 0){
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
          }else{
             wx.showToast({
              title: `${res.data.msg}`,
              icon: "none",
              mask: true
            });
          }
        });
      }
    },
  }
};
</script>
<style lang="less" scoped>
.activationDevice {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ededed;
  z-index: -2;
  .container {
    padding-top: 20rpx;
    .panel {
      display: flex;
      padding: 30rpx;
      background: #fff;
      font-size: 34rpx;
      border-bottom: 1rpx solid #d9d9d9;
      input {
        flex: 1;
      }
      .proxynum {
        margin-left: 57rpx;
      }
      .phone {
        margin-left: 122rpx;
      }
      &:last-child {
        border: 0;
      }
      .devicenum {
        margin-left: 55rpx;
      }
      .gray {
        color: #7e7e7e;
      }
      .sexname {
        margin-left: 158rpx;
      }
      img {
        width: 14rpx;
        height: 26rpx;
      }
    }
    .content2 {
      margin-top: 20rpx;
      .panel1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .city {
          margin-right: 150rpx;
        }
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
    margin: 51rpx auto 0 auto;
    font-size: 36rpx;
    background: linear-gradient(90deg, #ea4e27, #fc9148);
    border-radius: 50rpx;
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
</style>