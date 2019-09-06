<template>
  <div class="minebill">
    <div class="container">
      <div class="top">
        <p class="p1">¥{{total}}</p>
        <p class="p2">待付账单总金额</p>
      </div>
      <div class="detail" id="list">
        <scroll-view scroll-y :style="'height:'+height+'px'">
          <div class="item" v-for="(item,index) in list" :key="index">
            <div class="left">
              <div class="info">
                <p class="name">
                  <span>{{item.create_time}}</span>
                  <span>¥ {{item.amount}}</span>
                </p>
                <p class="p2">
                  <span>
                    设备编号：{{item.equipment_id}}
                    <span class="times">时长：{{item.duration}}分钟</span>
                  </span>
                  <span class="status" v-if="item.pay_state == 1">未支付</span>
                  <span class="status" v-if="item.pay_state == 2">已支付</span>
                  <span class="status" v-if="item.pay_state == 0"></span>
                </p>
              </div>
            </div>
          </div>
          <p class="none" v-if="list.length <= 0">暂无数据</p>
        </scroll-view>
      </div>
    </div>
    <div class="loginbtn" @click="payorder">支付</div>
  </div>
</template>

<script>
import { studentunpay, payOrder } from "../../api/api";
export default {
  data() {
    return {
      height: 0,
      total: 0,
      page: 1,
      last: false,
      list: []
    };
  },
  onLoad(query) {
    this.total = query.total;
    this.getdetail();
  },
  onShow() {
    let that = this;
    wx.getSystemInfo({
      success(res) {
        let query = wx.createSelectorQuery();
        query.select("#list").boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(function(res1) {
          that.height = res.windowHeight - res1[0].top;
        });
      }
    });
  },
  methods: {
    payorder() {
      payOrder({
        openid: wx.getStorageSync("openid"),
        money: 0.01,
        trade_no: 123456,
        payApp: "student"
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          let payinfo = res.data.data;
          wx.requestPayment({
            timeStamp: payinfo.timeStamp,
            nonceStr: payinfo.nonceStr,
            package: payinfo.package,
            signType: payinfo.signType,
            paySign: payinfo.paySign,
            success(res) {
              console.log(111,res);
              wx.showToast({
            title: '支付成功',
            icon: "none",
            mask: true
          });
            },
            fail(res) {
              console.log('失败');
              
            }
          });
        }
      });
    },
    getdetail() {
      studentunpay({
        openid: wx.getStorageSync("openid"),
        page: this.page,
        size: 10
      }).then(res => {
        if (res.data.code == 0) {
          if (res.data.data.lists.length > 0) {
            this.list = res.data.data.lists;
            this.list.forEach(e => {
              e.create_time = formatTime(new Date(e.create_time));
            });
            this.page++;
          } else {
            this.last = true;
          }
          wx.hideLoading();
        } else {
          wx.hideLoading();
          wx.showToast({
            title: `${res.data.msg}`,
            icon: "none",
            mask: true
          });
        }
      });
      // unpayList({
      //   openid: wx.getStorageSync("openid"),
      //   student_id: this.info.id,
      //   page: this.page,
      //   size: 10
      // }).then(res => {
      // if (res.data.code == 0) {
      //   if (res.data.data.lists.length > 0) {
      //     this.list = res.data.data.lists;
      //     this.list.forEach(e => {
      //       e.create_time = formatTime(new Date(e.create_time));
      //     });
      //     this.page++;
      //   } else {
      //     this.last = true;
      //   }
      //   wx.hideLoading();
      // } else {
      //   wx.hideLoading();
      //   wx.showToast({
      //     title: `${res.data.msg}`,
      //     icon: "none",
      //     mask: true
      //   });
      // }
      // });
    }
  }
};
</script>

<style scoped lang="less">
.minebill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: #ededed;
  .container {
    font-size: 30rpx;
    margin-bottom: 200rpx;
    .top {
      height: 260rpx;
      background: #fff;
      text-align: center;
      padding-top: 82rpx;
      .p1 {
        font-size: 50rpx;
        margin-bottom: 21rpx;
      }
      .p2 {
        font-weight: lighter;
        color: #7e7e7e;
      }
    }
    .detail {
      margin-top: 19rpx;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24rpx 30rpx;
        background: #fff;
        border-bottom: 1rpx solid #d9d9d9;
        &:last-child {
          border: 0;
        }
        .left {
          display: flex;
          align-items: center;
          width: 100%;
          .info {
            width: 60%;
            flex: 1;
            .name {
              display: flex;
              justify-content: space-between;
              font-size: 34rpx;
            }
            .p2 {
              display: flex;
              justify-content: space-between;
              color: #7e7e7e;
              font-size: 30rpx;
              .times {
                margin-left: 40rpx;
              }
              .status {
                font-size: 30rpx;
                color: #ed4a27;
              }
            }
          }
        }
      }
      .none {
        text-align: center;
        font-size: 36rpx;
        color: #ccc;
      }
    }
  }
  .loginbtn {
    position: fixed;
    bottom: 52rpx;
    left: 0;
    right: 0;
    width: 600rpx;
    color: #fff;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    font-size: 36rpx;
    background: linear-gradient(90deg, #ea4e27, #fc9148);
    border-radius: 50rpx;
    margin: auto;
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
