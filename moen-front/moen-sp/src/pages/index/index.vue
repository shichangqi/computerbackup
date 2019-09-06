<template>
  <div class="index">
    <div class="header">
      <div class="userinfo">
        <div class="info">
          <img src="/static/images/moen_icon_logo.png" alt class="headlogo" />
          <div class="info_right">
            <p class="menber_name">
              <span>{{userinfo.full_name}}</span>
              <span class="name">
                <img src="/static/images/sp_icon.png" />
                <span v-if="level == 1">店长</span>
                <span v-else>促销员</span>
              </span>
            </p>
            <p class="phoneno">{{userinfo.store_name}}</p>
          </div>
        </div>
        <div class="ident" @click="goaward(0)" v-if="level == 0">
          <img src="/static/images/reward_icon.png" class="reward_icon" />
          <span>奖励金：{{points}}</span>
          <img src="/static/images/arr-left.png" class="arrow_right" />
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
    <div class="content">
      <div class="overview">
        <div class="data">
          <div class="view1 view" @click="checkkpi">
            <p class="p1">{{hide?'****':amount}}</p>
            <p v-if="level == 1">门店销售额(元)</p>
            <p v-else>本月销售额(元)</p>
          </div>
          <div class="view2 view" @click="checkkpi">
            <p class="p1">{{hide?'****':quantity}}</p>
            <p v-if="level == 1">门店交易数(笔)</p>
            <p v-else>本月交易数(笔)</p>
          </div>
        </div>
        <p class="checkdetail">
          <span @click="checkkpi">点此查看详情</span>
        </p>
        <img
          :src="hide?'/static/images/yincang.png':'/static/images/kejian.png'"
          @click="hideswitch"
          class="hide"
        />
      </div>
      <div class="oprations" v-if="level == 0">
        <div class="items" @click="transrecord">
          <img src="/static/images/tans_icon.png" alt />
          <p>交易录入</p>
        </div>
        <div class="items">
          <img src="/static/images/memberno_icon.png" alt />
          <p class="gray">创建会员</p>
        </div>
        <div class="items" @click="gochargeback">
          <img src="/static/images/chargeback_icon.png" alt />
          <p>退单管理</p>
        </div>
      </div>
      <div class="oprationssp" v-if="level == 1">
        <div class="storereward item" @click="goaward(1)">
          <div class="left">
            <img src="/static/images/sp_icon1.png" alt />
            <div class="info">
              <p class="title">门店奖励</p>
              <p class="desc">查看门店的奖励金</p>
            </div>
          </div>
          <img src="/static/images/arrow_right.png" alt />
        </div>
        <div class="clerk item">
          <div class="left">
            <img src="/static/images/sp_icon2.png" alt />
            <div class="info">
              <div class="title">店员管理</div>
              <div class="desc">管理促销员账号</div>
            </div>
          </div>
          <img src="/static/images/arrowgray_right.png" alt />
        </div>
      </div>
    </div>
    <div class="switchident" @click="switchLevel" v-if="shopmanager">
      <p>切换</p>
      <p v-if="level == 1">促销员</p>
      <p v-else>店长</p>
    </div>
  </div>
</template>

