<template>
  <div class="choosecoupons">
    <div class="container">
      <div class="couponlist">
        <div class="coupon_item_container" v-for="(list,index) in couponlist" :key="index">
          <div class="coupon_item" @click="checkcoupon(index,list)">
            <div class="left">
              <img src="/static/images/copon_bg.png" alt />
              <div class="text">
                <p class="p0">
                  <span class="unit">￥</span>{{list.amount}}</p>
                <div class="p2">小程序专享</div>
              </div>
            </div>
            <div class="right">
              <p class="p1">
                <span>{{list.title}}</span>
                <img
                  :src="couponIndex == index?'/static/images/coupon_checked.png':'/static/images/coupon_check.png'"
                />
              </p>
              <p class="p2">{{list.tip}}</p>
              <p class="p3">有效期：{{list.date}}</p>
            </div>
          </div>
          <div class="coupon_type" v-if="couponIndex == index">
            <div class="types" v-for="(goods,i) in list.sub" :key="i" @click="goodscheck(i,goods)">
              <div class="content">
                <div class="desc">
                  <p class="p1">{{goods.product_code}}</p>
                  <!-- <p class="p2">{{goods.type}}</p> -->
                </div>
                <img
                  :src="goodsIndex == i ?'/static/images/coupon_checked.png':'/static/images/coupon_check.png'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="discountcode">
        <p>优惠码</p>
        <input
          type="number"
          placeholder-style="color:#999999;font-size:16px"
          placeholder="请询问客户输入优惠码"
          class="code"
          v-model="couponcode"
          @input="inputcode"
        />
      </div>
    </div>
    <div class="nextbtn" @click="submit">下一步</div>
  </div>
</template>

<script>
import { getMemberEffectiveCoupon, getCouponGiftList } from "../../api/api";
import { formatdate, navigate } from "../../utils";
export default {
  data() {
    return {
      couponlist: [],
      couponIndex: -1,
      goodsIndex: -1,
      totalamount: 0,
      couponcode: "",
      couponid: 0,
      giftid: -1,
      checkcode:'',
    };
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data());
    this.totalamount = wx.getStorageSync("orderinfo").total_amount;
    this.getUserCoupon();
  },
  methods: {
    submit() {
      if (this.couponid == 0 && this.couponcode.replace(/\s/g, "") != "") {
        wx.showToast({
          title: "请选择优惠券！",
          icon: "none",
          mask: true
        });
        return;
      }
      if (this.couponid != 0 && this.giftid == -1) {
        wx.showToast({
          title: "请选择礼品！",
          icon: "none",
          mask: true
        });
        return;
      }
      if (this.couponid != 0 && this.couponcode.replace(/\s/g, "") == "") {
        wx.showToast({
          title: "请填写优惠券码！",
          icon: "none",
          mask: true
        });
        return;
      }
      if (this.couponid != 0 && this.couponcode.replace(/\s/g, "") != this.checkcode) {
        wx.showToast({
          title: "优惠券码不正确！",
          icon: "none",
          mask: true
        });
        return;
      }
      if (this.couponid != 0 && this.couponcode.replace(/\s/g, "") != "") {
        let orderinfo = wx.getStorageSync("orderinfo");
        orderinfo.coupon_id = this.couponid;
        if (this.giftid != -1) {
          orderinfo.product_id = this.giftid;
        }
        orderinfo.coupon_code = this.couponcode.replace(/\s/g, "");
        wx.setStorageSync("orderinfo", orderinfo);
      }
      navigate("/pages/uploadimg/main");
    },
    //将输入的数字每4个隔开
    inputcode() {
      this.couponcode = this.couponcode
        .replace(/\s/g, "")
        .replace(/(\w{4})(?=\w)/g, "$1 ");
    },
    //获取用户有效优惠券
    getUserCoupon() {
      let userId = wx.getStorageSync("orderinfo").member_id;
      getMemberEffectiveCoupon({
        member_id: userId
      }).then(res => {
        if (res.data.code == 2000) {
          let list = res.data.result.effective_coupons;
          for (let i = 0; i < list.length; i++) {
            let str = list[i].description.split("/");
            let coupon = {
              id: list[i].id,
              amount: list[i].validity_amount,
              needamount: list[i].need_amount,
              title: str[0],
              tip: str[1],
              typeid: list[i].coupon_type_id,
              code: list[i].coupon_code,
              date: `${formatdate(
                new Date(list[i].effective_date_from)
              )} - ${formatdate(new Date(list[i].effective_date_to))}`,
              sub: []
            };
            this.couponlist.push(coupon);
          }
        }
      });
    },
    getGiftList(id, list) {
      getCouponGiftList({
        coupon_type_id: id
      }).then(res => {
        if (res.data.code == 2000) {
          list.sub = res.data.result.gift_list;
        }
      });
    },
    checkcoupon(index, list) {
      if (this.totalamount >= list.needamount) {
        if (this.couponIndex == index) {
          return;
        } else {
          this.couponIndex = index;
          this.getGiftList(list.typeid, list);
          this.goodsIndex = -1;
          this.couponid = list.id;
          this.checkcode = list.code;
        }
      } else {
        wx.showToast({
          title: "不满足使用条件！",
          icon: "none",
          mask: true
        });
      }
    },
    goodscheck(index, list) {
      if (this.goodsIndex == index) {
        return;
      } else {
        this.goodsIndex = index;
        this.giftid = list.product_id;
      }
    }
  }
};
</script>

<style lang="less">
.choosecoupons {
  position: absolute;
  top: 0;
  left: 0;
  background: #f4f4f4;
  height: 100%;
  width: 100%;
  .container {
    padding-bottom: 88px;
    background: #f4f4f4;
    .couponlist {
      padding: 15px 15px 0;
      .coupon_item_container {
        border-radius: 8px;
        box-shadow: 4px 3px 8px rgba(91, 127, 149, 0.16);
        margin-bottom: 10px;
        overflow: hidden;
        .coupon_item {
          display: flex;
          height: 80px;
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
            background: #fff;
            .p1 {
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: #1b365d;
              font-size: 15px;
              padding-right: 12px;
              span{
                flex: 1;
              }
              img {
                width: 21px;
                height: 21px;
              }
            }
            .p2 {
              color: #5b8196;
              font-size: 12px;
              // margin: 4px 0;
            }
            .p3 {
              color: #333333;
              font-size: 12px;
            }
          }
        }
        .coupon_type {
          .types {
            padding: 0 12px;
            background: #fff;
            &:last-child {
              .content {
                border-bottom: 0;
              }
            }
            &:first-child {
              border-top: 1rpx dashed rgba(183, 201, 211, 1);
            }
            .content {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 15px 0 15px;
              box-sizing: border-box;
              border-bottom: 1rpx solid #e6e6e6;
              .desc {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;
                flex: 1;
                .p1 {
                  color: #333333;
                  font-size: 14px;
                }
                .p2 {
                  margin-top: 5rpx;
                  color: #999999;
                  font-size: 24rpx;
                }
              }
              img {
                width: 21px;
                height: 21px;
              }
            }
          }
        }
      }
    }
    .discountcode {
      padding: 17px 15px 0;
      p {
        color: #999999;
        font-size: 14px;
      }
      .code {
        background: #fff;
        height: 44px;
        width: 100%;
        margin-top: 15px;
        padding-left: 12px;
        box-sizing: border-box;
      }
    }
  }
  .nextbtn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 44px;
    z-index: 99999;
    background: #1b365d;
    line-height: 44px;
    text-align: center;
    color: #fff;
  }
}
</style>

