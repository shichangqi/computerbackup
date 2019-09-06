<template>
  <div class="activationDevice">
    <div class="container">
      <div class="header">
        <div class="panel panel1">
          <span>头像</span>
          <span class="right">
            <img :src="avatar" alt class="head" />
            <img class="arrow" src="/static/images/arrow_right.png" alt />
          </span>
        </div>
      </div>
      <div class="content2">
        <div class="panel">
          <span>手机号</span>
          <input
            type="text"
            placeholder="11位手机号"
            placeholder-style="color:#7E7E7E;font-size:15px"
            v-model="phone"
            class="right"
          />
          <!-- <span class="right phone">13112345678</span> -->
        </div>
        <div class="panel">
         <span>姓名</span>
         <input
            type="text"
            placeholder="真实姓名，与身份证一致"
            placeholder-style="color:#7E7E7E;font-size:15px"
            v-model="name"
            class="right"
          />
          <!-- <span class="right">真实姓名，与身份证一致</span> -->
        </div>
      </div>
      <div class="content2">
        <div class="panel" @click="goschool">
          <span>所在驾校</span>
          <span class="right"><span>{{school?school.name:'选择您的驾校'}}</span> <img class="arrow" src="/static/images/arrow_right.png" alt /></span>
        </div>
        <div class="panel">
         <span>所在考场</span>
          <span class="right"><span>平时训练、考试的考场</span> <img class="arrow" src="/static/images/arrow_right.png" alt /></span>
        </div>
      </div>
      <div class="content2">
        <div class="panel panel1" @click="goauth">
          <span>认证信息</span>
          <span class="right"><span>未认证</span> <img class="arrow" src="/static/images/arrow_right.png" alt /></span>
        </div>
      </div>
    </div>
    <div class="loginbtn">保存</div>
  </div>
</template>
<script>
import { navigate } from '../../utils';
export default {
  data(){
    return{
      avatar:'',
      phone:'',
      school:null
    }
  },
  onLoad(){
    this.avatar = wx.getStorageSync("avatar");
    this.phone = wx.getStorageSync("phone");
  },
  onShow(){
    this.school = wx.getStorageSync("school");
  },
  methods:{
    goschool(){
      navigate('/pages/chooseSchool/main')
    },
    goauth(){
      navigate('/pages/uncertified/main')
    }
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
  .container {
    padding-top: 20rpx;
    .panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      background: #fff;
      font-size: 34rpx;
      border-bottom: 1rpx solid #d9d9d9;
      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 483rpx;
        text-align: left;
        font-size: 30rpx;
        color: #7E7E7E;
        .arrow {
          width: 14rpx;
          height: 26rpx;
        }
        .head {
          width: 70rpx;
          height: 70rpx;
          border-radius: 50%;
        }
        .phone{
          color: #000;
        }
      }
      &:last-child {
        border: 0;
      }
    }
    .panel1{
      padding: 25rpx 30rpx;
    }
    .content2 {
      margin-top: 20rpx;
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