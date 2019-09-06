<template>
  <div class="detail">
    <div class="statu">{{list.status}}</div>
    <p class="transNo">交易编号：{{list.invoice_no}}</p>
    <p class="transtime">交易时间：{{list.date}}</p>
    <div class="title">交易凭证</div>
    <p class="none" v-if="list.image_url.length == 0">暂无凭证</p>
    <div class="imgcon" v-else>
      <img  :src="item" class="certificate" v-for="(item,index) in imageUrl" :key="index" mode="aspectFill"  @click="imgpreview(item)"/>
    </div>
    <!-- <div class="panel">
      <span>商品总价</span>
      <span>¥2,500.00</span>
    </div> -->
    <div class="panel">
      <span>实付金额</span>
      <span class="payment">¥{{list.integer}}.{{list.decimal}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      list:{},
      imageUrl:[]
    }
  },
  methods:{
    imgpreview(path){
      let that = this;
      wx.previewImage({
      current: path, // 当前显示图片的http链接  
      urls: that.imageUrl // 需要预览的图片http链接列表  
    })
    }
  },
  onLoad(query){
    this.list = JSON.parse(decodeURIComponent(query.obj));
    this.imageUrl = this.list.image_url;
  }
};
</script>
<style lang="less" scoped>
.detail {
  padding: 0 16px 0 16px;
  color: #333;
  .statu {
    height: 31px;
    font-size: 14px;
    color: #c6893f;
    line-height: 31px;
    border-bottom: 1rpx solid #e6e6e6;
  }
  .transNo {
    font-size: 12px;
    margin-top: 8px;
  }
  .transtime {
    font-size: 12px;
    margin-top: 7px;
  }
  .none{
    font-size: 16px;
     color: #5b7f95;
     text-align: center;
     padding: 10px 0;
  }
  .title {
    height: 31px;
    font-size: 14px;
    line-height: 31px;
    border-bottom: 1rpx solid #e6e6e6;
    margin-top: 22px;
  }
  .certificate {
    width: 324rpx;
    height: 192rpx;
    margin: 24rpx 20rpx 49rpx 0;
  }
  .panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    height: 63rpx;
    .payment {
      color: #5b7f95;
    }
  }
}
</style>

