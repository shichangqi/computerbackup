<template>
  <div class="minecoupon">
    <div class="tab">
      <span
        class="item"
        v-for="(item,index) in tabList"
        :key="index"
        @click="tabswitch"
        :id="'tab'+index"
        :data-index="index"
        :class="{'active' :currentIndex == index}"
      >{{item}}</span>
      <div class="slider" :style="'left:'+offectleft+'px'"></div>
    </div>

    <swiper :current="currentIndex" @change="changeindex">
      <swiper-item>
        <div class="activecoupon">
          <scroll-view
            scroll-y
            :style="'height:'+scrollheight+'px'"
            @scrolltolower="toeffectbottom"
          >
            <div class="coupon_list">
              <div class="coupon_item" v-for="(item,index) in effectCouponList" :key="index" @click="coupondetail(item)">
                <div class="left">
                  <img src="/static/images/copon_bg.png" alt />
                  <div class="text">
                    <p class="p0">
                      <span class="unit">￥</span>{{item.amount}}
                    </p>
                    <div class="p2">小程序专享</div>
                  </div>
                </div>
                <div class="right">
                  <p class="p1">
                    <span class="lefttext">{{item.title}}</span>
                    <span class="checkcode">查看券码</span>
                  </p>
                  <p class="p2">{{item.tip}}</p>
                  <p class="p3">有效期：{{item.date}}</p>
                </div>
              </div>
              <p class="tip" >没有更多了哦</p>
            </div>
          </scroll-view>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="activecoupon over">
          <scroll-view scroll-y :style="'height:'+scrollheight+'px'" @scrolltolower="tousedbottom">
            <div class="coupon_list">
              <div class="coupon_item" v-for="(item,index) in usedCouponList" :key="index">
                <div class="left">
                  <img src="/static/images/overdue_copon_bg.png" alt />
                  <div class="text">
                    <p class="p0">
                      <span class="unit">￥</span>{{item.amount}}
                    </p>
                    <div class="p2">小程序专享</div>
                  </div>
                </div>
                <div class="right">
                  <p class="p1"><span class="lefttext">{{item.title}}</span><img src="/static/images/used_icon.png" alt /></p>
                  <p class="p2-2">{{item.tip}}</p>
                  <p class="p3">有效期：{{item.date}}</p>
                  
                </div>
              </div>
              <p class="tip">没有更多了哦</p>
            </div>
          </scroll-view>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="activecoupon over">
          <scroll-view scroll-y :style="'height:'+scrollheight+'px'" @scrolltolower="tooutbottom">
            <div class="coupon_list">
              <div class="coupon_item" v-for="(item,index) in outCouponList" :key="index">
                <div class="left">
                  <img src="/static/images/overdue_copon_bg.png" alt />
                  <div class="text">
                    <p class="p0">
                      <span class="unit">￥</span>{{item.amount}}</p>
                    <div class="p2">小程序专享</div>
                  </div>
                </div>
                <div class="right">
                  <p class="p1"><span class="lefttext">{{item.title}}</span><img src="/static/images/used_icon.png" alt /></p>
                  <p class="p2-2">{{item.tip}}</p>
                  <p class="p3">有效期：{{item.date}}</p>
                </div>
              </div>
              <p class="tip">没有更多了哦</p>
            </div>
          </scroll-view>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { getEffictiveCoupon, getUsedCoupon,getOutOfCoupon} from "../../api/api";
