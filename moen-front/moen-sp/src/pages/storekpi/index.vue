<template>
  <div class="storekpi">
    <!-- <mpvue-echarts :echarts="echarts" :onInit="pieInit" canvasId="pie" /> -->
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
    <div class="container">
      <div class="item" :style="'display:'+display">
        <div class="content1">
          <p class="selects">
            <span @click="selectedech">
              当月
              <img src="/static/images/arrow_low.png" alt />
            </span>
          </p>
          <div class="echarts1">
            <mpvue-echarts :echarts="echarts" :onInit="pieInit" canvasId="pie" />
          </div>
          <p class="salevolumetitle">全国占比</p>
          <div class="content">
            <div class="view">
              <p class="num">{{ownamount}}</p>
              <p>销售额(元)</p>
            </div>
            <div class="view view1">
              <p class="num">{{amountrank}}</p>
              <p>全国排名</p>
            </div>
          </div>
          <p class="title">店员排名</p>
          <div class="ranks">
            <div class="item" v-for="(item ,index) in amountList" :key="index">
              <div class="left">
                <img src="/static/images/diyiming.png" v-if="index == 0" />
                <img src="/static/images/dierming.png" v-if="index == 1" />
                <img src="/static/images/disanming.png" v-if="index == 2" />
                <span class="ranknum" v-if="index >2">{{index+1}}</span>
                <span class="rankname">{{item.name}}</span>
              </div>
              <span>{{item.value}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item" :style="'display:'+display2" v-if="currentIndex == 1">
        <div class="content1">
          <p class="selects">
            <span @click="selectedech">
              当月
              <img src="/static/images/arrow_low.png" alt />
            </span>
          </p>
          <div class="echarts1">
            <mpvue-echarts :echarts="echarts" :onInit="pieInit2" canvasId="pie2" />
          </div>
          <p class="salevolumetitle">全国占比</p>
          <div class="content">
            <div class="view">
              <p class="num">{{ownaquantity}}</p>
              <p>交易数(笔)</p>
            </div>
            <div class="view view1">
              <p class="num">{{quantitytrank}}</p>
              <p>全国排名</p>
            </div>
          </div>
          <p class="title">店员排名</p>
          <div class="ranks">
            <div class="item" v-for="(item ,index) in quantityList" :key="index">
              <div class="left">
                <img src="/static/images/diyiming.png" v-if="index == 0" />
                <img src="/static/images/dierming.png" v-if="index == 1" />
                <img src="/static/images/disanming.png" v-if="index == 2" />
                <span class="ranknum" v-if="index >2">{{index+1}}</span>
                <span class="rankname">{{item.name}}</span>
              </div>
              <span>{{item.value}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts/dist/echarts.min";
import mpvueEcharts from "mpvue-echarts";
let ecdata, ecdata2;
let chart, chart2;
import { queryEmployeeKPI } from "../../api/api";
import { formatToMoeny, toDecimal2 } from "../../utils/index";

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

export default {
  data() {
    return {
      tabList: ["门店销售额", "门店交易数"],
      currentIndex: 0,
      offectleft: 70,
      tableft: [],
      echarts,
      pieInit: initPieChart,
      pieInit2: initPieChart2,
      ecdata: [{ value: 0, name: "我" }, { value: 0, name: "其他" }],
      ecdata2: [{ value: 0, name: "我" }, { value: 0, name: "其他" }],
      ownamount: 0,
      amountrank: 0,
      ownaquantity: 0,
      quantitytrank: 0,
      display: "block",
      display2: "none",
      amountList: [],
      quantityList: []
    };
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
      });
    });
  },
  methods: {
    selectedech() {
      // this.rendering1();
      // this.rendering2();
    },
    //点击tab切换swiper
    tabswitch(e) {
      this.currentIndex = e.mp.currentTarget.dataset.index;
      this.offectleft = this.tableft[this.currentIndex];
      if (this.currentIndex == 0) {
        this.display = "block";
        this.display2 = "none";
        setTimeout(() => {
          this.rendering1();
        }, 200);
      } else {
        this.display = "none";
        this.display2 = "block";
        setTimeout(() => {
          this.rendering2();
        }, 200);
      }
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

          if (res.data.result.emp_amount_list) {
            res.data.result.emp_amount_list.forEach(item => {
              let obj = {
                name: item.name,
                value: formatToMoeny(item.value, 2)
              };
              this.amountList.push(obj);
            });
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
          if (res.data.result.emp_quantity_list) {
            this.quantityList = res.data.result.emp_quantity_list;
          }
          setTimeout(() => {
            this.rendering1();
            // this.rendering2();
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
    Object.assign(this.$data, this.$options.data());
    this.getEmployeeKPI();
  },
  components: {
    mpvueEcharts
  }
};
</script>
<style lang="less" scoped>
.storekpi {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  .tab {
    position: relative;
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
      width: 75px;
      height: 2px;
      background: rgba(198, 137, 63, 1);
      border: 1rpx solid rgba(198, 137, 63, 1);
      box-sizing: border-box;
      border-radius: 2px;
      transition: 0.3s all ease-in-out;
    }
  }
  .container {
    .item {
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
      .echarts1 {
        height: 337rpx;
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
      .title {
        height: 80rpx;
        background: #f4f4f4;
        padding-left: 32rpx;
        line-height: 80rpx;
        color: #999999;
        font-size: 28rpx;
      }
      .ranks {
        padding: 0 32rpx 20rpx;
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80rpx;
          .left {
            display: flex;
            align-items: center;
            img {
              width: 36rpx;
              height: 49rpx;
              margin-right: 22rpx;
            }
            .ranknum {
              font-size: 46rpx;
              color: #cccccc;
              margin-right: 27rpx;
            }
            .rankname {
              color: #1b365d;
              font-size: 28rpx;
            }
          }
          span {
            color: #c6893f;
            font-size: 32rpx;
          }
        }
      }
    }
  }
}
</style>


