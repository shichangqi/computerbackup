<template>
  <div class="product">
    <div class="fixed" id="fixed">
      <div class="pro-top" id="proTop">
        <div class="pro-left">
          <img :src="info.logo">
          <span>{{info.name}}</span>

        </div>
        <div class="more" @click="skip">
          <span>更换产品 ></span>
        </div>
      </div>
      <div class="wrap">
        <div class="menus">
          <span :class="{active: choose == 0}" @click="chooseType(0, 'question')" v-if="question.length > 0">猜你想问</span>
          <span :class="{active: choose == 1}" @click="chooseType(1, 'install1')" v-if="install.length > 0">安装指南</span>
          <span :class="{active: choose == 2}" @click="chooseType(2, 'use')" v-if="use.length > 0">使用指南</span>
          <span :class="{active: choose == 3}" @click="chooseType(3, 'upkeep')" v-if="upkeep.length > 0">保养指南</span>
        </div>
      </div>
    </div>
<div class="scrolls">
    <scroll-view scroll-y="true"  :scroll-into-view="skipId" class="scr" :style="'height:' + centerHeight + 'px'">
      <div class="none"v-if="question.length == 0 && install.length == 0 && use.length == 0 && upkeep.length == 0 ">
        <img src="../../../static/images/none.png" alt="">
        <p>暂无内容</p>
      </div>
    <div class="list-wrap" id="asklist">
      <div class="list" v-if="question.length > 0"id="question">
        <p class="title" >猜你想问</p>
        <div class="info" v-for="(item, index) in question" :key="index" @click="query(item.id, 1)">
          <img :src="item.logoImg">
          <div class="info-right">
            <p class="content">{{item.questionName}}</p>
            <div class="good">
              <img src="../../static/images/nice.png">
              <span>{{item.loveCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="list" v-if="install.length > 0" id="install1">
        <p class="title">安装指南</p>
        <div class="info" v-for="(item, index) in install" :key="index" @click="query(item.id, 2)">
          <img :src="item.logoImg">
          <div class="info-right">
            <p class="content">{{item.questionName}}</p>
            <div class="good">
              <img src="../../static/images/nice.png">
              <span>{{item.loveCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="list" v-if="use.length > 0" id="use">
        <p class="title" >使用指南</p>
        <div class="info" v-for="(item, index) in use" :key="index" @click="query(item.id, 3)">
          <img :src="item.logoImg">
          <div class="info-right">
            <p class="content">{{item.questionName}}</p>
            <div class="good">
              <img src="../../static/images/nice.png">
              <span>{{item.loveCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="list" v-if="upkeep.length > 0" id="upkeep">
        <p class="title" >保养指南</p>
        <div class="info" v-for="(item, index) in upkeep" :key="index" @click="query(item.id, 4)">
          <img :src="item.logoImg">
          <div class="info-right">
            <p class="content">{{item.questionName}}</p>
            <div class="good">
              <img src="../../static/images/nice.png">
              <span>{{item.loveCount}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </scroll-view>
</div>
    <cover-view  class="bottom">
      <button open-type="contact" @contact="handleContact" class="link" id="link">在线咨询</button>
    </cover-view>
  </div>
</template>

<script>
import {
  navigate,
  goBack,
  reLaunch,
  formatTime,
  formatNumber,
  arrayTime
} from "../../utils/index";
import { productProblem } from "../../api/api";

export default {
  data() {
    return {
      centerHeight: null,
      choose: 0,
      info: {},
      productId: '',
      use: [],
      install: [],
      question: [],
      upkeep: [],
      skipId: "proTop",
      scrollHeight: 0,
      offecttop:0,
      bottom:0,
      type:1,
      flag:true
    };
  },
 async onShow() {
   var that=this;
   this.flag=true
   console.log(wx.getStorageSync('productInfo'))
    if (wx.getStorageSync('productInfo')) {
      this.info = wx.getStorageSync('productInfo')
      console.log(111)
      console.log(this.info)
      this.getDom('fixed').exec(function (res) {
        if (res[0] === null) return
        that.getDom('link').exec(function (res1) {
          if (res1[0] === null) return
          console.log(wx.getSystemInfoSync().windowHeight,  res[0].height, res1[0].height )
          that.centerHeight = wx.getSystemInfoSync().windowHeight - res[0].height - res1[0].height - 20
        })
      })
        this.productId = this.info.id
      }
      console.log(wx.getStorageSync('productInfo'))
    await  this.getDetail()
  },
  onLoad(option) {
    Object.assign(this.$data, this.$options.data())

    if(option.type){
      this.type = option.type
    }
  },
  onUnload () {
    // wx.removeStorageSync('productInfo')
  },
  methods: {
    getDom (id) {
      var query = wx.createSelectorQuery()
      query.select('#' + id).boundingClientRect()
      return query
    },
    kefu(){
      navigate('/pages/ibotim/main')
    },
    getDetail () {
      productProblem({
        trademarkType: 1,
        productId: this.productId
      }).then(res => {
        this.use = res.data.Use,
        this.install = res.data.Install,
        this.question = res.data.Question,
        this.upkeep = res.data.Upkeep
      })
    },
    query (id, type) {
      console.log(id)
      if(!this.flag){
        return;
      }
      this.flag = false
      wx.navigateTo({
        url: '/pages/richText/main?id=' + id + '&type=' + type,
      })
    },
    skip () {
      if(this.type == 2){
        console.log(121121)
        wx.navigateTo({
          url: '/pages/productCenter/main'
        })
      }else{
        goBack();
      }

    },
    chooseType (index, id) {
      this.choose = index
      this.skipId = id
    }
  }
};
</script>

<style scoped lang="less">
@import "../../utils/flex.less";
.product {
  display:flex;
  flex-direction:column;
  height:100%;
  overflow:hidden;
  position:fixed;
  .bottom{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 47px;
    background: #107BB8;
    text-align: center;
    color: #ffffff;
    line-height: 47px;
    border-radius: 0;
  }
  .fixed{
    top: 0;
    left: 0;
    z-index:9999;

  }
  .scrolls{
    position: relative;
    /*top:162px;*/
    overflow: auto;
    flex:1;
    .none{
      text-align: center;
      font-size: 16px;
      color: #ccc;
      img{
        width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }

  }
  .pro-top {
    display: flex;
    justify-content: space-between;
    padding: 30px 10px 15px 10px;
    background: #ffffff;
    .pro-left{
      .display_flex;
      .align-items_center;
      color: rgba(60, 70, 75, 1);
      font-size: 13px;
      img {
        width: 70px;
        height: 70px;
      }
    }
    .more {
      position: relative;
      top: 28px;
      right: 8px;
      width: 86px;
      height: 26px;
      border: 1px solid #3C464B;
      text-align: center;
      font-size: 12px;
      color: #3C464B;
      line-height: 26px;
    }


  }
  .wrap {
    background: #ffffff;
    padding: 0 20px;
    box-shadow:0px 1px 0px 0px rgba(229,229,229,1);

    .menus {
      display: flex;
      /*justify-content: space-between;*/
      border-top: 1px solid #A5A5A5;
      padding: 14px 0;
      width: 335px;
      // overflow-x: scroll;
      // white-space:nowrap;
      span {
           font-size: 14px;
           color: #3C464B;
           margin-left: 29px;
           &:first-child{
             margin: 0;
           }
         }

      .active {
        color: rgba(16, 123, 184, .9);
        font-weight: bold;
      }
    }
  }
  .list-wrap {
    /*margin-bottom: 60px;*/
  }
  .list {
    padding: 15px 20px;
    background: #ffffff;
    margin-top: 10px;
    .title {
      font-size: 12px;
      color: rgba(60, 70, 75, .5);
      padding-bottom: 8px;
    }
    .info:last-child {
      padding-bottom: 0;
    }
    .info {
      padding: 15px 0;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #E5E5E5;
      img {
        width: 80px;
        height: 80px;
      }
      .info-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 234px;
        height: 80px;
        .content {
          font-size: 14px;
          color: #3C464B;
        }
        .good {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 13px;
          text-align: left;
          img {
            width: 11px;
            height: 11px;
            margin-right: 5px;
          }
          span {
            font-size: 10px;
            color: #3C464B;
          }
        }
      }
    }
  }
  .link {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 47px;
    background: #107BB8;
    text-align: center;
    color: #ffffff;
    line-height: 47px;
    border-radius: 0;
  }
}
</style>
