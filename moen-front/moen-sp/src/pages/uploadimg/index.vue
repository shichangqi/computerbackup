<template>
  <div class="uploadimages">
    <div class="content">
      <p>上传交易及付款凭证完成交易录入</p>
      <p>（最多可上传三张）</p>
      <div class="upload1" v-if="!hasimg" @click="chooseimg">
        <img src="/static/images/camera_icon.png" alt />
        <p>上传交易及付款凭证</p>
      </div>
      <div class="upload2">
        <img :src="path" v-for="(path,index) in imglist" :key="index" mode="aspectFill" @click="imgpreview(path)" />
        <div class="loadbtn" v-if="imglist.length >0 && imglist.length < 3">
          <img src="/static/images/camera_icon.png" @click="chooseimg" />
        </div>
      </div>
    </div>
    <div class="nextbtn" @click="submit">确认提交</div>
    <canvas :style="'width:'+w+'px; height:'+h+'px'" canvas-id="myCanvas" class="cans"></canvas>
  </div>
</template>
<script>
import { hostName, createTransaction } from "../../api/api";
import { reLaunch } from "../../utils";
export default {
  data() {
    return {
      hasimg: false,
      w: 0,
      h: 0,
      imglist: [],
      currentindex: 0,
      flag:true
    };
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data());
  },
  methods: {
    imgpreview(path){
      let that = this;
      wx.previewImage({
      current: path, // 当前显示图片的http链接  
      urls: that.imglist // 需要预览的图片http链接列表  
    })
    },
    submit() {
      if(!this.flag){
        wx.showToast({
            title: "正在提交中...",
            icon: "success",
            mask: true
          });
        return;
      }
      this.flag = false;
      if (this.imglist.length == 0) {
        wx.showToast({
          title: "请上传交易及付款凭证！",
          icon: "none",
          mask: true
        });
        return;
      }
      let orderinfo = wx.getStorageSync("orderinfo");
      orderinfo.total_quantity = 1;
      orderinfo.transaction_type_code = "purchase";
      orderinfo.image_urls = this.imglist;
      createTransaction(orderinfo).then(res => {
        if (res.data.code == 2000) {
          this.flag = true;
          wx.showToast({
            title: "提交成功",
            icon: "success",
            mask: true
          });
          wx.removeStorage({ key: "orderinfo" });
          setTimeout(() => {
            reLaunch("/pages/index/main");
          }, 1500);
        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: "none",
            mask: true
          });
        }
      });
    },
    //上传到图片服务器得到网络链接
    wxupload(path) {
      let token = wx.getStorageSync("token");
      let that = this;
      wx.getImageInfo({
        src: path,
        success: function(ras) {
          const ctx = wx.createCanvasContext("myCanvas"); //创建画布
          var _w = ras.width, //创建宽高等于获取到的宽高
            _h = ras.height;
          var rat = ras.width / ras.height;
          that.w = _w;
          that.h = _h;
          //传输到视图层
          ctx.drawImage(path, 0, 0, _w, _h); //画布中展示图片大小
          wx.showLoading({ title: "压缩上传中...", mask: true }); //运行压缩输出文字（显示loading）
          ctx.draw(false, () => {
            setTimeout(() => {
              wx.canvasToTempFilePath({
                //把当前画布指定区域的内容导出生成指定大小图片，并返回文件路径
                canvasId: "myCanvas", //画布id
                quality: 0.7, //图片质量，取值范围在（0，1】
                fileType: "jpg",
                success: function(rps) {
                  console.log(444, rps); //给后台传输这个地址
                  // that.imglist.push(rps.tempFilePath);
                  wx.uploadFile({
                    url: hostName + "/oss/image/master/file/upload", //真实的接口地址
                    filePath: rps.tempFilePath,
                    name: "file",
                    formData: {
                      project: 1,
                      module: 1
                    },
                    header: {
                      access_token: token
                    },
                    success: function(res) {
                      let data = JSON.parse(res.data);
                      if (data.code == 2000) {
                        that.currentindex++;
                        that.imglist.push(data.result.url);
                        that.hasimg = true;
                        wx.hideLoading(); //隐藏loading
                        wx.showToast({
                          title: "上传成功！",
                          icon: "success",
                          mask: true
                        });
                      } else {
                        wx.showToast({
                          title: "上传失败！",
                          icon: "none",
                          mask: true
                        });
                      }
                    }
                  });
                },
                fail: function(a) {
                  console.log(a);
                },
                complete: function(b) {}
              });
            }, 200);
          });
        }
      });
    },
    //选择是拍照还是从相册选择
    chooseimg() {
      let _this = this;
      wx.showActionSheet({
        itemList: ["从相册中选择", "拍照"], //下面显示的数组是拍照还是别的
        itemColor: "#1B365D", //显示文字的颜色
        success: function(res) {
          if (!res.cancel) {
            //选中判断
            if (res.tapIndex == 0) {
              _this.chooseWxImage("album");
            } else if (res.tapIndex == 1) {
              _this.chooseWxImage("camera");
            }
          }
        }
      });
    },
    //选择图片并绘制canvas之后导出
    chooseWxImage(type) {
      var that = this;
      wx.chooseImage({
        //上传图片事件
        count: 1, //数量
        sizeType: ["compressed"], //original 原图，compressed 压缩图，默认二者都有
        sourceType: [type], //album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          that.wxupload(res.tempFilePaths[0]);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.uploadimages {
  position: absolute;
  top: 0;
  left: 0;
  background: #f4f4f4;
  height: 100%;
  width: 100%;
  .content {
    text-align: center;
    padding: 40rpx 32rpx 0;
    color: #999999;
    font-size: 32rpx;
    .upload1 {
      background: #fff;
      height: 240rpx;
      margin-top: 40rpx;
      img {
        width: 73rpx;
        height: 69rpx;
        margin: 55rpx 0 17rpx;
      }
    }
    .upload2 {
      display: flex;
      margin-top: 40rpx;
      text-align: left;
      img {
        width: 33%;
        height: 240rpx;
        margin-left: 12rpx;
        &:first-child {
          margin-left: 0;
        }
      }
      .loadbtn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 33%;
        height: 240rpx;
        background: #fff;
        margin-left: 12rpx;
        img {
          width: 73rpx;
          height: 69rpx;
        }
      }
    }
  }
  .nextbtn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 44px;
    z-index: 99999;
    background: #1b365d;
    line-height: 44px;
    text-align: center;
    color: #fff;
  }
  .cans {
    position: absolute;
    left: -1010000px;
    top: -200000px;
  }
}
</style>


