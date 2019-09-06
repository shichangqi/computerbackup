<template>
  <div class="addgoods">
    <div class="top">
      <p class="title">已选择商品</p>
      <div class="addgoodslist">
        <div class="item" v-for="(item,index) in list" :key="index">
          <p class="typename">
            <span>{{item.type}}</span>
            <span class="addandsub">
              <img src="/static/images/reduce_icon.png" @click="reduce(item,index)" />
              <span class="num">{{item.num}}</span>
              <img src="/static/images/plus_icon.png" @click="plus(item)" />
            </span>
          </p>
          <p class="product">{{item.name}}</p>
        </div>
      </div>
      <div class="addbtn" @click="pickershowon">
        <div class="add">+添加商品</div>
      </div>
      <!-- <p class="title">仅填写实付金额产品，赠品见下页</p> -->
    </div>
    <div class="amount">
      <span>请输入实付金额</span>
      <div>
        ￥
        <input type="text" v-model="amount" />
      </div>
    </div>
    <div class="nextbtn" @click="submit">下一步</div>
    <!-- picker蒙层 -->
    <div class="mask" v-if="pickershow" @click="pickershowon">
      <div class="selector" @click.stop="pickerclick">
        <p>
          <span class="cancel"  @click="pickershowon">取消</span>
          <span class="define" @click="goodschange">确定</span>
        </p>
        <div class="content">
          <picker-view
            indicator-style="height: 50px;"
            mask-style="color:#5B7F95;"
            style="width: 50%; height: 300px;"
            :value="multiIndex"
            @change="bindChange"
          >
            <picker-view-column>
              <view
                v-for="(item,index) in multiArray[0]"
                :key="index"
                style="line-height: 50px;text-align:center;text-overflow:ellipsis;white-space: nowrap;"
              >{{item}}</view>
            </picker-view-column>
          </picker-view>
          <picker-view
            indicator-style="height: 50px;"
            style="width: 50%; height: 300px;"
            :value="multiIndex2"
            @change="bindChange2"
          >
            <picker-view-column>
              <view
                v-for="(item,index) in multiArray[1]"
                :key="index"
                style="line-height: 50px;text-overflow:ellipsis;white-space: nowrap;"
              >{{item}}</view>
            </picker-view-column>
          </picker-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProductData, getMemberEffectiveCoupon } from "../../api/api";
