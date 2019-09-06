<template>
  <div class="boschindex">
    <div class="top">
      <span class="tit">西门子家电</span>
      <img src="../../../static/images/top_bg.png" alt="" class="top_bg">
      <div class="content">
        <img :src="head" alt="">
        <span class="info" v-if="isQR">
          <p class="p1">
            <!--<span class="type">iQ700</span>-->
            <span class="name"> &nbsp;{{productmodalinfo.name}}</span></p>
          <p class="modal">{{productmodalinfo.vib}}</p>
        </span>
      </div>
      <div class="content2"v-if="isQR">
        <span>
          <p class="nick">{{name}}</p>
          <span class="myservice" @tap="tomine">我的服务 ></span>
        </span>
        <img :src="productmodalinfo.logo" alt="">
      </div>
      <div class="content3" v-if="!isQR">
          <span class="nick">{{name}}</span>
          <span class="myservice"  @tap="tomine">我的服务 ></span>
      </div>
    </div>
    <div class="container" :class="{'container1':isQR}">
      <div class="func">
        <div class="item" @tap="productHelper">
            <img src="../../../static/images/index_1.png" alt="">
          <div class="desc"v-if="!isQR">
            <p class="p1">产品家族</p>
            <p class="p2">Product Family</p>
          </div>
          <div class="desc"v-else>
            <p class="p1">产品助手</p>
            <p class="p2">Product Assistant</p>
          </div>
        </div>
        <navigator target="miniProgram" open-type="navigate" app-id="wx850d691fd02de8a1":extra-data="productmodalinfo" path="pages/navigator/index/index" version="develop" hover-class="none">
        <div class="item" @click="gohouse">
          <img src="../../../static/images/index_2.png" alt="">
          <div class="desc">
            <p class="p1">家居互联</p>
            <p class="p2">Home Connect</p>
          </div>
        </div>
        </navigator>
        <navigator target="miniProgram" open-type="navigate" app-id="wxe89498bdbf291da2" :extra-data="productmodalinfo" path="pages/seimensindex/main" version="trial" hover-class="none">
        <div class="item" @tap="goservice">
          <img src="../../../static/images/index_3.png" alt="">
          <div class="desc">
            <p class="p1">服务大厅</p>
            <p class="p2">Service Center</p>
          </div>
        </div>
        </navigator>
        <div class="item" @click="partshop">
          <img src="../../../static/images/index_4.png" alt="">
          <div class="desc">
            <p class="p1">配件商场</p>
            <p class="p2">Service eShop</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUserInfo,bindProduct} from "../../api/api";
import {navigate} from "../../utils/index";

  export default {
    data(){
      return{
        isQR:false,
        head:'',
        name:'',
        extradata:{
          // brand : '西门子',
          // unionId :wx.getStorageSync('unionid')
        },
        productmodalinfo:{
          // brand : '西门子',
          // unionId :wx.getStorageSync('unionid')
        }
      }
    },

    onLoad(options){
      Object.assign(this.$data, this.$options.data());
      let str='';
      if(options.type == 3){
        str = wx.getStorageSync('qrurl')
      }else{
        str = decodeURIComponent(options.q)
        wx.setStorageSync('qrurl',str)
      }
      if(str != 'undefined' && str != null || (options.zn)){
        let goodsId = this.GetUrlParam(str, "EN");
        let fd = this.GetUrlParam(str, "Fd");
        let sn = this.GetUrlParam(str, "zn");
        if (options.zn) {
          this.bind(options.EN, options.fd, options.sn, 1)
        } else this.bind(goodsId, fd, sn, 1)

        // this.productmodalinfo={
        //     id:3,
        //     logo:"https://huanwang2.oss-cn-shanghai.aliyuncs.com/img/5dwPE6TG7Tp3bYXcXfQ78c4k7pHxn7X8.png",
        //     name:"上下两门冰箱",
        //     vib:"B21CL80SNS",
        //     pdv:"A",
        //     ki:"02",
        //     fd:"9712",
        //     sn:"01020"
        // }
        this.isQR = true
        wx.setStorageSync('isqr',1)
      }else{
        this.productmodalinfo ={}
        this.productmodalinfo.type = 0
        wx.setStorageSync('isqr',0)
      }
      let info = wx.getStorageSync('productInfo')

      if(this.productmodalinfo.id == null){
        this.productmodalinfo.id = info.id
        this.productmodalinfo.name = info.name
        this.productmodalinfo.logo =  info.logo;
        this.productmodalinfo.vib =  info.vib;
        this.productmodalinfo.brand =  "西门子";
        this.productmodalinfo.unionId =   wx.getStorageSync('unionid')
        // this.productmodalinfo.brand = '西门子';
        // this.productmodalinfo.unionId =wx.getStorageSync('unionid')
        wx.setStorageSync('productInfo', this.productmodalinfo)
      }else{
        this.productmodalinfo.brand =  "西门子";
        this.productmodalinfo.unionId =   wx.getStorageSync('unionid')
        // this.isQR = true;
        wx.setStorageSync('productInfo', this.productmodalinfo)
      }

    },
    onShow(){
      getUserInfo().then(res=>{
        console.log(res.data)
        this.head = res.data.headimgurl
        this.name=res.data.nickname;
          wx.setStorageSync('phone', res.data.mobile)
        wx.setStorageSync('head', res.data.headimgurl)
        wx.setStorageSync('nickname', res.data.nickname)
      });
      this.extradata=this.productmodalinfo;
    },
    methods:{
      // 获取地址栏信息
      GetUrlParam(url, paraName) {
        var arrObj = url.split("?");
        if (arrObj.length > 1) {
          var arrPara = arrObj[1].split("&");
          var arr;
          for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");
            if (arr != null && arr[0] == paraName) {
              return arr[1];
            }
          }
          return "";
        } else {
          return "";
        }
      },
      // 绑定机器
      bind (id, fd, sn, type) {
        bindProduct({
          vib: id,
          fd: fd,
          sn: sn,
          sourceType: type
        }).then(res => {
          console.log('res', res.data)
          if (res.data.code == -1) {
            wx.showToast({ title: "未检索到产品", icon: "none", mask: true });
          } else {
            let pro ={
              id :res.data.data.productId,
              logo:res.data.data.logo,
              name:res.data.data.productName,
              vib:res.data.data.vib,
              pdv :res.data.data.pdv,
              fd:res.data.data.fd,
              sn:res.data.data.sn,
              ki:res.data.data.ki,
              type:1,
              brand : '西门子',
              unionId :wx.getStorageSync('unionid')
            }
            this.productmodalinfo = pro;
            wx.setStorageSync('productInfo', pro)
            // this.prodectInfo = res.data.data
            // this.productmodal = this.prodectInfo.vib
            // this.productType = this.prodectInfo.productName
            // this.productId = this.prodectInfo.productId
            this.isQR = true
          }
        })
      },
      goservice(){
        if(!this.isQR){
          this.productmodalinfo={}
        }
        console.log(this.isQR)
        console.log(this.productmodalinfo)
      },
      partshop(){
        wx.showToast({ title: '暂未开放', icon: 'none', mask: true })
      },
      gohouse(){
        this.productmodalinfo.brand = '西门子';
        this.productmodalinfo.unionId = wx.getStorageSync('unionid')
      },
      productHelper(){
        if(this.isQR){
          navigate('/pages/product/main?type=0')
        }else{
          navigate('/pages/productCenter/main?type=0')
        }
      },
      tomine(){
        navigate('/pages/mine/main')
      }
    }
  };