import { formatTime,navigate } from "../../utils/index";
export default {
  data() {
    return {
      tabList: ["未使用", "已使用", "已过期"],
      currentIndex: 0,
      offectleft: 40,
      swiperHeight: 0,
      scrollheight: 0,
      tableft: [],
      effectCouponList: [],
      usedCouponList: [],
      outCouponList: [],
      pageIndex1: 1,
      pageIndex2: 1,
      pageIndex3: 1,
      isLast1: false,
      isLast2: false,
      isLast3: false
    };
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data());
    let that = this;
    wx.getSystemInfo({
      success(res) {
        that.scrollheight = res.windowHeight - 44;
      }
    });
    this.getEffectList();
    this.getUsedList();
    this.getOutOfList();
  },
  onReady() {
    let that = this;
    //获取三个tab的offectleft距离保存在数组中
    let query = wx.createSelectorQuery(); //创建节点查询器 query
    query.select("#tab0").boundingClientRect(); //这段代码的意思是选择Id=the-id的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset(); //这段代码的意思是获取页面滑动位置的查询请求
    query.exec(function(res) {
      that.offectleft = res[0].left;
      that.tableft.push(that.offectleft);
      let query1 = wx.createSelectorQuery();
      query1.select("#tab1").boundingClientRect();
      query1.selectViewport().scrollOffset();
      query1.exec(function(res) {
        that.tableft.push(res[0].left);
        let query2 = wx.createSelectorQuery();
        query2.select("#tab2").boundingClientRect();
        query2.selectViewport().scrollOffset();
        query2.exec(function(res) {
          that.tableft.push(res[0].left);
        });
      });
    });
  },
  methods: {
    coupondetail(item){
      navigate(`/pages/mineCouponCode/main?obj=${JSON.stringify(item)}`);
    },
    tooutbottom(){
      if (this.isLast3) {
        return;
      } else {
        this.getOutOfList();
      }
    },
    tousedbottom() {
      if (this.isLast2) {
        return;
      } else {
        this.getUsedList();
      }
    },
    toeffectbottom() {
      if (this.isLast1) {
        return;
      } else {
        this.getEffectList();
      }
    },
    getOutOfList() {
      wx.showLoading({ title: "加载中", mask: true });
      getOutOfCoupon({
        page_no: this.pageIndex3,
        page_size: 10
      }).then(res => {
        if (res.data.return_message == "Success") {
          if (this.pageIndex3 > res.data.total_page) {
            wx.hideLoading();
            this.isLast3 = true;
            return;
          }
          let list = res.data.return_result;
          for (let i = 0; i < list.length; i++) {
            let str = list[i].description.split("/");
            let coupon = {
              amount: list[i].validityAmount,
              title: str[0],
              tip: str[1],
              code: list[i].couponCode,
              date: `${formatTime(list[i].effectiveDateFrom)} - ${formatTime(
                list[i].effectiveDateTo
              )}`
            };
            this.outCouponList.push(coupon);
          }
          this.pageIndex3++;
          wx.hideLoading();
        } else {
          wx.hideLoading();
          wx.showToast({
            title: `${res.data.return_message}`,
            icon: "none",
            mask: true
          });
        }
      });
    },
    getUsedList() {
      wx.showLoading({ title: "加载中", mask: true });
      getUsedCoupon({
        page_no: this.pageIndex2,
        page_size: 10
      }).then(res => {
        if (res.data.return_message == "Success") {
          if (this.pageIndex2 > res.data.total_page) {
            wx.hideLoading();
            this.isLast2 = true;
            return;
          }
          let list = res.data.return_result;
          for (let i = 0; i < list.length; i++) {
            let str = list[i].description.split("/");
            let coupon = {
              amount: list[i].validityAmount,
              title: str[0],
              tip: str[1],
              code: list[i].couponCode,
              date: `${formatTime(list[i].effectiveDateFrom)} - ${formatTime(
                list[i].effectiveDateTo
              )}`
            };
            this.usedCouponList.push(coupon);
          }
          this.pageIndex2++;
          wx.hideLoading();
        } else {
          wx.hideLoading();
          wx.showToast({
            title: `${res.data.return_message}`,
            icon: "none",
            mask: true
          });
        }
      });
    },
    getEffectList() {
      wx.showLoading({ title: "加载中", mask: true });
      getEffictiveCoupon({
        page_no: this.pageIndex1,
        page_size: 10
      }).then(res => {
        if (res.data.return_message == "Success") {
          if (this.pageIndex1 > res.data.total_page) {
            wx.hideLoading();
            this.isLast1 = true;
            return;
          }
          let list = res.data.return_result;
          for (let i = 0; i < list.length; i++) {
            let str = list[i].description.split("/");
            let coupon = {
              amount: list[i].validityAmount,
              title: str[0],
              tip: str[1],
              code: list[i].couponCode,
              date: `${formatTime(list[i].effectiveDateFrom)} - ${formatTime(
                list[i].effectiveDateTo
              )}`
            };
            this.effectCouponList.push(coupon);
          }
          this.pageIndex1++;
        } else {
          wx.showToast({
            title: `${res.data.return_message}`,
            icon: "none",
            mask: true
          });
        }
      });
    },
    //点击tab切换swiper
    tabswitch(e) {
      this.currentIndex = e.mp.currentTarget.dataset.index;
      this.offectleft = this.tableft[this.currentIndex];
    },
    //滑动swiper切换tab
    changeindex(e) {
      this.currentIndex = e.mp.detail.current;
      this.offectleft = this.tableft[this.currentIndex];
    }
  }
};
</script>
<style lang="less" scoped>
.minecoupon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  .tab {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    color: #999999;
    font-size: 15px;
    padding: 0 40px;
    background: #fff;
    .item {
      display: flex;
      align-items: center;
      height: 100%;
    }
    .active {
      color: #5b7f95;
    }
    .slider {
      position: absolute;
      bottom: -1px;
      width: 45px;
      height: 2px;
      background: rgba(198, 137, 63, 1);
      border: 1rpx solid rgba(198, 137, 63, 1);
      box-sizing: border-box;
      border-radius: 2px;
      transition: 0.3s all ease-in-out;
    }
  }
  swiper {
    height: 100%;
    swiper-item {
      padding-top: 44px;
      .activecoupon {
        .coupon_list {
          padding: 17px 15px 31px 15px;
          .coupon_item {
            display: flex;
            height: 80px;
            border-radius: 8px;
            box-shadow: 4px 3px 8px rgba(91, 127, 149, 0.16);
            margin-bottom: 10px;
            background: #fff;
            .left {
              position: relative;
              width: 127px;
              background: #f7f7f7;
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
              position: relative;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              flex: 1;
              padding: 8rpx 5rpx 8rpx 26rpx;
              .p1 {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #1b365d;
                font-size: 15px;
                padding-right: 5px;
                .lefttext{
                  flex: 1;
                }
                img{
                  position: relative;
                  top: 3px;
                  width: 44px;
                  height: 44px;
                }
                .checkcode {
                  width: 50px;
                  height: 18px;
                  background: #1b365d;
                  line-height: 18px;
                  text-align: center;
                  font-size: 9px;
                  color: #fff;
                  border-radius: 25px;
                }
              }
              .p2 {
                color: #5b8196;
                font-size: 12px;
              }
              .p2-2{
                color: #999;
                font-size: 12px;
              }
              .p3 {
                color: #333333;
                font-size: 12px;
              }
            }
          }
          .tip {
            text-align: center;
            margin-top: 5px;
            font-size: 10px;
            color: #e5e5e5;
          }
        }
      }
      .over {
        .right {
          .p1,
          .p2,
          .p3 {
            color: #999 !important;
          }
        }
      }
    }
  }
}
</style>


