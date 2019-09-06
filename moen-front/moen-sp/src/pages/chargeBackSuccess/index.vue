<template>
  <div class="chargebacksuccess">
    <div class="top">
      <div class="steps active">
        <img src="/static/images/chargebacked1.png" alt class="chargebacked1" />
        <p>① 查询订单</p>
      </div>
      <img src="/static/images/chargebacked_dot.png" alt class="dots" />
      <div class="steps active">
        <img src="/static/images/chargebacked2.png" alt />
        <p>② 提交退单</p>
      </div>
      <img src="/static/images/chargebacked_dot.png" alt class="dots" />
      <div class="steps active">
        <img src="/static/images/chargebacked3.png" alt />
        <p>③ 完成退单</p>
      </div>
    </div>
    <div class="content">
      <div class="title">订单退单成功！</div>
      <div class="orderNo">
        交易编号：
        <span>{{invoice}}</span>
      </div>
      <div class="amount">
        退款金额：
        <span>¥{{amount}}</span>
      </div>
    </div>
    <div class="btns">
      <div class="goindex" @click="goindex">返回首页</div>
      <div class="gochargeback" @click="goon">继续退单</div>
    </div>
  </div>
</template>
<script>
import {reLaunch,formatToMoeny,redirectTo} from '../../utils/index'
export default {
  data(){
    return{
      invoice :'',
      amount :''
    }
  },
  onLoad(query){
    this.invoice = query.invoice;
    this.amount = formatToMoeny(query.amount,2);
  },
 
  methods:{
    goindex(){
      reLaunch('/pages/index/main');
    },
    goon(){
      let phone = wx.getStorageSync("chargebackphone");
      redirectTo(`/pages/chargeBackList/main?phone=${phone}`);
    }
  }
};
</script>
<style lang="less" scoped>
.chargebacksuccess {
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
    .active {
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
  .content {
    margin-top: 24rpx;
    padding: 14rpx 0 17rpx 50rpx;
    font-size: 28rpx;
    background: #fff;
    color: #999999;
    .title {
      color: #1b365d;
      font-size: 36rpx;
    }
    .orderNo {
      margin: 20rpx 0 16rpx 0;
      span {
        color: #444444;
      }
    }
    .amount {
      span {
        color: #c6893f;
      }
    }
  }
  .btns {
      display: flex;
      justify-content: center;
    margin-top: 30rpx;
    .goindex {
      width: 260rpx;
      height: 88rpx;
      border: 2rpx solid rgba(27, 54, 93, 1);
      border-radius: 50rpx;
      line-height: 88rpx;
      text-align: center;
      color: #1b365d;
      font-size: 32rpx;
      margin-right: 30rpx;
    }
    .gochargeback {
      width: 260rpx;
      height: 88rpx;
      background: rgba(27, 54, 93, 1);
      border-radius: 50rpx;
      line-height: 88rpx;
      text-align: center;
      color: #fff;
      font-size: 32rpx;
    }
  }
}
</style>


