<template>
  <div class="award">
    <div class="clerkaward" v-if="level == 0">
      <div class="top">
        <div class="item" @click="switchtab(0)" :class="{'active' :currentIndex == 0}">
          <img
            :src="currentIndex == 0 ?'/static/images/award2_icon.png':'/static/images/award4_icon.png'"
            alt
          />
          <div class="right">
            <p>待核销(当季)</p>
            <p class="num">+{{points}}元</p>
          </div>
        </div>
        <div class="line"></div>
        <div class="item" @click="switchtab(1)" :class="{'active' :currentIndex == 1} ">
          <img
            :src="currentIndex == 1 ?'/static/images/award3_icon.png':'/static/images/award1_icon.png'"
            alt
          />
          <div class="right">
            <p>累计核销(当年)</p>
            <p class="num">{{clearpoints}}元</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="writeoff" v-if="currentIndex == 0">
          <scroll-view scroll-y :style="'height:'+scrollheight+'px'" @scrolltolower="tobottom">
            <p
              v-if="pointslist != undefined && pointslist != null && pointslist.length == 0"
              class="none"
            >暂无数据</p>
            <div class="award_item" v-for="(item,index) in pointslist" :key="index">
              <div class="left">
                <p class="title">录入奖励</p>
                <p class="date">{{item.effective_date_str}}</p>
              </div>
              <div class="amount" v-if="item.points > 0">+{{item.points}}</div>
              <div class="amount" v-else>{{item.points}}</div>
            </div>
          </scroll-view>
        </div>

        <div class="totlewriteoff" v-if="currentIndex == 1">
          <scroll-view scroll-y :style="'height:'+scrollheight+'px'">
            <p
              v-if="clearPointsList != undefined && clearPointsList != null && clearPointsList.length == 0"
              class="none"
            >暂无数据</p>
            <div class="award_item" v-for="(item,index) in clearPointsList" :key="index">
              <div class="left">
                <p class="title">奖励季结</p>
                <p class="date">{{item.create_date_str}}</p>
              </div>
              <div class="amount">{{item.clear_bonus}}</div>
            </div>
          </scroll-view>
        </div>
      </div>
    </div>

    <div class="shopaward" v-if="level == 1">
      <div class="top">
        <div class="item" @click="switchtab(0)" :class="{'active' :currentIndex == 0}">
          <img
            :src="currentIndex == 0 ?'/static/images/award2_icon.png':'/static/images/award4_icon.png'"
            alt
          />
          <div class="right">
            <p>待核销(当季)</p>
            <p class="num">+{{points}}元</p>
          </div>
        </div>
        <div class="line"></div>
        <div class="item" @click="switchtab(1)" :class="{'active' :currentIndex == 1} ">
          <img
            :src="currentIndex == 1 ?'/static/images/award3_icon.png':'/static/images/award1_icon.png'"
            alt
          />
          <div class="right">
            <p>累计核销(当年)</p>
            <p class="num">{{clearpoints}}元</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="writeoff" v-if="currentIndex == 0">
          <scroll-view scroll-y :style="'height:'+scrollheight+'px'">
            <p
              v-if="storePointsList != undefined && storePointsList != null && storePointsList.length == 0"
              class="none"
            >暂无数据</p>
            <div class="shopaward_item" v-for="(item,index) in storePointsList" :key="index">
              <p class="title">{{item.name}}</p>
              <div class="amount">+{{item.points}}</div>
            </div>
          </scroll-view>
        </div>

        <div class="totlewriteoff" v-if="currentIndex == 1">
          <scroll-view scroll-y :style="'height:'+scrollheight+'px'">
            <p
              v-if="clearPointsList != undefined && clearPointsList != null && clearPointsList.length == 0"
              class="none"
            >暂无数据</p>
            <div class="shopaward_item" v-for="(item,index) in clearPointsList" :key="index">
              <p class="title">{{item.name}}</p>
              <div class="amount">{{item.points}}</div>
            </div>
          </scroll-view>
        </div>
      </div>
    </div>

    <p class="awardtip">此数据供参考，请以经销商实际结算为准</p>
    <div class="switchident" @click="switchLevel" v-if="shopmanager">
      <p>切换</p>
      <p v-if="level == 1">促销员</p>
      <p v-else>店长</p>
    </div>
  </div>
