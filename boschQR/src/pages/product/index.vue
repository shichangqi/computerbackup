<template>
  <div class="product">
    <div class="fixed" id="fixed">
      <div class="pro-top" id="proTop">
        <div class="pro-left">
          <img :src="info.logo">
          <span>
            <p>{{info.name}}</p>
            <p class="vib">{{info.vib}}</p>
          </span>
        </div>
        <div class="more" @click="skip">
          <span>更换产品 ></span>
        </div>
      </div>
      <div class="wrap">
        <div class="menus" v-if="isqr == 1">
          <scroll-view  scroll-x="true" class="scrolltab">
          <span :class="{active: choose == 0}" @click="chooseType(0, 'question')"v-if="question.length > 0">猜你想问</span>
          <span :class="{active: choose == 1}" @click="chooseType(1, 'install')"v-if="install.length > 0">安装指南</span>
          <span :class="{active: choose == 2}" @click="chooseType(2, 'use')"v-if="use.length > 0">使用指南</span>
          <span :class="{active: choose == 3}" @click="chooseType(3, 'upkeep')"v-if="upkeep.length > 0">保养指南</span>
          <span :class="{active: choose == 4}" @click="chooseType(4, 'light')" v-if=" basic || basic.weight">亮点功能</span>
            <span :class="{active: choose == 5}" @click="chooseType(5, 'guzhang')" v-if=" basic || basic.weight">故障自测</span>

          </scroll-view>
        </div>
        <div class="menus" v-if="isqr == 0">
          <scroll-view  scroll-x="true" class="scrolltab">
            <span :class="{active: choose == 0}" @click="chooseType(0, 'install')"v-if="install.length > 0">安装指南</span>
            <span :class="{active: choose == 1}" @click="chooseType(1, 'use')"v-if="use.length > 0">使用指南</span>
            <span :class="{active: choose == 2}" @click="chooseType(2, 'upkeep')"v-if="upkeep.length > 0">保养指南</span>
            <span :class="{active: choose == 3}" @click="chooseType(3, 'question')"v-if="question.length > 0">猜你想问</span>
            <span :class="{active: choose == 4}" @click="chooseType(4, 'light')" v-if=" basic || basic.weight">产品信息</span>
            <span :class="{active: choose == 5}" @click="chooseType(5, 'guzhang')" v-if=" basic || basic.weight">故障自测</span>
          </scroll-view>
        </div>
      </div>
    </div>
    <div class="scrolls" v-if="isqr == 0">
      <scroll-view  scroll-y="true"  :scroll-into-view="skipId" class="scr" :style="'height:' + centerHeight + 'px'">
        <div class="list-wrap" id="asklist">
        <div class="list" v-if="install.length > 0 || installread.title" >
          <p class="title"id="install">安装指南</p>
          <!--<div class="installread" @tap="open(installread.url)" v-if="installread.title">-->
            <!--<p>{{installread.title}}</p>-->
          <!--</div>-->
          <div class="info" @tap="open(installread.url)" v-if="installread.title">
            <img src="../../../static/images/binstall_logo.jpg">
            <div class="info-right">
              <p class="content">安装说明书</p>
            </div>
          </div>
          <div class="info" v-for="(item, index) in install" :key="index" @click="query(item.id, 2)">
            <img :src="item.logoImg">
            <div class="info-right">
              <p class="content">{{item.questionName}}</p>
              <div class="good">
                <img src="../../../static/images/nice.png">
                <span>{{item.loveCount}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="list" v-if="use.length > 0 || useread.title" >
          <p class="title" id="use">使用指南</p>
          <!--<div class="useread" @tap="open(useread.url)" v-if="useread.title">-->
            <!--<p>{{useread.title}}</p>-->
          <!--</div>-->
          <div class="info" @tap="open(useread.url)" v-if="useread.title">
            <img src="../../../static/images/buse_logo.jpg">
            <div class="info-right">
              <p class="content">{{useread.title}}</p>
            </div>
          </div>
          <div class="info" v-for="(item, index) in use" :key="index" @click="query(item.id, 3)">
            <img :src="item.logoImg">
            <div class="info-right">
              <p class="content">{{item.questionName}}</p>
              <div class="good">
                <img src="../../../static/images/nice.png">
                <span>{{item.loveCount}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="list" v-if="upkeep.length > 0" >
          <p class="title" id="upkeep">保养指南</p>
          <div class="info" v-for="(item, index) in upkeep" :key="index" @click="query(item.id, 4)">
            <img :src="item.logoImg">
            <div class="info-right">
              <p class="content">{{item.questionName}}</p>
              <div class="good">
                <img src="../../../static/images/nice.png">
                <span>{{item.loveCount}}</span>
              </div>
            </div>
          </div>
        </div>

          <div class="list" v-if="question.length > 0">
            <p class="title" id="question">猜你想问</p>
            <div class="info" v-for="(item, index) in question" :key="index" @click="query(item.id, 1)">
              <img :src="item.logoImg">
              <div class="info-right">
                <p class="content">{{item.questionName}}</p>
                <div class="good">
                  <img src="../../../static/images/nice.png">
                  <span>{{item.loveCount}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="list" v-if="question.length > 0"id="guzhang">
            <p class="title" >故障自测</p>
            <div class="info" v-for="(item, index) in question" :key="index" @click="query(item.id, 1)">
              <img :src="item.logoImg">
              <div class="info-right">
                <p class="content">{{item.questionName}}</p>
                <div class="good">
                  <img src="../../../static/images/nice.png">
                  <span>{{item.loveCount}}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="heightlight"v-if="basic">
          <div class="container" v-if="basic" id="light">
            <h4>产品信息</h4>
            <div class="panel basicpanel">
              <span>基本信息</span>
              <img src="../../../static/images/pro_rightico.png" class="todown">
            </div>
            <div class="panel spanel" v-if="basic.brand">
              <span>品牌</span>
              <span>{{basic.brand}}</span>
            </div>
            <div class="panel spanel" v-if="basic.modal">
              <span>型号</span>
              <span>{{basic.modal}}</span>
            </div>
            <div class="panel spanel" v-if="basic.type">
              <span>产品类型</span>
              <span>{{basic.type}}</span>
            </div>
            <div class="panel spanel"v-if="basic.series">
              <span>型号系列</span>
              <span>{{basic.series}}</span>
            </div>
            <div class="panel spanel"v-if="basic.installtype">
              <span>安装类型</span>
              <span>{{basic.installtype}}</span>
            </div>

            <div class="panel" @tap="gosize"v-if="basic.weight">
              <span>外观尺寸</span>
              <img src="../../../static/images/pro_rightico.png">
            </div>
          </div>
          <div class="lightcontent" >
            <div class="info" v-for="(item,i) in heightLight" :key="i">
              <img :src="item.mediasJson.images[0].defaultUrl" alt="" class="mediasjson" v-if="item.mediasJson.images">
              <div style="height:100px"><video  :src="item.mediasJson.videos[0].defaultUrl" alt="" class="mediasjson"v-if="item.mediasJson.videos"></video></div>
              <h5>{{item.header}}</h5>
              <div class="desc">
                <!--<img :src="item.icon" alt="">-->
                <p>{{item.description}}</p>
              </div>
            </div>
          </div>


        </div>

      </scroll-view>
    </div>

<div class="scrolls" v-if="isqr == 1">
    <scroll-view  scroll-y="true"  :scroll-into-view="skipId" class="scr"  :style="'height:' + centerHeight + 'px'">

    <div class="list-wrap" id="asklist">
      <div class="list" v-if="question.length > 0">
        <p class="title" id="question">猜你想问</p>
        <div class="info" v-for="(item, index) in question" :key="index" @click="query(item.id, 1)">
          <img :src="item.logoImg">
          <div class="info-right">
            <p class="content">{{item.questionName}}</p>
            <div class="good">
              <img src="../../../static/images/nice.png">
              <span>{{item.loveCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="list" v-if="install.length > 0 || installread.title" >
        <p class="title"id="install">安装指南</p>
        <div class="info" @tap="open(installread.url)" v-if="installread.title">
          <img src="../../../static/images/binstall_logo.jpg">
          <div class="info-right">
            <p class="content">安装说明书</p>
          </div>
        </div>
        <div class="info" v-for="(item, index) in install" :key="index" @click="query(item.id, 2)">
          <img :src="item.logoImg">
          <div class="info-right">
            <p class="content">{{item.questionName}}</p>
            <div class="good">
              <img src="../../../static/images/nice.png">
              <span>{{item.loveCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="list" v-if="use.length > 0 || useread.title" >
        <p class="title" id="use">使用指南</p>
        <div class="info" @tap="open(useread.url)" v-if="useread.title">
          <img src="../../../static/images/buse_logo.jpg">
          <div class="info-right">
            <p class="content">{{useread.title}}</p>
          </div>
        </div>
        <div class="info" v-for="(item, index) in use" :key="index" @click="query(item.id, 3)">
          <img :src="item.logoImg">
          <div class="info-right">
            <p class="content">{{item.questionName}}</p>
            <div class="good">
              <img src="../../../static/images/nice.png">
              <span>{{item.loveCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="list" :style="basic ?'':'padding-bottom: 100px;'" v-if="upkeep.length > 0" >
        <p class="title" id="upkeep">保养指南</p>
        <div class="info" v-for="(item, index) in upkeep" :key="index" @click="query(item.id, 4)">
          <img :src="item.logoImg">
          <div class="info-right">
            <p class="content">{{item.questionName}}</p>
            <div class="good">
              <img src="../../../static/images/nice.png">
              <span>{{item.loveCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="list" v-if="question.length > 0"id="guzhang">
        <p class="title" >故障自测</p>
        <div class="info" v-for="(item, index) in question" :key="index" @click="query(item.id, 1)">
          <img :src="item.logoImg">
          <div class="info-right">
            <p class="content">{{item.questionName}}</p>
            <div class="good">
              <img src="../../../static/images/nice.png">
              <span>{{item.loveCount}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

      <div class="heightlight" style="padding-bottom: 100px;">
        <div class="container" v-if="basic" id="light">
          <h4>亮点功能</h4>
          <div class="panel basicpanel">
            <span>基本信息</span>
            <img src="../../../static/images/pro_rightico.png" class="todown">
          </div>
          <div class="panel spanel" v-if="basic.brand">
            <span>品牌</span>
            <span>{{basic.brand}}</span>
          </div>
          <div class="panel spanel" v-if="basic.modal">
            <span>型号</span>
            <span>{{basic.modal}}</span>
          </div>
          <div class="panel spanel" v-if="basic.type">
            <span>产品类型</span>
            <span>{{basic.type}}</span>
          </div>
          <div class="panel spanel"v-if="basic.series">
            <span>型号系列</span>
            <span>{{basic.series}}</span>
          </div>
          <div class="panel spanel"v-if="basic.installtype">
            <span>安装类型</span>
            <span>{{basic.installtype}}</span>
          </div>

          <div class="panel" @tap="gosize"v-if="basic.weight">
            <span>外观尺寸</span>
            <img src="../../../static/images/pro_rightico.png">
          </div>
        </div>
        <div class="lightcontent" >
          <div class="info" v-for="(item,i) in heightLight" :key="i">
            <img :src="item.mediasJson.images[0].defaultUrl" alt="" class="mediasjson" v-if="item.mediasJson.images">
            <div style="height:100px"><video  :src="item.mediasJson.videos[0].defaultUrl" alt="" class="mediasjson"v-if="item.mediasJson.videos"></video></div>
            <h5>{{item.header}}</h5>
            <div class="desc">
              <!--<img :src="item.icon" alt="">-->
              <p>{{item.description}}</p>
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
import { productProblem ,getlight} from "../../api/api";

export default {
  data() {
    return {
      isqr:-1,
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
      flag:true,
      vib:'',
      productinfo:{},
      heightLight:[],
      basic:{},
      installread:{},
      useread:{}
    };
  },
 async onShow() {
   var that=this;
   this.flag=true
   this.isqr = wx.getStorageSync('isqr')

   console.log(this.choose)
   this.productinfo = {};
   this.heightLight = [];
   this.basic = {};
   this.installread = {};
   this.useread ={};
    if (wx.getStorageSync('productInfo')) {
      this.info = wx.getStorageSync('productInfo')
      this.getDom('fixed').exec(function (res) {
        if (res[0] === null) return
        that.getDom('link').exec(function (res1) {
          if (res1[0] === null) return
          console.log(wx.getSystemInfoSync().windowHeight,  res[0].height, res1[0].height )
          that.centerHeight = wx.getSystemInfoSync().windowHeight - res[0].height - res1[0].height
        })
      })


      this.productId = this.info.id
      this.vib = this.info.vib

      await  this.getDetail()


      getlight({
        vib:this.info.vib,
      }).then(res=>{
        console.log(res.data.product)
        this.productinfo = res.data.product;
        let doc = res.data.product.medias.documents;
        doc.forEach(d=>{
          if(d.docTypes[0] == 'IU'){
            this.useread.title = d.title
            this.useread.url = d.downloadUrl
          }
          if(d.docTypes[0] == 'II'){
            this.installread.title = d.title
            this.installread.url = d.downloadUrl
          }
        })
        this.heightLight = res.data.product.productHighlights;
        // this.heightLight = this.heightLight.map(item=>{
        //   let obj = item
        //   obj.screen = false
        //   return obj
        // })
        this.productinfo.technicalDatas.forEach(item=>{
          if(item.name == '基本信息'){
            item.values.forEach(i=>{
              if(i.key == '品牌'){
                this.basic.brand = i.values[0]
              }
              if(i.key == '产品型号'){
                this.basic.modal = i.values[0]
              }
              if(i.key == '产品类别'){
                this.basic.type = i.values[0]
              }
              if(i.key == '型号系列'){
                this.basic.series = i.values[0]
              }
            })
          }
          if(item.name == '安装类型'){
            item.values.forEach(i=>{
              if(i.key == '安装类型'){
                this.basic.installtype = i.values[0]
              }

            })
          }
          if(item.name == '尺寸和重量'){
                this.basic.weight = item.values
          }
        })
        this.heightLight.forEach((item,index)=>{
          item.icon=item.mediasJson.featureIcons[0].image.defaultUrl
        })
        this.$forceUpdate()

      });
      // let query = wx.createSelectorQuery();
      // query.select('.fixed').boundingClientRect();
      // query.exec(function (res) {
      //   console.log(res)
      //   this.offecttop = res[0].height;
      //   this.bottom = res[0].bottom;
      // })
      // wx.getSystemInfo({
      //   success: function(res) {
      //     that.scrollHeight = res.windowHeight - that.offecttop - that.bottom;
      //   }
      // });
    }
  },
  onLoad(option) {
    Object.assign(this.$data, this.$options.data());
    if(option.type){
      this.type = option.type
    }
  },
  onUnload () {
    // wx.removeStorageSync('productInfo')
  },
  methods: {
    videoShow (index) {
      this.heightLight[index].screen = true
      var videoContext = wx.createVideoContext('myvideo' + i, this);
      videoContext.requestFullScreen();
    },
    getDom (id) {
      var query = wx.createSelectorQuery()
      query.select('#' + id).boundingClientRect()
      return query
    },
    open(url){
      wx.showLoading({ title: '打开中', mask: true })
      wx.downloadFile({
        url: 'https:'+url,
        header: {},
        success: function(res) {
          var filePath = res.tempFilePath;
          console.log(filePath);
          wx.openDocument({
            filePath: filePath,
            success: function(res) {
              console.log('打开文档成功')
            },
            fail: function(res) {
              console.log(res);
            },
            complete: function(res) {
              console.log(res);
              wx.hideLoading();
            }
          })
        },
        fail: function(res) {
          console.log('文件下载失败');
        },
        complete: function(res) {
          wx.hideLoading();
        },
      })

    },
    gosize(){
      navigate(`/pages/appearancesize/main?weight=${JSON.stringify(this.basic.weight)}`)
    },
    kefu(){
      navigate('/pages/ibotim/main')
    },
    getDetail () {
      wx.showLoading({ title: "加载中", mask: true });
      productProblem({
        trademarkType: 1,
        productId: this.productId
      }).then(res => {
        this.use = res.data.Use,
        this.install = res.data.Install,
        this.question = res.data.Question,
        this.upkeep = res.data.Upkeep
        wx.hideLoading();
        if(this.isqr == 1){
          if(this.question.length > 0){
            this.choose =0
          }else if(this.install.length > 0){
            this.choose =1
          }else if(this.use.length > 0){
            this.choose =2
          }else if(this.upkeep.length > 0){
            this.choose =3
          }else if(this.basic){
            this.choose =4
          }
        }else{
          if(this.install.length > 0){
            this.choose =0
          }else if(this.use.length > 0){
            this.choose =1
          }else if(this.upkeep.length > 0){
            this.choose =2
          }else if(this.question.length > 0){
            this.choose =3
          }else if(this.basic){
            this.choose =4
          }
        }
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
      // goBack();

      wx.navigateTo({
        url: '/pages/productCenter/main'
      })
    },
    chooseType (index, id) {
      this.choose = index
      this.skipId = id
      // if(id == 'light'){
      //   wx.navigateTo({
      //     url: '/pages/heightlight/main?vib='+this.info.vib,
      //   })
      // }
    }
  }
};
</script>

<style scoped lang="less">
@import "../../utils/flex.less";
.product {
  display:flex;
  flex-direction:column;
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
    /*position: fixed;*/
    top: 0;
    left: 0;
    z-index:9999;
  }
  .scrolls{
    position: relative;
    /*top:162px;*/
    overflow: auto;
    flex:1;
    margin-bottom: 30px;
    .scr{
      margin-bottom: 30px;
      .list-wrap{
        padding-bottom: 47px;
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
      .vib{
        font-size: 9px;
        margin-top: 5px;
      }
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
    overflow:hidden;
    white-space:nowrap;
    .scrolltab{
      width: 100%;
    }
    .menus {
      dislay:inline-block;
      /*display: flex;*/
      /*justify-content: space-between;*/
      border-top: 1px solid #A5A5A5;
      padding: 14px 0;
      width: 335px;
      overflow:hidden;
      white-space:nowrap;
      span {
        dislay:inline-block;
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

  .heightlight{
    margin-top: 20px;
    background: #f4f4f4;
    .container{
      padding:0 15px 0 15px;
      background: #fff;
      .basicpanel{
        font-size: 17px;
        color: #3C464B;

      }
      .spanel{
        color: #888888;
        font-size: 14px;
        border-top: 0;
        height: 35px;
      }
    }
    .lightcontent{
      padding: 15px;
      background: #fff;
      margin-top: 10px;
    }
    h4{
      display: flex;
      align-items: center;
      height: 44px;
      color: #999999;
      font-size: 13px;

    }
    .panel{
      background: #fff;
      .display_flex;
      .justify-content_space_flex-justify;
      .align-items_center;
      padding: 0 15px;
      font-size: 14px;
      height: 44px;
      border-top: 1px solid #E5E5E5;
      img{
        width: 8px;
        height: 14px;
      }
      .todown{
        transform:rotate(90deg);
      }
    }
    .info{
      background: #fff;
      margin-bottom: 26px;
      .mediasjson{
        width: 100%;
      }
      h5{
        font-size: 17px;
        color: #222222;
        margin:  15px 0;
      }
      .desc{
        p{
          color: #999999;
          font-size: 13px;
        }
      }
    }
  }
  .list {
    padding: 0 20px 15px 20px;
    background: #ffffff;
    margin-top: 10px;
    .title {
      font-size: 12px;
      color: rgba(60, 70, 75, .5);
      padding-bottom: 8px;
      padding-top:15px;
    }
    .info:last-child {
      padding-bottom: 0;
    }
    .installread{
      height: 80px;
      font-size: 16px;
      border-top: 1px solid #E5E5E5;
    }
    .useread{
      height: 80px;
      font-size: 16px;
      border-top: 1px solid #E5E5E5;
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
    z-index: 444;
  }
}
</style>