import { navigate } from "../../utils";
export default {
  data() {
    return {
      multiIndex: [0],
      multiIndex2: [0],
      multiArray: [[], []],
      userid: 0,
      map: null,
      list: [],
      amount: "",
      pickershow:false
    };
  },
  onLoad(query) {
    Object.assign(this.$data, this.$options.data());
    this.userid = query.userid;
    getProductData({}).then(res => {
      this.map = res.data.result.product_map;
      for (let key in this.map) {
        this.multiArray[0].push(key);
      }
      this.map[this.multiArray[0][0]].forEach(item => {
        this.multiArray[1].push(item.product_code);
      });
    });
  },
  methods: {
    bindChange(e){
      this.multiArray[1] = [];
      this.map[this.multiArray[0][e.mp.detail.value[0]]].forEach(item => {
          this.multiArray[1].push(item.product_code);
        });
      this.multiIndex = [e.mp.detail.value[0]];
      this.multiIndex2 = [0];
      
    },
    bindChange2(e){
      this.multiIndex2 = [e.mp.detail.value[0]];
    },
    pickerclick(){
      return false;
    },
    pickershowon(){
      this.pickershow = !this.pickershow;
    },
    //获取用户有效优惠券
    getUserCoupon() {},
    submit() {
      if (this.list.length == 0) {
        wx.showToast({
          title: "请先添加商品！",
          icon: "none",
          mask: true
        });
        return;
      }
      if (this.amount == "") {
        wx.showToast({
          title: "请输入实付金额！",
          icon: "none",
          mask: true
        });
        return;
      }
      if (this.amount * 1 < 0) {
        wx.showToast({
          title: "请输入正数！",
          icon: "none",
          mask: true
        });
        return;
      }
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (!reg.test(this.amount)) {
        wx.showToast({
          title: "非法金额！",
          icon: "none",
          mask: true
        });
        return;
      }
      wx.showLoading({ title: "加载中", mask: true });
      let orderinfo = wx.getStorageSync("orderinfo");
      orderinfo.total_amount = this.amount * 1;
      let orderlist = [];
      this.list.forEach(item => {
        let obj = {
          product_code: item.name,
          quantity: item.num,
          real_amount: 0,
          real_price: 0,
          unit_price: 0
        };
        orderlist.push(obj);
      });
      orderinfo.transaction_details = orderlist;
      wx.setStorageSync("orderinfo", orderinfo);
      let userId = wx.getStorageSync("orderinfo").member_id;
      getMemberEffectiveCoupon({
        member_id: userId
      }).then(res => {
        if (res.data.code == 2000) {
          if (res.data.result.effective_coupons) {
            navigate("/pages/chooseCoupon/main");
          } else {
            navigate("/pages/uploadimg/main");
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
    },
    reduce(item, index) {
      if (item.num < 2) {
        this.list.splice(index, 1);
        return;
      }
      item.num = item.num - 1;
    },
    plus(item) {
      item.num = item.num + 1;
    },
    columnchange(e) {
      // if (e.mp.detail.column == 0) {
      //   let list = [];
      //   this.multiArray[1] = [];
      //   this.map[this.multiArray[0][e.mp.detail.value]].forEach(item => {
      //     this.multiArray[1].push(item.product_code);
      //   });
      //   this.multiIndex = [e.mp.detail.value, 0];
      // } else {
      //   this.multiIndex[1] = e.mp.detail.value;
      // }
    },
    goodschange() {
      let obj = {
        type: this.multiArray[0][this.multiIndex[0]],
        name: this.multiArray[1][this.multiIndex2[0]],
        num: 1
      };
      this.list.push(obj);
      this.pickershowon();
    }
  }
};
</script>
<style lang="less" scoped>
.addgoods {
  position: absolute;
  top: 0;
  left: 0;
  background: #f4f4f4;
  height: 100%;
  width: 100%;
  .top {
    padding: 15rpx 0 17rpx;
    .title {
      color: #999999;
      font-size: 28rpx;
      padding-left: 32rpx;
    }
    .addgoodslist {
      background: #fff;
      margin-top: 17rpx;
      padding: 0 32rpx;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // height: 100rpx;
        padding: 12rpx 0rpx 11rpx;
        box-sizing: border-box;
        border-bottom: 1rpx solid #e6e6e6;
        &:last-child {
          border: 0;
        }
        .typename {
          display: flex;
          justify-content: space-between;
          font-size: 28rpx;
          color: #333333;
          .addandsub {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 30rpx;
              height: 30rpx;
            }
            .num {
              margin: 0 16rpx;
            }
          }
        }
        .product {
          font-size: 24rpx;
          color: #999999;
        }
      }
    }
    .addbtn {
      padding: 0 32rpx;
      .add {
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        color: #1b365d;
        font-size: 28rpx;
        border: 2rpx dashed #1b365d;
        margin: 20rpx 0 25rpx;
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
        max-width: 222rpx;
        text-align: right;
      }
    }
  }
  .nextbtn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 44px;
    z-index: 1000;
    background: #1b365d;
    line-height: 44px;
    text-align: center;
    color: #fff;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1001;
    .selector {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: #fff;
      p {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30rpx 30rpx 0;
        font-size: 36rpx;
        .cancel {
          color: rgb(136, 136, 136);
        }
        .define {
          color: rgb(68, 188, 67);
        }
      }
      .content {
        display: flex;
        font-size: 40rpx;
      }
    }
  }
}
</style>
