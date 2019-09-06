<template>
  <div class="chargebacklist">
    <div class="top">
      <div class="steps active">
        <img src="/static/images/chargebacked1.png" alt class="chargebacked1" />
        <p>① 查询订单</p>
      </div>
      <img src="/static/images/chargeback_dot.png" alt class="dots" />
      <div class="steps">
        <img src="/static/images/chargeback2.png" alt />
        <p>② 提交退单</p>
      </div>
      <img src="/static/images/chargeback_dot.png" alt class="dots" />
      <div class="steps">
        <img src="/static/images/chargeback3.png" alt />
        <p>③ 完成退单</p>
      </div>
    </div>
    <scroll-view scroll-y :style="'height:'+scrollheight+'px'" @scrolltolower="tobottom">
      <div class="record" v-for="(item,index) in list" :key="index">
        <div class="tansNo">
          <span>交易编号：{{item.invoice_no}}</span>
          <span class="statu">{{item.status}}</span>
        </div>
        <div class="trans" @click="godetail(item)">
          <div class="left">
            <p class="transtime">
              交易时间：
              <span class="time">{{item.date}}</span>
            </p>
            <p class="transpeice">
              交易金额：
              <span class="price">
                ¥
                <span class="number">{{item.integer}}</span>
                .{{item.decimal}}
              </span>
            </p>
          </div>
          <img src="/static/images/arrow_right.png" />
        </div>
        <div class="bottom">
          <div class="btn" @click="tochargeback(item)">退单</div>
        </div>
      </div>
      <p class="tip">没有更多了哦</p>
    </scroll-view>
  </div>
</template>
<script>
import { queryMemberTransactionHistory } from "../../api/api";
import { formatToMoeny, formatTime, navigate, goBack } from "../../utils/index";
export default {
  data() {
    return {
      scrollheight: 0,
      phone: "",
      pageIndex: 1,
      list: [],
      isLast: false
    };
  },
  onLoad(query) {
    Object.assign(this.$data, this.$options.data());
    if (query.phone) this.phone = query.phone;
    let that = this;
    wx.getSystemInfo({
      success(res) {
        that.scrollheight = res.windowHeight - 90;
      }
    });
       this.getUserTransactionHistory();
   
  },
  methods: {
    tochargeback(item) {
      navigate(`/pages/chargeBackSubmit/main?obj=${encodeURIComponent(JSON.stringify(item))}`);
    },
    godetail(item) {
      navigate(`/pages/transactionDetail/main?obj=${encodeURIComponent(JSON.stringify(item))}`);
    },
    tobottom() {
      if (this.isLast) {
        return;
      } else {
        this.getUserTransactionHistory();
      }
    },
    
    getUserTransactionHistory() {
      wx.showLoading({ title: "加载中", mask: true });
      queryMemberTransactionHistory({
        mobile: this.phone,
        page_no: this.pageIndex,
        page_size: 10
      }).then(res => {
        if (res.data.code == 2000) {
          if (this.pageIndex > res.data.result.total_page) {
            wx.hideLoading();
            this.isLast = true;
            return;
          }
          if (this.pageIndex == 1 && !res.data.result.transactions) {
            wx.showToast({
              title: "暂无交易记录！",
              icon: "none",
              mask: true,
              success(){
                setTimeout(()=>{
                  goBack();
                },1500);
              }
            });
          }
          let list = res.data.result.transactions;
          list.forEach(item => {
            if(item.total_amount < 0){
              item.total_amount = item.total_amount * -1;
            }
            let moeny = formatToMoeny(item.total_amount, 2).split(".");
            item.integer = moeny[0];
            item.decimal = moeny[1];
            if (item.transaction_type_code == "purchase") {
              item.status = "已完成";
            } else {
              item.status = "已退单";
            }
            item.date = formatTime(new Date(item.purchase_date));
          });
          this.list = this.list.concat(list);
          this.pageIndex++;
          wx.hideLoading();
        } else if(res.data.code == 13440){
          wx.hideLoading();
          return;
        }else {
          wx.hideLoading();
          wx.showToast({
            title: `${res.data.msg}`,
            icon: "none",
            mask: true
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.chargebacklist {
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
    height: 90px;
    box-sizing: border-box;
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
  .tip {
    text-align: center;
    padding: 10px 0;
    font-size: 10px;
    color: #e5e5e5;
  }
  .record {
    margin-top: 12px;
    padding: 0 16px;
    color: #333333;
    font-size: 12px;
    background: #fff;
    .tansNo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 31px;
      border-bottom: 1rpx solid #e6e6e6;
      .statu {
        color: #c6893f;
      }
    }
    .trans {
      display: flex;
      height: 68px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1rpx solid #e6e6e6;
      .left {
        margin-top: 7px;
        .transtime {
          .time {
            font-size: 14px;
          }
        }
        .transpeice {
          margin-top: 11px;
          .price {
            color: #5b7f95;
            .number {
              font-size: 16px;
            }
          }
        }
      }
      img {
        width: 8px;
        height: 16px;
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 43px;
      .btn {
        width: 120rpx;
        height: 50rpx;
        background: rgba(27, 54, 93, 1);
        border-radius: 4rpx;
        line-height: 50rpx;
        text-align: center;
        color: #fff;
        font-size: 14px;
      }
    }
  }
}
</style>