<script>
import {
  getEmployeeInfo,
  queryEmployeeRoleLevel,
  queryMonthEmployeeKPI,
  queryEmployeePoints
} from "../../api/api";
import { formatToMoeny, navigate } from "../../utils/index";
export default {
  data() {
    return {
      currentindex: 0,
      hide: false,
      userinfo: {},
      level: 0,
      amount: 0,
      quantity: 0,
      shopmanager: false,
      points: 0
    };
  },
  onLoad() {
    this.updateApp();
    this.getEmployeeInfo();
  },
  onShow() {
    //清楚返回页面时的KPI缓存
    this.amount = 0;
    this.quantity = 0;
    if (!this.$store.state.getlevel) {//只在第一次加载页面的时候获取店员身份，防止后续返回页面重置身份
      this.getEmployeeLevel();
    }
    this.hide = this.$store.state.eyeshow;
    if (wx.getStorageSync("level") != "undefined") {
      this.level = wx.getStorageSync("level");
      this.getEmployeeMonthkpi();
    }
    if (this.level == 0) {//如果是店员身份就获取奖励金
      this.getEmployeePoints(0);
    }
  },
  methods: {
    //查询店长/店员待核销、已核销总额
    getEmployeePoints(level) {
      queryEmployeePoints({
        manager_flag: level
      }).then(res => {
        if (res.data.code == 2000) {
          this.points = res.data.result.points;
        }
      });
    },
    goaward(index) {
      navigate(`/pages/award/main?type=${index}`);
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
    //跳转到交易录入页面
    transrecord() {
      navigate("/pages/scanIdentityCode/main");
    },
    //跳转到退单页面
    gochargeback() {
      navigate("/pages/chargeBack/main");
    },
    //跳转到KPI页面
    checkkpi() {
      if (this.level == 1) {
        navigate("/pages/storekpi/main");
      } else {
        navigate("/pages/minekpi/main");
      }
    },
    //切换身份
    switchLevel() {
      if (this.level == 1) {
        this.level = 0;
        wx.setStorageSync("level", 0);
        this.getEmployeePoints(0);
      } else {
        this.level = 1;
        wx.setStorageSync("level", 1);
      }
      wx.showLoading({ title: "切换中...", mask: true });
      this.getEmployeeMonthkpi();
    },
    //获取月度kpi
    getEmployeeMonthkpi() {
      queryMonthEmployeeKPI({
        manager_flag: this.level
      }).then(res => {
        if (res.data.code == 2000) {
          if (res.data.result.amount) {
            this.amount = formatToMoeny(res.data.result.amount, 2);
          }else{
            this.amount = 0;
          }
          if (res.data.result.quantity) {
            this.quantity = res.data.result.quantity;
          }else{
             this.quantity = 0;
          }
          wx.hideLoading();
        }
      });
    },
    //获取员工等级
    getEmployeeLevel() {
      queryEmployeeRoleLevel({}).then(res => {
        if (res.data.result) {
          this.level = res.data.result.role_level;
          if (this.level == 1) {
            this.shopmanager = true;
            this.$store.commit("shopmanager", true);
            this.$store.commit("getlevel", true);
          }
          wx.setStorageSync("level", res.data.result.role_level);
          this.getEmployeeMonthkpi();
        }
      });
    },
    //获取员工信息
    getEmployeeInfo() {
      getEmployeeInfo({}).then(res => {
        if (res.data.code == 2000) {
          this.userinfo = res.data.result;
        }
      });
    },
    changeindex(e) {
      this.currentindex = e.mp.detail.current;
    },
    //切换数值显示/隐藏
    hideswitch() {
      this.hide = !this.hide;
      this.$store.commit("eyeshow", this.hide);
    }
  }
};
</script>

<style scoped lang="less">
.index {
  position: absolute;
  top: 0;
  left: 0;
  background: #f4f4f4;
  height: 100%;
  width: 100%;
  .header {
    width: 100%;
    color: #fff;
    background: #5b7f95;
    padding: 20px 0 26px 20px;
    box-sizing: border-box;
    .userinfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // padding: 0 17px;
      .info {
        display: flex;
        .headlogo {
          width: 44px;
          height: 44px;
          border-radius: 50%;
        }
        .info_right {
          padding-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 16px;
          .menber_name {
            display: flex;
            align-items: center;
            .name {
              display: flex;
              align-items: center;
              justify-content: center;
              background: #b7c9d3;
              color: #5b7f95;
              width: 74px;
              height: 20px;
              border-radius: 10px;
              font-size: 12px;
              margin-left: 5px;
              img {
                width: 23rpx;
                height: 24rpx;
                margin-right: 5px;
              }
            }
          }
          .phoneno {
            display: flex;
            align-items: center;
            font-size: 14px;
          }
        }
      }
      .ident {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 7px 7px 7px 5px;
        color: #5b7f95;
        border-top-left-radius: 18px;
        border-bottom-left-radius: 18px;
        background: #b7c9d3;
        font-size: 14px;
        .reward_icon {
          width: 13px;
          height: 13px;
          margin-right: 7px;
          margin-left: 10px;
        }
        .arrow_right {
          position: relative;
          top: 1px;
          width: 4px;
          height: 8px;
          margin-left: 10px;
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
  .content {
    background: #f4f4f4;
    .overview {
      position: relative;
      height: 165px;
      background: #b7c9d3;
      .hide {
        position: absolute;
        top: 29px;
        right: 20px;
        width: 26rpx;
        height: 13rpx;
        padding: 5px;
      }
      .data {
        display: flex;
        justify-content: center;
        text-align: center;
        padding-top: 30px;
        .view {
          font-size: 14px;
          color: #5b7f95;
          .p1 {
            font-size: 26px;
            color: #1b365d;
            margin-bottom: 4px;
          }
        }
        .view2 {
          margin-left: 77px;
        }
      }
      .checkdetail {
        display: flex;
        justify-content: center;
        font-size: 14px;
        color: #fff;
        margin-top: 16px;
        text-decoration: underline;
      }
    }

    .oprationssp {
      position: relative;
      top: -33px;
      padding: 0 20px;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 26rpx 32rpx 30rpx 32rpx;
        background: #fff;
        box-shadow: 0px 3rpx 10rpx rgba(91, 127, 149, 0.16);
        border-radius: 10rpx;
        .left {
          display: flex;
          align-items: center;
          img {
            width: 80rpx;
            height: 80rpx;
            margin-right: 39rpx;
          }
          .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 80rpx;
            .title {
              color: #1b365d;
              font-size: 32rpx;
            }
            .desc {
              font-size: 28rpx;
              color: #999999;
            }
          }
        }
        img {
          width: 16rpx;
          height: 32rpx;
        }
      }
    }
    .clerk {
      margin-top: 25rpx;
      .title {
        color: #cccccc !important;
      }
      .desc {
        color: #cccccc !important;
      }
    }
    .oprations {
      position: relative;
      top: -33px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      .items {
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        background: #fff;
        box-shadow: 0px 3px 20px rgba(91, 127, 149, 0.16);
        border-radius: 5px;
        img {
          width: 40px;
          height: 40px;
          margin-bottom: 15px;
        }
        p {
          font-size: 16px;
          color: #1b365d;
        }
        .gray {
          color: #cccccc;
        }
      }
    }
  }
  .switchident {
    position: fixed;
    bottom: 18rpx;
    right: 17rpx;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #1b365d;
    color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 12px;
    text-align: center;
    box-shadow: 0px 3px 8px rgba(91, 127, 149, 0.58);
  }
}
</style>
