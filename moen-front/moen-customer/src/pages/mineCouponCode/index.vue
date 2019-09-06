<template>
  <div class="minecouponcode">
    <img src="/static/images/coupon_code_bg.png" :style="'height:'+contentHeight+'px'"/>
    <div class="container">
      <div class="content1">
        <p class="title">向店员出示券码即可消费</p>
        <p class="code">{{coupon.code}}</p>
      </div>
      <div class="content2">
        <p class="name">{{coupon.title}}</p>
        <p class="price">{{coupon.tip}}</p>
        <p class="datatime">有效期：{{coupon.date}}</p>
      </div>
      <div class="content3">
        <p class="title">
          <span class="line"></span>
          <span class="tl">活动细则</span>
          <span class="line"></span>
        </p>
        <p class="p1">一、活动时间：2019年8月10日-2019年8月25日</p>
        <p class="p2">二、活动范围：摩恩专卖店</p>
        <p class="p2">三、活动内容：</p>
        <div class="pc">
          <p>①一重礼：任意消费加999元换购垃圾处理器GX50MCL/M01</p>
          <p>②二重礼: 买二代水槽洗碗机+任意厨房龙头，立减1000元</p>
          <p>③三重礼：单张订单，实付金额满额半价购</p>
          <p class="pl">①	单次购买MOEN产品，实付金额满8,000元，半价换购999元起厨房指定产品一件</p>
          <p class="pl">②	单次购买MOEN产品，实付金额满10,000元，半价换购1,599元起指定厨房产品一件</p>
          <p class="pl">③	单次购买MOEN产品，实付金额满12,000元，半价换购2,899元起指定厨房产品一件</p>
          <p class="pl">④	单次购买MOEN产品，实付金额满15,000元，半价换购3,999元起指定厨房产品一件</p>
        </div>
        <p class="p2">四、活动细则：</p>
        <div class="pc">
          <p>①消费者需要在一张订单中且实付金额满足以上条件方可参加活动</p>
          <p>②半价狂欢购中分级买赠不可叠加，每一级换购产品限选1套</p>
          <p>③详情请询店内工作人员</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // code: "5426254869",
      contentHeight:1420,
      coupon:{},
    };
  },
  onLoad(query) {
    this.coupon = JSON.parse(query.obj);
    this.coupon.code = this.coupon.code.replace(/(.{4})/g, "$1 ");
  },
  onReady(){
      let that = this;
      let query = wx.createSelectorQuery();
        query.select(".container").boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(function(res) {
          that.contentHeight = res[0].height;
        });
  }
};
</script>
<style lang="less" scoped>
.minecouponcode {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  padding: 15px 15px 20px;
  box-sizing: border-box;
  img {
    width: 100%;
  }
  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 15px 15px 20px;
    box-sizing: border-box;
    .content1 {
      text-align: center;
      padding-top: 19px;
      .title {
        color: #333333;
        font-size: 11px;
      }
      .code {
        margin-top: 12px;
        font-size: 24px;
        color: #1b365d;
        padding-bottom: 20px;
      }
    }
    .content2 {
      padding: 11px 31px 18px 35px;
      .name {
        font-size: 16px;
        color: #1b365d;
      }
      .price {
        font-size: 13px;
        color: #5b8196;
        margin-top: 5px;
      }
      .datatime {
        font-size: 12px;
        color: #333333;
        margin-top: 6px;
      }
    }
    .content3 {
      padding: 0 35px;
      font-size: 14px;
      color: #999999;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333333;
        .tl {
          padding: 0 10px;
        }
        .line {
          height: 1rpx;
          border-bottom: 1rpx solid #e6e6e6;
          flex: 1;
        }
      }
      .p1 {
        margin-top: 8px;
        line-height: 21px;
      }
      .p2 {
        margin-top: 10px;
        line-height: 21px;
      }
      .pc {
        padding-left: 28px;
        line-height: 21px;
        .pl{
          padding-left: 15px;
        }
      }
    }
  }
}
</style>


