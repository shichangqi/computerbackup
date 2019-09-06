<template>
  <div class="index">
    <div class="header">
      <div class="userinfo">
        <div class="info">
          <img :src="headlogo" alt class="headlogo" />
          <div class="info_right">
            <p>{{nickname}}</p>
            <p class="phoneno">
              <img src="/static/images/phone.png" />
              <span>{{mobile}}</span>
            </p>
          </div>
        </div>
        <div class="ident" @click="poponshow">
          <img src="/static/images/qrcode.png" alt />
          <p>身份码</p>
        </div>
      </div>
    </div>
    <div class="swipers">
      <img src="/static/images/banner_new.png" alt="">
      <!-- <swiper
        autoplay="true"
        previous-margin="25px"
        next-margin="25px"
        circular="true"
        @change="changeindex"
      >
        <swiper-item>
          <image src="/static/images/banner.png" class="slide-image" />
        </swiper-item>
        <swiper-item>
          <image src="/static/images/banner.png" class="slide-image" />
        </swiper-item>
        <swiper-item>
          <image src="/static/images/banner.png" class="slide-image" />
        </swiper-item>
      </swiper>
      <div class="dots">
        <span
          class="dot"
          v-for="(item,index) in 3"
          :key="index"
          :class="{'cur':currentindex == index}"
        ></span>
      </div> -->

    </div>
    <div class="container">
      <div class="panel" @click="gotransaction">
        <div class="left">
          <img src="/static/images/wallet.png" alt class="img1" />
          <span>我的交易</span>
        </div>
        <div class="right">
          <span>查看全部</span>
          <img src="/static/images/arrow_right.png" alt />
        </div>
      </div>
      <div class="space"></div>
      <div class="panel" @click="goMineCoupon">
        <div class="left">
          <img src="/static/images/coupon_icon.png" alt class="img2" />
          <span>我的优惠券</span>
        </div>
        <div class="right">
          <span>查看全部</span>
          <img src="/static/images/arrow_right.png" alt />
        </div>
      </div>
      <div class="coupon_list">
        <div
          class="coupon_item"
          v-for="(item,index) in couponList"
          :key="index"
          @click="coupondetail(item)"
        >
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
      </div>
    </div>
    <div class="mask" catchtouchmove="ture" v-if="popshow">
      <div class="popup" :animation="animationData" v-if="popshow">
        <img src="/static/images/close_icon.png" class="close" @click="poponhidden" />
        <img :src="base" class="qrcode" />
        <p class="desc">请向店员展示此二维码</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getToken,
  checkExistCampaignCoupon,
  getCampaignInfo,
  getMemberInfo,
  getEffictiveCoupon,
  getCouponAgainInfo
} from "../../api/api";
import { promisic, reLaunch, formatTime, navigate } from "../../utils/index";
export default {
  data() {
    return {
      headlogo: "",
      nickname: "",
      mobile: "",
      currentindex: 0,
      base: "",
      animationData: null,
      popshow: false,
      couponList: []
    };
  },
  onLoad(query) {
    Object.assign(this.$data, this.$options.data());
    this.updateApp();
    let judge = decodeURIComponent(query.scene);
    if (judge == "undefined") {
      wx.setStorageSync("channel", "online");
    } else {
      let channelCode = judge.split("=")[1];
      wx.setStorageSync("channel", channelCode);
    }
    this.headlogo = wx.getStorageSync("userinfo").avatarUrl;
    this.nickname = wx.getStorageSync("userinfo").nickName;
    this.userAuthorized();
    
  },
  onShow() {
    if (this.$store.state.firstshow) {
      this.couponList = [];
      this.getEffictCoupon();
    }
  },
  methods: {
    goMineCoupon() {
      navigate("/pages/mineCoupon/main");
    },
    gotransaction() {
      navigate("/pages/transactionRecord/main");
    },
    coupondetail(item) {
      navigate(`/pages/mineCouponCode/main?obj=${JSON.stringify(item)}`);
    },
    getEffictCoupon() {
      getEffictiveCoupon({
        page_no: 1,
        page_size: 4
      }).then(res => {
        if (res.data.return_message == "Success") {
          this.couponList = [];
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
            this.couponList.push(coupon);
          }
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
    getUserInfo() {
      getMemberInfo({}).then(res => {
        if (res.status == 200) {
          this.mobile = res.data.mobile;
          this.base = res.data.base64CardCode;
          console.log(this.base);
          
          this.getEffictCoupon();
          this.$store.commit("firstshow", true);
        }
      });
    },
    changeindex(e) {
      this.currentindex = e.mp.detail.current;
    },
    poponshow() {
      this.popUp(1);
    },
    poponhidden() {
      this.popUp(0);
    },
    popUp(statu) {
      var animation = wx.createAnimation({
        duration: 200, //动画时长
        timingFunction: "linear", //线性
        delay: 0 //0则不延迟
      });
      // 第2步：这个动画实例赋给当前的动画实例
      //  this.animation = animation;
      // 第3步：执行第一组动画
      animation
        .opacity(0)
        .rotateX(-100)
        .step();
      this.animationData = animation.export();
      // 第5步：设置定时器到指定时候后，执行第二组动画
      setTimeout(
        function() {
          // 执行第二组动画
          animation
            .opacity(1)
            .rotateX(0)
            .step();
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
          this.animationData = animation.export();
          //关闭
          if (!statu) {
            this.popshow = false;
          }
        }.bind(this),
        200
      );
      // 显示
      if (statu) {
        this.popshow = true;
      }
    },
    //更新小程序
    updateApp() {
      if (wx.canIUse("getUpdateManager")) {
        // 当前使用的微信版本支持该属性
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(res => {
          if (res.hasUpdate) {
            // 有新版本更新
            updateManager.onUpdateReady(() => {
              // 监听小程序有版本更新事件，客户端主动触发下载
              updateManager.applyUpdate(); // 强制小程序重启应用新版本
            });
            updateManager.onUpdateFailed(() => {
              // 新版本下载失败
              wx.showModal({
                title: "新版本更新失败",
                content:
                  "请删除当前小程序，再次重新搜索打开以使用最新版本小程序"
              });
            });
          }
        });
      } else {
        // 当前使用的微信版本不支持该属性，提示用户更新微信客户端
        wx.showModal({
          title: "提示",
          content:
            "您当前使用的微信版本过低，无法使用该功能，请升级微信到最新版本后重试"
        });
      }
    },
    userAuthorized() {
      let that = this;
      let channel = wx.getStorageSync("channel");
      promisic(wx.getSetting)()
        .then(res => {
          if (res.authSetting["scope.userInfo"]) {
            //已授权
            return promisic(wx.getUserInfo)();
          } else {
            // 未授权
            wx.reLaunch({
              url: "/pages/authorization/main"
            });
          }
          return false;
        })
        .then(info => {
          if (!info) return;
          that.headlogo = info.userInfo.avatarUrl;
          that.nickname = info.userInfo.nickName;
          wx.login({
            // 获取code
            success(res) {
              var code;
              if (!res.code) {
                return;
              }
              wx.showLoading({ title: "加载中", mask: true });
              getToken({
                code: res.code,
                encryptedData: info.encryptedData,
                iv: info.iv
              }).then(result => {
                if (result.data.return_message == "Success") {
                  wx.setStorageSync("is_member", result.data.result.is_member);
                  wx.setStorageSync("token", result.data.result.token);
                  wx.setStorageSync("encryptedData", info.encryptedData);
                  wx.setStorageSync("iv", info.iv);
                  wx.setStorageSync("userinfo", info.userInfo);
                  //如果是会员，跳转到注册页
                  if (result.data.result.is_member) {
                    that.getUserInfo();
                    getCampaignInfo({
                      //判断当前是否有活动
                      cam_code: channel
                    }).then(res1 => {
                      if (res1.data.return_message == "Success") {
                        if (res1.data.return_result.campaginCoupon) {
                          wx.setStorageSync("hasactivity", true);
                          //如果当前有活动
                          //判断是否当前活动领过券
                      getCouponAgainInfo({}).then(res2=>{
                        if(res2.data.return_message == "Success"){
                          if(res2.data.return_result.hasRepeatCoupon){
                            reLaunch("/pages/getCoupon/main?show=false"); //show=false表示到领券页取消弹窗
                          }
                        }
                      });

                          // checkExistCampaignCoupon({}).then(res2 => {
                          //   if (!res2.data.return_result) {
                          //     reLaunch("/pages/getCoupon/main?show=false"); //show=false表示到领券页取消弹窗
                          //   }
                          // });
                        } else {
                          //当前没活动
                        }
                      }
                    });
                  } else {
                    //没注册
                    //判断当前是否有活动
                    getCampaignInfo({
                      cam_code: channel
                    }).then(res1 => {
                      if (res1.data.return_message == "Success") {
                        if (res1.data.return_result.campaginCoupon) {
                          wx.setStorageSync("hasactivity", true);
                          //如果当前有活动
                          reLaunch("/pages/getCoupon/main?show=false"); //show=false表示到领券页取消弹窗
                        } else {
                          //当前没活动
                          wx.reLaunch({
                            url: "/pages/register/main"
                          });
                        }
                      }
                    });
                  }
                } else {
                  wx.showToast({
                    title: `${result.data.return_message}`,
                    icon: "none",
                    mask: true
                  });
                }
              });
            }
          });
        });
    }
  }
};
</script>

<style scoped lang="less">
.index {
  .header {
    width: 100%;
    color: #fff;
    background: #5b7f95;
    padding: 17px 0 18px 0;
    .userinfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 17px;
      .info {
        display: flex;
        .headlogo {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.3);
        }
        .info_right {
          padding-left: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 16px;
          .phoneno {
            display: flex;
            align-items: center;
            img {
              width: 9px;
              height: 15px;
              margin-right: 6px;
            }
          }
        }
      }
      .ident {
        text-align: center;
        font-size: 12px;
        img {
          width: 34px;
          height: 34px;
          margin-bottom: 4px;
        }
      }
    }
  }
  .swipers {
    background: #f4f4f4;
    padding: 10px 0 20px 0;
    img{
      height: 215px;
      width: 100%;
    }
    swiper {
      height: 215px;
      image {
        width: 100%;
        height: 215px;
        border-radius: 5px;
      }
    }
    .dots {
      display: flex;
      justify-content: space-between;
      width: 90px;
      margin: 0 auto;
      .dot {
        display: inline-block;
        width: 15px;
        height: 2px;
        background: #b7c9d3;
      }
      .cur {
        background: #5b7f95;
      }
    }
  }
  .container {
    .panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      height: 60px;
      .left {
        display: flex;
        align-items: center;
        .img1 {
          width: 26px;
          height: 26px;
          margin-right: 9px;
        }
        .img2 {
          width: 26px;
          height: 18px;
          margin-right: 9px;
        }
        span {
          color: #1b365d;
          font-size: 16px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        span {
          color: #5b7f95;
          font-size: 16px;
        }
        img {
          width: 8px;
          height: 16px;
          margin-left: 9px;
          margin-top: 1px;
        }
      }
    }
    .space {
      height: 12px;
      background: #f4f4f4;
    }
    .coupon_list {
      padding: 0 15px 11px 15px;
      .coupon_item {
        display: flex;
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
            // margin: 7px 0;
          }
          .p3 {
            color: #333333;
            font-size: 12px;
          }
        }
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    text-align: center;
    z-index: 999;
    .popup {
      position: relative;
      width: 310px;
      border-radius: 5px;
      margin: 95px auto 0 auto;
      text-align: center;
      padding: 20px 20px 26px;
      background: #fff;
      box-sizing: border-box;
      .qrcode {
        width: 270px;
        height: 270px;
      }
      .close {
        position: absolute;
        top: 10rpx;
        right: 15rpx;
        width: 57rpx;
        height: 57rpx;
      }
      .desc {
        margin-top: 10px;
        font-size: 15px;
      }
    }
  }
}
</style>
