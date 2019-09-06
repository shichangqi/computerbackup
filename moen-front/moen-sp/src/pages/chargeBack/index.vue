<template>
  <div class="chargeBack">
    <div class="top">
      <div class="steps active">
        <img src="/static/images/chargebacked1.png" alt class="chargebacked1" />
        <p>① 查询订单</p>
      </div>
      <img src="/static/images/chargeback_dot.png" alt class="dots" />
      <div class="steps">
        <img src="/static/images/chargeback2.png" alt />
        <p>② 提交退单</p>
      </div>
      <img src="/static/images/chargeback_dot.png" alt class="dots" />
      <div class="steps">
        <img src="/static/images/chargeback3.png" alt />
        <p>③ 完成退单</p>
      </div>
    </div>
    <input
      type="number"
      placeholder="请输入消费者手机号"
      placeholder-style="color:#999999;font-size:16px"
      v-model="phone"
    />
    <div class="searchbtn" @click="searchOrder">查询订单</div>
  </div>
</template>
<script>
import {navigate} from '../../utils/index'
export default {
  data(){
    return{
      phone:''
    }
  },
  methods:{
    searchOrder(){
      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))){ 
        wx.showToast({ title: "手机号格式不正确！", icon: "none", mask: true });
        return;
      }
       wx.setStorageSync('chargebackphone',this.phone)
      navigate(`/pages/chargeBackList/main?phone=${this.phone}`);
    },
  }
};
</script>
<style lang="less" scoped>
.chargeBack {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  .top {
    display: flex;
    justify-content: space-between;
    padding: 20px 25px 18px;
    background: #fff;
    .dots {
      width: 22px;
      height: 4px;
      margin-top: 11px;
    }
    .active{
        color: #5b7f95 !important;
    }
    .steps {
      text-align: center;
      color: #999999;
      font-size: 14px;
      img {
        width: 54rpx;
        height: 52rpx;
        margin-bottom: 10rpx;
      }
      .chargebacked1 {
        width: 65rpx;
        height: 52rpx;
      }
    }
  }
  input {
    height: 88rpx;
    margin-top: 24rpx;
    width: 100%;
    background: #fff;
    font-size: 32rpx;
    padding-left: 32rpx;
  }
  .searchbtn {
    width: 550rpx;
    height: 88rpx;
    margin: 30rpx auto 0 auto;
    background: rgba(27, 54, 93, 1);
    border-radius: 50rpx;
    line-height: 88rpx;
    text-align: center;
    color: #fff;
    font-size: 32rpx;
  }
}
</style>

