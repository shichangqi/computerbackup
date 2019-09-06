<template>
  <div class="activerules">
    <img src="/static/images/active_rules.png" alt />
    <div class="content">
        <div class="title">活动细则</div>
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
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.activerules {
  img {
    width: 100%;
    height: 150rpx;
  }
  .content{
      padding: 23rpx 32rpx;
      font-size: 14px;
      color: #999999;
      .title{
          color: #333333;
          font-size: 16px;
      }
      .p1 {
        margin-top: 21rpx;
        line-height: 21px;
      }
      .p2 {
        margin-top: 25rpx;
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
</style>