</template>
<script>
import {
  queryEmployeePoints,
  getPointsListByUser,
  getPointsListByStore,
  queryClearPointsList
} from "../../api/api";
export default {
  data() {
    return {
      currentIndex: 0,
      scrollheight: 0,
      level: 0,
      shopmanager: false,
      clearpoints: 0,
      points: 0,
      pageIndex: 1,
      pointslist: [],
      storePointsList: [],
      clearPointsList: [],
      isLast: false
    };
  },
  onLoad(query) {
    Object.assign(this.$data, this.$options.data());
    this.level = query.type;
    let that = this;
    wx.getSystemInfo({
      success(res) {
        that.scrollheight = res.windowHeight - 117;
      }
    });
    this.shopmanager = this.$store.state.shopmanager;
    this.getEmployeePoints(this.level);
    this.getClearPointsList(this.level);
    if (this.level == 0) {
      this.getPointsListByClerk();
      wx.setNavigationBarTitle({
        title: "我的奖励金"
      });
    } else {
      this.getPointsListByShop();
      wx.setNavigationBarTitle({
        title: "门店奖励"
      });
    }
  },
  methods: {
    getClearPointsList(level) {
      queryClearPointsList({
        manager_flag: level
      }).then(res => {
        if (res.data.code == 2000) {
          if (level == 1) {
            this.clearPointsList = res.data.result.store_clear_list;
          } else {
            this.clearPointsList = res.data.result.employee_clear_list;
          }
        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: "none",
            mask: true
          });
        }
      });
    },
    //获取店铺待核销列表
    getPointsListByShop() {
      getPointsListByStore({}).then(res => {
        if (res.data.code == 2000) {
          this.storePointsList = res.data.result.points_list;
        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: "none",
            mask: true
          });
        }
      });
    },
    tobottom() {
      if (this.isLast) {
        return;
      } else {
        this.getPointsListByClerk();
      }
    },
    //获取店员待核销列表
    getPointsListByClerk() {
      wx.showLoading({ title: "加载中", mask: true });
      getPointsListByUser({
        page_no: this.pageIndex,
        page_size: 15
      }).then(res => {
        if (res.data.code == 2000) {
          if (this.pageIndex > res.data.result.total_page) {
            wx.hideLoading();
            this.isLast = true;
            return;
          }
          let list = res.data.result.points_list;
          this.pointslist = this.pointslist.concat(list);
          this.pageIndex++;
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
    },
    //查询店长/店员待核销、已核销总额
    getEmployeePoints(level) {
      queryEmployeePoints({
        manager_flag: level
      }).then(res => {
        if (res.data.code == 2000) {
          this.points = res.data.result.points;
          this.clearpoints = res.data.result.clear_points;
        }
      });
    },
    //切换身份
    switchLevel() {
      wx.showLoading({ title: "切换中...", mask: true });
      if (this.level == 1) {
        this.level = 0;
        this.getPointsListByClerk();
        wx.setStorageSync("level", 0);
        wx.setNavigationBarTitle({
        title: "我的奖励金"
      });
      } else {
        this.level = 1;
        this.getPointsListByShop();
        wx.setStorageSync("level", 1);
        wx.setNavigationBarTitle({
        title: "门店奖励"
      });
      }
      this.getEmployeePoints(this.level);
      this.getClearPointsList(this.level);
      wx.hideLoading();
    },
    switchtab(index) {
      this.currentIndex = index;
    }
  }
};
</script>
<style lang="less" scoped>
.award {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 135rpx;
    background: #fff;
    .line {
      height: 48rpx;
      width: 0rpx;
      border: 1rpx solid rgba(91, 127, 149, 1);
      margin: 0 83rpx;
    }
    .item {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30rpx;
      height: 100%;
      color: #cccccc;
      img {
        width: 56rpx;
        height: 48rpx;
      }
      .right {
        margin-left: 32rpx;
        .num {
          margin-top: 15rpx;
        }
      }
    }
    .active {
      color: #5b7f95;
      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        content: "";
        display: block;
        height: 4rpx;
        background: #c6893f;
        border-radius: 2rpx;
        animation: width 5s alternate;
        -webkit-animation: width 1s alternate;
        -moz-animation: width 1s alternate;
        -o-animation: width 1s alternate;
        -ms-animation: width 1s alternate;
      }
    }
  }
  .content {
    padding: 0 32rpx;
    margin-top: 24rpx;
    background: #fff;
    .none {
      font-size: 40rpx;
      text-align: center;
      color: #cccccc;
    }
    .award_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 11rpx 0 16rpx;
      border-bottom: 1rpx solid #e6e6e6;
      &:last-child {
        border-bottom: 0;
      }
      .left {
        font-size: 24rpx;
        color: #333333;
        .title {
          color: #1b365d;
          font-size: 28rpx;
          margin-bottom: 13rpx;
        }
      }
      .amount {
        color: #c6893f;
        font-size: 32rpx;
      }
    }
    .shopaward_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 21rpx 0 19rpx;
      border-bottom: 1rpx solid #e6e6e6;
      &:last-child {
        border-bottom: 0;
      }
      .title {
        color: #1b365d;
        font-size: 28rpx;
      }
      .amount {
        color: #c6893f;
        font-size: 32rpx;
      }
    }
  }
  .awardtip {
    position: absolute;
    bottom: 20rpx;
    left: 0;
    right: 0;
    font-size: 28rpx;
    color: #cccccc;
    text-align: center;
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
@keyframes width {
  from {
    width: 0px;
  }
  to {
    width: 100%;
  }
}
@-webkit-keyframes width {
  from {
    width: 0px;
  }
  to {
    width: 100%;
  }
}
</style>

