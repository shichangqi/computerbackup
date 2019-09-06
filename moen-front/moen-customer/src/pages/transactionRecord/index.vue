<template>
  <div class="transactionre">
    <div class="translist">
      <div class="record" v-for="(item,index) in list" :key="index">
        <div class="tansNo">
          <span>交易编号：{{item.invoiceNo}}</span>
          <span class="statu">{{item.status}}</span>
        </div>
        <div class="trans" @click="godetail(item)">
          <div class="left">
            <p class="transtime">
              交易时间：
              <span class="time">{{item.purchaseTimeLocal}}</span>
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
      </div>
      <p class="tip" v-if="isLast">没有更多了哦</p>
    </div>
  </div>
</template>
<script>
import { getTransactionHistory } from "../../api/api";
import { formatToMoeny, navigate } from "../../utils/index";
export default {
  data() {
    return {
      pageIndex: 1,
      list: [],
      isLast: false
    };
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data());
    this.getHistory();
  },
  onReachBottom() {
    if (this.isLast) {
      return;
    } else {
      this.getHistory();
    }
  },
  methods: {
    godetail(item) {
      navigate(
        `/pages/transactionDetail/main?obj=${encodeURIComponent(
          JSON.stringify(item)
        )}`
      );
    },
    getHistory() {
      wx.showLoading({ title: "加载中", mask: true });
      getTransactionHistory({
        page_no: this.pageIndex,
        page_size: 10
      }).then(res => {
        if (res.data.return_message == "Success") {
          if (this.pageIndex > res.data.total_page) {
            wx.hideLoading();
            this.isLast = true;
            return;
          }
          let list = res.data.return_result.transactions;
          list.forEach(item => {
            if (item.totalAmount < 0) {
              item.totalAmount = item.totalAmount * -1;
            }
            let moeny = formatToMoeny(item.totalAmount, 2).split(".");
            item.integer = moeny[0];
            item.decimal = moeny[1];
            if (item.transactionTypeCode == "purchase") {
              item.status = "已完成";
            } else {
              item.status = "已退单";
            }
          });
          this.list = this.list.concat(list);

          this.pageIndex++;
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
    }
  }
};
</script>
<style lang="less" scoped>
.transactionre {
  position: absolute;
  top: 0;
  left: 0;
  background: #f7f7f7;
  height: 100%;
  width: 100%;
  color: #333333;
  font-size: 12px;
  .translist {
    background: #f7f7f7;
    .record {
      margin-bottom: 15px;
      padding: 0 16px;
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
    }
    .tip {
      text-align: center;
      padding: 10px 0;
      font-size: 10px;
      color: #ccc;
    }
  }
}
</style>
