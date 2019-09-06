<template>
  <div>
    <div class="top">
      <img src="../../../static/images/mine_bg.png" alt="" class="bg">
      <img src="../../../static/images/left.png" alt="" class="left" @click="back">
    </div>
    <div class="header">
      <img :src="imgList" alt="" class="headlogo">
      <img src="../../../static/images/mine_edit.png" alt="" class="edit" @tap="upImg">
    </div>
    <div class="nickname">{{nickname}}</div>
    <div class="mine_service" >
      <div class="item"@tap="goserviceorder">
        <img src="../../../static/images/service_order.png" alt="">
        <p class="p1">服务记录</p>
        <p class="p2">Service record</p>
      </div>
      <div class="item" @tap="gocontact">
        <img src="../../../static/images/mine_address.png" alt="">
        <p class="p1">我的地址</p>
        <p class="p2"> My Address</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {navigate} from "../../utils/index";
  import COS from "cos-wx-sdk-v5";
  import {updateuser,getUserInfo, keyCos} from "../../api/api";
  var config = {
    Bucket: 'txb-qr-1252281731',//replace with yours
    Region: 'ap-beijing',//replace with yours
    SecretId: 'AKIDbz7ymOIIgLp28xzjZKY5MWeV9VaRgZDE',//replace with yours
    SecretKey: '5tUo8RXNgjn57SiiRt51huSu6WgbGgpn'//replace with yours
  }
 // var  cosUrl = "https://" + config.Region + ".file.myqcloud.com/files/v2/" + config.APPID + "/" + 'name' + 'DIR_NAME';

  export default {
    data(){
      return {
        head:'',
        nickname:'',
        curindex:2,
        key: null,
        imgList: null,
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

    },
    methods:{
      async updateuser (headimgurl) {
        await updateuser({headimgurl: headimgurl})
      },
      back () {
        wx.navigateBack({
        })
      },
      //获取cos key
      async keyCos () {
        const { data } = await keyCos()
        this.key = data.credentials
      },
      handleContact(e){
        console.log(e)
      },
      // upload(){
      //   let _this = this;
      //   wx.chooseImage({
      //     success(res) {
      //       const tempFilePaths = res.tempFilePaths[0];
      //       console.log(tempFilePaths)
      //       let data={
      //         headimgurl:tempFilePaths
      //       }
      //       updateuser(data).then(res=>{
      //         _this.head = tempFilePaths
      //       })
      //       wx.uploadFile({
      //         url: cosUrl + '/' + fileName,
      //         filePath: filePath,
      //         header: {
      //           'Authorization': signature
      //         },
      //         name: 'filecontent',
      //         formData: {
      //           op: 'upload'
      //         },
      //         success: function(uploadRes) {
      //         }
      //       })
      //     }
      //   })
      // },
      gocontact(){
        navigate('/pages/contactWay/main?mine=0')
      },
      goserviceorder(){
        navigate('/pages/serviceLog/main')
      },


// 上传图片
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
    }
  };
</script>

<style scoped lang="less">
  @import "../../utils/flex";
  .top{
    height: 182px;
    width: 100%;
    .bg{
      width: 100%;
      height: 100%;
    }
    .left{
      width:40rpx;
      height:40rpx;
      position:absolute;
      z-index:222;
      left:15px;
      top:30px;

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



</style>