</script>

<style lang="less">
  @import "../../utils/flex";
  .boschindex{
    .top{
      position: relative;
      height: 266px;
      .tit{
        font-size:19px;
        color:#fff;
        text-align:center;
        font-weight:bold;
        position:absolute;
        z-index:22222;
        width:100%;
        top:31px;

      }
      .top_bg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .content{
        position: relative;
        top:84px;
        padding: 0 19px 0 28px;
        .display_flex;
        .align-items_center;
        .justify-content_space_flex-justify;
        img{
          width: 60px;
          height: 60px;
          border-radius: 100%;
        }
        .info{
            color: #fff;
            .p1{
              font-size: 16px;
              line-height: 19px;
              .type{
                position: relative;
                top: -2px;
              }
              .name{
                margin-left: 3px;
                font-size: 13px;
              }
            }
            .modal{
              font-size: 9px;
              text-align: right;
              margin-top: 2px;
            }
        }
      }
      .content2{
        position: relative;
        top: 90px;
        .display_flex;
        .align-items_center;
        .justify-content_space_flex-justify;
        padding: 0 32px 0 25px;
        color: #fff;
        span{
          .nick{
            font-size: 25px;
            margin-bottom: 8px;
            color: #47B8D4;
          }
          .myservice{
            width:86px;
            height:26px;
            padding: 5px 15px;
            line-height: 26px;
            font-size: 12px;
            border:1px solid #fff;
            text-align: center;
          }
        }
        img{
          width: 45px;
          height: 61px;
        }

      }
      .content3{
        position: relative;
        top: 90px;
        .display_flex;
        .align-items_center;
        .justify-content_space_flex-justify;
        padding: 0 32px 0 25px;
        color: #fff;
        .nick{
          font-size: 25px;
          margin-bottom: 8px;
          color: #47B8D4;
        }
        .myservice{
          width:86px;
          height:26px;
          line-height: 26px;
          font-size: 12px;
           border: 1px solid #fff;
          text-align: center;
        }
      }
    }
    .container1{
      position: relative;
      top: -15px!important;
    }
    .container{
      position: relative;
      top: -55px;
      padding-top: 20px;
      /*border-top-left-radius: 15px;*/
      /*border-top-right-radius: 15px;*/
      background: #F4F4F4;
      color: #3C464B;
      .func{
        width: 335px;
        height: 335px;
        margin: 0 auto;
        .display_flex;
        .justify-content_space_flex-justify;
        flex-wrap: wrap;
        .item{
          position: relative;
          width: 163px;
          height: 163px;
          background: #fff;
          margin-bottom: 8px;
          img{
            position: absolute;
            top: 18px;
            right: 20px;
            width: 50px;
            height: 48px;
          }
          .desc{
            position: absolute;
            bottom: 22px;
            left: 18px;
          }
          p{
            font-size: 10px;
          }
          .p1{
            font-size: 14px;
            margin-top: 9px;
          }
        }
      }
    }
  }
</style>
