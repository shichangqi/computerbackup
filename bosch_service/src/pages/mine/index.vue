<template>
  <div class="mine">

    <div class="top">
      <img src="../../static/images/mine_bg.png" alt="">
    </div>
    <div class="header">
      <img :src="imgList" alt="" class="headlogo">
      <img src="../../static/images/mine_edit.png" alt="" class="edit" @tap="upImg">
    </div>
    <div class="nickname">{{nickname}}</div>
    <div class="mine_service" >
      <div class="item"@tap="goserviceorder">
        <img src="../../static/images/service_order.png" alt="">
        <p class="p1">服务记录</p>
        <p class="p2">Service record</p>
      </div>
      <div class="item" @tap="gocontact">
        <img src="../../static/images/mine_address.png" alt="">
        <p class="p1">我的地址</p>
        <p class="p2"> My Address</p>
      </div>
    </div>
  </div>
</template>

<script>
import {navigate} from "../../utils/index";
import {updateuser,getUserInfo,keyCos} from "../../api/api";
import COS from "cos-wx-sdk-v5";
  var config = {
    Bucket: 'txb-qr-1252281731',//replace with yours
    Region: 'ap-beijing',//replace with yours
    SecretId: 'AKIDbz7ymOIIgLp28xzjZKY5MWeV9VaRgZDE',//replace with yours
    SecretKey: '5tUo8RXNgjn57SiiRt51huSu6WgbGgpn'//replace with yours
  }
  export default {
    data(){
      return {
        bottomtab:[
          {
            imgurl:'../../static/images/tabselect1.png',
            selectedurl:'../../static/images/tabselected1.png',
            text:'主页',
            selected:true
          },
          {
            imgurl:'../../static/images/tabselect2.png',
            selectedurl:'../../static/images/tabselected2.png',
            text:'客服',
            selected:false
          },
          {
            imgurl:'../../static/images/tabselect3.png',
            selectedurl:'../../static/images/tabselected3.png',
            text:'我的',
            selected:false
          }
        ],
        head:'',
        nickname:'',
        curindex:2,
        key: null,
        imgList: []
      }
    },
    onLoad(){
      Object.assign(this.$data, this.$options.data());
      this.keyCos()
      getUserInfo().then(res=>{
        this.imgList = res.data.headimgurl;
        this.nickname = res.data.nickname
      });
    },
    onShow(){
      // this.bottomtab[0].selected = false
      // this.bottomtab[1].selected = false
      // this.bottomtab[2].selected = true
    },
    methods:{
      handleContact(e){
        console.log(e)
      },
      async updateuser (headimgurl) {
        await updateuser({headimgurl: headimgurl})
      },
      async keyCos () {
        const { data } = await keyCos()
        this.key = data.credentials
      },
      upImg() {
        var that = this;
        var cos = new COS({
          getAuthorization: function(params, callback) {
//获取签名 必填参数
// 方法二（适用于前端调试）
            console.log('paramsparamsparams', that.key.tmpSecretId)
            var authorization = COS.getAuthorization({
              SecretId: config.SecretId,
              SecretKey:  config.SecretKey,
              Method: params.Method,
              Key: params.Key
            });
            callback(authorization);
          }
        });
        wx.chooseImage({
          count: 9, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function(res) {
            that.curindex = 2;
            var filePath = [];
            filePath = res.tempFilePaths;
            for (let i = 0; i < filePath.length; i++) {
              var Key = filePath[i].substr(filePath[i].lastIndexOf("/") + 1); // 这里指定上传的文件名
              cos.postObject(
                {
                  Bucket: config.Bucket,
                  Region: config.Region,
                  Key: Key,
                  FilePath: filePath[i],
                  onProgress: function(info) {
                    console.log(JSON.stringify(info));
                  }
                },
                function(err, data) {
                  if (err && err.error) {
                    wx.showModal({
                      title: "返回错误",
                      content:
                        "上传失败：" +
                        err.error.Message +
                        "；状态码：" +
                        err.statusCode,
                      showCancel: false
                    });
                  } else if (err) {
                    wx.showModal({
                      title: "上传出错",
                      content: "上传出错：" + err + "；状态码：" + err.statusCode,
                      showCancel: false
                    });
                  } else {
                    wx.showToast({
                      title: "上传成功",
                      icon: "success",
                      duration: 3000
                    });
                    let url = "https://" + data.Location;
                    that.imgList = url
                    that.updateuser(that.imgList)
                  }
                }
              );
            }
          }
        });
      },
      gocontact(){
        navigate('/pages/contactWay/main?mine=0')
      },
      goserviceorder(){
        navigate('/pages/serviceLog/main')
      },


      target(index){
        if(this.bottomtab[index].selected){
          return;
        }
        this.bottomtab.forEach((item,i)=>{
          if(index == i){
            this.bottomtab[index].selected = !this.bottomtab[index].selected;
          }else{
            this.bottomtab[i].selected = false;
          }
        })
        if(index == 0){
          navigate('/pages/boschindex/main')
        }
        if(index == 1){
          wx.removeStorageSync('productInfo')

          navigate('/pages/ibotim/main')
        }
        if(index == 2){
          return;
          // navigate('/pages/mine/main')
          // wx.showToast({ title: "敬请期待", icon: "none", mask: true });
        }
        this.curindex = index;

      }
    }
  };
