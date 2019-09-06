<template>
  <div class="minekpi">
    <p class="selects">
      <span @click="selectedech">
        当月
        <img src="/static/images/arrow_low.png" alt />
      </span>
    </p>
    <div class="salevolume">本月销售额</div>
    <div class="echarts1">
      <mpvue-echarts :echarts="echarts" :onInit="pieInit" canvasId="pie" />
    </div>
    <p class="salevolumetitle">全店占比</p>
    <div class="content">
      <div class="view">
        <p class="num">{{ownamount}}</p>
        <p>销售额(元)</p>
      </div>
      <div class="view view1">
        <p class="num">{{amountrank}}</p>
        <p>全店排名</p>
      </div>
    </div>

    <div class="salevolume">本月交易数</div>
    <div class="echarts1">
      <mpvue-echarts :echarts="echarts" :onInit="pieInit2" canvasId="pie2" />
    </div>
    <p class="salevolumetitle">全店占比</p>
    <div class="content">
      <div class="view">
        <p class="num">{{ownaquantity}}</p>
        <p>销售数(笔)</p>
      </div>
      <div class="view view1">
        <p class="num">{{quantitytrank}}</p>
        <p>全店排名</p>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts/dist/echarts.min";
import mpvueEcharts from "mpvue-echarts";
import { queryEmployeeKPI } from "../../api/api";
import { formatToMoeny, toDecimal2 } from "../../utils/index";
let ecdata, ecdata2;
function initPieChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  return chart;
}
function initPieChart2(canvas, width, height) {
  chart2 = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart2);
  return chart2;
}
let chart,
  chart2 = null;
export default {
  data() {
    return {
      echarts,
      pieInit: initPieChart,
      pieInit2: initPieChart2,
      ecdata: [{ value: 0, name: "我" }, { value: 0, name: "其他" }],
      ecdata2: [{ value: 0, name: "我" }, { value: 0, name: "其他" }],
      ownamount: 0,
      amountrank: 0,
      ownaquantity: 0,
      quantitytrank: 0
    };
  },
  methods: {
    selectedech() {
      // this.rendering1();
      // this.rendering2();
    },
    rendering1() {
      let option = {
        tooltip: {
          trigger: "item",
          formatter: " {b}: {c}元 ({d}%)"
        },
        color: ["#5B7F95", "#B7C9D3"],
        series: [
          {
            name: "KPI",
            type: "pie",
            radius: "55%",
            data: this.ecdata,
            labelLine: {
              normal: {
                length: 5,
                lineStyle: {
                  color: "#C6893F"
                }
              }
            },
            label: {
              normal: {
                formatter: "{d}%",
                color: "#C6893F"
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      chart.setOption(option);
    },
    rendering2() {
      let option = {
        tooltip: {
          trigger: "item",
          formatter: " {b}: {c}笔 ({d}%)"
        },
        color: ["#5B7F95", "#B7C9D3"],
        series: [
          {
            name: "KPI",
            type: "pie",
            radius: "55%",
            data: this.ecdata2,
            labelLine: {
              normal: {
                length: 5,
                lineStyle: {
                  color: "#C6893F"
                }
              }
            },
            label: {
              normal: {
                formatter: "{d}%",
                color: "#C6893F"
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      chart2.setOption(option);
    },
    getEmployeeKPI() {
      queryEmployeeKPI({
        manager_flag: wx.getStorageSync("level"),
        schedule: "month"
      }).then(res => {
        if (res.data.code == 2000) {
          if (res.data.result.amount_entry) {
            this.ecdata = [
              {
                value: toDecimal2(res.data.result.amount_entry.own),
                name: "自己"
              },
              {
                value:
                  toDecimal2(res.data.result.amount_entry.all) -
                  toDecimal2(res.data.result.amount_entry.own),
                name: "其他"
              }
            ];
            this.ownamount = formatToMoeny(
              toDecimal2(res.data.result.amount_entry.own),
              2
            );
          }
          if (res.data.result.amount_rank) {
            this.amountrank = res.data.result.amount_rank;
          }
          if (res.data.result.quantity_entry) {
            this.ecdata2 = [
              { value: res.data.result.quantity_entry.own, name: "自己" },
              {
                value:
                  res.data.result.quantity_entry.all -
                  res.data.result.quantity_entry.own,
                name: "其他"
              }
            ];
            this.ownaquantity = res.data.result.quantity_entry.own;
          }
          if (res.data.result.quantity_rank) {
            this.quantitytrank = res.data.result.quantity_rank;
          }
          setTimeout(() => {
            this.rendering1();
            this.rendering2();
          }, 200);
        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: "none",
            mask: true
          });
        }
      });
    }
  },
  onLoad() {
    this.getEmployeeKPI();
  },
  components: {
    mpvueEcharts
  }
};
</script>
<style lang="less" scoped>
.minekpi {
  .selects {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20rpx 0 7rpx 0;
    color: #1b365d;
    font-size: 30rpx;
    text-align: center;
    img {
      width: 30rpx;
      height: 15rpx;
      margin-left: 10rpx;
    }
  }
  .salevolume {
    font-size: 30rpx;
    color: #1b365d;
    border-left: 6rpx solid rgba(27, 54, 93, 1);
    padding-left: 27rpx;
  }

  .echarts1 {
    height: 327rpx;
  }
  .salevolumetitle {
    font-size: 28rpx;
    color: #666666;
    text-align: center;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 26rpx;
    margin-bottom: 60rpx;
    .view {
      font-size: 28rpx;
      color: #666666;
      text-align: center;
      .num {
        font-size: 52rpx;
        color: #1b365d;
        margin-bottom: 16rpx;
      }
    }
    .view1 {
      margin-left: 240rpx;
    }
  }
}
</style>
