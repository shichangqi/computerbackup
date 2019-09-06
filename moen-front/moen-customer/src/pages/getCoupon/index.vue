<template>
  <div class="coupon">
    <p class="title">您有礼品券待领取</p>
    <p class="activityrules">
      <span @click="activerule">活动细则 >></span>
    </p>
    <div class="coupon_list">
      <div class="coupon_item" v-for="(item,index) in couponList" :key="index">
        <div class="left">
          <img src="/static/images/copon_bg.png" alt />
          <div class="text">
            <p class="p1" v-if="item.amount == 0">{{item.amount}}元首平方</p>
            <p class="p0" v-else>
              <span class="unit">￥</span>{{item.amount}}
            </p>
            <div class="p2">小程序专享</div>
          </div>
        </div>
        <div class="right">
          <p class="p1">{{item.title}}</p>
          <p class="p2">{{item.tip}}</p>
          <p class="p3">有效期：{{item.date}}</p>
        </div>
      </div>
      <div class="receiveBtn" @click="receiveCoupon">全部领取</div>
    </div>
    <p class="tips">温馨提示：您领取的优惠券，在首页【我的优惠券】可查看</p>
    <img src="/static/images/copon_bottom.png" class="bottom_bg" />
    <div class="mask" v-if="show">
      <div class="popup" @click="jumpTo">
        <img src="/static/images/popup_bg.png" alt class="bg" />
        <div class="content">
          <p class="title">恭喜您获得礼品券</p>
          <img src="/static/images/popup_gift.png" alt />
          <div class="btn">查看礼券&ensp;&ensp;></div>
          <p class="tip">
            <span>即将跳转至首页</span>
            <span class="sec">{{count}}s</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reLaunch, formatTime, navigate } from "../../utils/index";
import {
  getCampaignInfo,
  addCampaignCoupon,
  getCouponAgainInfo
} from "../../api/api";
export default {
  data() {
    return {
      timer: null,
      count: 5,
      show: false,
      couponList: []
    };
  },
  onUnload() {
    clearInterval(this.timer);
  },
  onLoad(query) {
    Object.assign(this.$data, this.$options.data());
    let show = query.show;
    if (show == "false") {
      this.show = false;
    } else {
      this.show = true;
    }
    if (this.show) {
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.count <= 0) {
            clearInterval(this.timer);
            this.timer = null;
            reLaunch("/pages/index/main");
          } else {
            this.count--;
          }
        }, 1000);
      }
    }
    if (wx.getStorageSync("is_member")) {
      this.getCouponAgain();
    } else {
      this.getcoupon();
    }
  },
  methods: {
    activerule() {
      navigate("/pages/activeRules/main");
    },
    receiveCoupon() {
      if (wx.getStorageSync("is_member")) {
        //如果是会员领券成功
        addCampaignCoupon({}).then(res2 => {
          if (res2.data.return_message == "Success") {
            reLaunch("/pages/getCoupon/main?show=true");
          }
        });
      } else {
        wx.setStorageSync("receivecoupon", true);
        reLaunch("/pages/register/main");
      }
    },
    jumpTo() {
      reLaunch("/pages/index/main");
    },
    getCouponAgain() {
      getCouponAgainInfo({}).then(res => {
        if (res.data.return_message == "Success") {
          if(res.data.return_result.campaginInfo.couponList){
            let list = res.data.return_result.campaginInfo.couponList;
          for (let i = 0; i < list.length; i++) {
            if (i < 4) {
              let str = list[i].description.split("/");
              let coupon = {
                amount: list[i].validityAmount,
                title: str[0],
                tip: str[1],
                date: `${formatTime(
                  res.data.return_result.campaginInfo.campaginCoupon
                    .effectiveDateFrom
                )} - ${formatTime(
                  res.data.return_result.campaginInfo.campaginCoupon
                    .effectiveDateTo
                )}`
              };
              this.couponList.push(coupon);
            }
          }
        }
          }
      });
    },
    getcoupon() {
      getCampaignInfo({
        cam_code: wx.getStorageSync("channel")
      }).then(res => {
        if (res.data.return_message == "Success") {
          let list = res.data.return_result.couponList;
          for (let i = 0; i < list.length; i++) {
            if (i < 4) {
              let str = list[i].description.split("/");
              let coupon = {
                amount: list[i].validityAmount,
                title: str[0],
                tip: str[1],
                date: `${formatTime(
                  res.data.return_result.campaginCoupon.effectiveDateFrom
                )} - ${formatTime(
                  res.data.return_result.campaginCoupon.effectiveDateTo
                )}`
              };
              this.couponList.push(coupon);
            }
          }
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
};
</script>

<style scoped lang="less">
.coupon {
  .title {
    color: #5b8196;
    font-size: 32px;
    text-align: center;
    text-shadow: 0px 3px 10px rgba(183, 201, 211, 1);
    -webkit-text-stroke: 1 rgba(91, 129, 150, 1);
  }
  .activityrules {
    display: flex;
    justify-content: center;
    color: #c6893f;
    font-size: 14px;
    text-align: center;
    margin: 10px 0;
  }
  .coupon_list {
    padding: 0 15px 11px 15px;
    .coupon_item {
      display: flex;
      // height: 80px;
      border-radius: 8px;
      box-shadow: 4px 3px 8px rgba(91, 127, 149, 0.16);
      margin-bottom: 10px;
      .left {
        position: relative;
        width: 127px;
        img {
          width: 100%;
          height: 100%;
        }
        .text {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          .p0 {
            font-size: 26px;
            .unit {
              font-size: 13px;
            }
          }
          .p1 {
            font-size: 21px;
          }
          .p2 {
            font-size: 11px;
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 8rpx 5rpx 8rpx 26rpx;
        .p1 {
          color: #1b365d;
          font-size: 15px;
        }
        .p2 {
          color: #5b8196;
          font-size: 12px;
        }
        .p3 {
          color: #333333;
          font-size: 12px;
        }
      }
    }
    .receiveBtn {
      height: 44px;
      border-radius: 25px;
      background: rgba(27, 54, 93, 1);
      box-shadow: 0px 6px 10px rgba(27, 54, 93, 0.16);
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 44px;
    }
  }
  .tips {
    color: #b7c9d3;
    font-size: 11px;
    text-align: center;
  }
  .bottom_bg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 98px;
    z-index: -1;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    .popup {
      position: relative;
      width: 289px;
      height: 328px;
      margin: 85px auto 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
      .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        .title {
          font-size: 21px;
          color: #c6893f;
          margin-top: 55px;
        }
        img {
          width: 171px;
          height: 83px;
          margin-top: 23px;
        }
        .btn {
          width: 222px;
          height: 44px;
          background: linear-gradient(
            270deg,
            rgba(91, 127, 149, 1) 0%,
            rgba(142, 170, 185, 1) 100%
          );
          box-shadow: 0px 3px 5px rgba(183, 201, 211, 1);
          border-radius: 25px;
          margin: 36px auto 5px auto;
          font-size: 16px;
          color: #fff;
          line-height: 44px;
          box-sizing: border-box;
          padding-left: 12px;
        }
        .tip {
          color: #b7c9d3;
          font-size: 11px;
          .sec {
            color: #c6893f;
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