</script>

<style scoped lang="less">
  @import "../../utils/flex";
  .mine{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f4f4f4;
    .top{
      height: 182px;
      width: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .header{
      position: absolute;
      width: 74px;
      height: 74px;
      top:145px;
      left: 0;
      right: 0;
      margin: auto;
      .headlogo{
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
      .edit{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 20px;
        height: 20px;
      }
    }
    .nickname{
      position: absolute;
      top:216px;
      left: 0;
      right: 0;
      margin: auto;
      text-align: center;
      font-size: 28px;
      color: #47B8D4;
    }
    .mine_service{
      /*width: 335px;*/
      padding: 0 20px;
      margin-top: 115px;
      .display_flex;
      .justify-content_space_flex-justify;
      .item{
        position: relative;
        width: 163px;
        height: 163px;
        background: #fff;
        img{
          position: absolute;
          top: 19px;
          right: 17px;
          width: 40px;
          height: 44px;
        }
        .p1{
          position: absolute;
          left: 18px;
          bottom: 37px;
          font-size: 14px;
        }
        .p2{
          position: absolute;
          left: 18px;
          bottom: 22px;
          font-size: 10px;
        }
      }
    }
    /* .panel {
       height: 44px;
       padding: 0 15px;
       !*border-bottom: 1px solid #e2e3e4;*!
       background: #fff;
       margin-top: 20px;
       .display_flex;
       .justify-content_space_flex-justify;
       .align-items_center;
       font-size: 14px;
       line-height: 44px;
       .panel_name {
         color: #3c464b;
       }
       img {
         width: 8px;
         height: 14px;
         margin-bottom: -2px;
         margin-left: 10px;
       }
     }*/
    .bottom{
      position: fixed;
      bottom: 0;
      left: 0;
      height: 86px;
      width: 100%;
      background: url("../../static/images/bottom_bg.png") no-repeat;
      background-size: 100% 100%;
      padding: 5px 20px 10px 20px;
      box-sizing: border-box;
      .display_flex;
      .justify-content_space_flex-justify;
      .align-items_flex-end;
      text-align: center;
      .active{
        color: rgba(0, 122, 186, 1);
      }
      .item{
        position: relative;
        font-size: 0;
        .flex_1;
        .iboot{
          position: absolute;
          top:0;
          bottom:0;
          left:0;
          right:0;
          opacity: 0;
        }
        img{
          height: 30px;
          width: 30px;
          margin-bottom: 2px;
        }
        p{
          font-size: 10px;
        }
        .kefu{
          width: 46px;
          height: 38px;
          margin-bottom: 5px;
        }
      }
    }
  }

</style>
