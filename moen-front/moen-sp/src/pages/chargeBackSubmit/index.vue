<template>
  <div class="chargebacksubmit">
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
      <img src="/static/images/chargeback_dot.png" alt class="dots" />
      <div class="steps">
        <img src="/static/images/chargeback3.png" alt />
        <p>③ 完成退单</p>
      </div>
    </div>
    <div class="explain">订单信息</div>
    <div class="orderinfo">
      <p class="orderno">交易编号： {{list.invoice_no}}</p>
      <p>交易时间： {{list.date}}</p>
    </div>
    <div class="explain">交易清单</div>
    <div class="translist">
      <div class="goods" v-for="(item ,index) in list.transaction_details" :key="index">
        <span>{{item.product_name}}</span>
        <span>×{{item.quantity}}</span>
      </div>
    </div>
    <div class="explain">请输入退款金额</div>
    <div class="amount">
      <span>退款金额</span>
      <div>
        ￥
        <input type="text" v-model="amount" />
      </div>
    </div>
    <div class="explain">退单验证</div>
    <div class="verifycode">
      <input
        type="text"
        placeholder="验证码"
        placeholder-style="color:#333333;font-size:16px"
        v-model="verifyCode"
      />
      <div class="btn" @click="getcode">{{codeBtn}}</div>
    </div>
    <div class="submit" @click="submit">确认提交</div>
  </div>
</template>
<script>
import {
  sendVerficationCode,
  checkVerficationCode,
  createTransaction
} from "../../api/api";
import { navigate } from "../../utils";
export default {
  data() {
    return {
      codeBtn: "获取验证码",
      timer: null,
      count: "",
      list: {},
      amount: "",
      phone: "",
      verifyCode: ""
    };
  },
  onUnload() {
    clearInterval(this.timer);
  },
  onLoad(query) {
    Object.assign(this.$data, this.$options.data());
    this.list = JSON.parse(decodeURIComponent(query.obj));
    this.amount = this.list.total_amount;
  },
  methods: {
    submit() {
      if (this.amount == "") {
        wx.showToast({
          title: "实付金额不能为空",
          icon: "none",
          mask: true
        });
        return;
      }
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(!reg.test(this.amount)){
        wx.showToast({
          title: "非法金额！",
          icon: "none",
          mask: true
        });
        return;
      }
      if (this.verifyCode == "") {
        wx.showToast({
          title: "验证码不能为空",
          icon: "none",
          mask: true
        });
        return;
      }
      checkVerficationCode({
        mobile: this.phone,
        verificationCode: this.verifyCode
      }).then(res => {
        if (res.data.return_message == "Success") {
          if (res.data.return_result.checkFlag) {
            createTransaction({
              original_invoice_no: this.list.invoice_no,
              transaction_type_code: "refund",
              total_amount: this.amount * -1,
              total_quantity: -1
            }).then(res => {
              if (res.data.code == 2000) {
                if (res.data.result.invoice_no) {
                  wx.showToast({
                    title: "退单成功！",
                    icon: "success",
                    mask: true
                  });
                  setTimeout(() => {
                    navigate(
                      `/pages/chargeBackSuccess/main?invoice=${
                        this.list.invoice_no
                      }&amount=${this.amount}`
                    );
                  }, 1500);
                } else {
                  wx.showToast({
                    title: "退单失败！",
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
          } else {
                wx.showToast({
                  title: '验证码错误',
                  icon: "none",
                  mask: true
                });
              }
        }
      });
    },
    getcode() {
      this.phone = wx.getStorageSync("chargebackphone");
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
    }
  }
};
</script>
<style lang="less" scoped>
.chargebacksubmit {
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
  .explain {
    height: 72rpx;
    color: #999999;
    font-size: 28rpx;
    padding-left: 32rpx;
    line-height: 72rpx;
  }
  .orderinfo {
    color: #444444;
    font-size: 28rpx;
    background: #fff;
    height: 136rpx;
    padding: 19rpx 0 21rpx 32rpx;
    box-sizing: border-box;
    .orderno {
      margin-bottom: 16rpx;
    }
  }
  .translist {
    padding: 0 32rpx;
    background: #fff;
    color: #333333;
    font-size: 28rpx;
    .goods {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80rpx;
      border-bottom: 1rpx solid #e6e6e6;
      &:last-child {
        border: 0;
      }
    }
  }
  .amount {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333333;
    font-size: 32rpx;
    height: 88rpx;
    padding: 0 32rpx;
    background: #fff;
    div {
      display: flex;
      align-items: center;
      color: #c6893f;
      font-size: 28rpx;
      input {
        font-size: 40rpx;
        min-width: 50rpx;
        max-width: 200rpx;
        text-align: right;
      }
    }
  }
  .verifycode {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 88rpx;
    padding: 0 32rpx;
    background: #fff;
    .btn {
      width: 165rpx;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      background: #1b365d;
      border-radius: 4rpx;
      font-size: 28rpx;
      color: #ffffff;
    }
  }
  .submit {
    width: 550rpx;
    height: 88rpx;
    background: rgba(27, 54, 93, 1);
    border-radius: 50rpx;
    line-height: 88rpx;
    text-align: center;
    margin: 30rpx auto 0 auto;
    color: #fff;
  }
}
</style>

