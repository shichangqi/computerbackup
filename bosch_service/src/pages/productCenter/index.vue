<template>
  <div class="product">
    <div class="pro-top">
      <div class="wrap" @click="scan">
        <img src="../../static/images/code.png">
        <p class="code">扫描机身二维码</p>
      </div>
      <div class="what" @tap="onshow">
        <span>找不到二维码</span>
        <img src="../../static/images/what.png">
      </div>
    </div>
    <div class="wrpa-list">
      <div class="detail" v-for="(item, index) in list" :key="index" @click="choose(item)">
        <img :src="item.logo" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="cantfind"  v-if="show" catchtouchmove="ture">
      <div class="modal">
        <h5>哪里可以找到产品二维码</h5>
        <scroll-view scroll-y="true" class="scroll">
          <img src="../../static/images/notfind.jpg">
        </scroll-view>
        <div class="closebtn" @tap="onhidden">知道了</div>
      </div>
    </div>
    <button open-type="contact" @contact="handleContact" class="link">在线咨询</button>

  </div>
</template>

<script>
import {
  navigate,
  redirectTo,
  goBack,
  reLaunch,
  formatTime,
  formatNumber,
  arrayTime
} from "../../utils/index";
import { productList, bindProduct } from "../../api/api";

export default {
  data() {
    return {
      list: [],
      show:false,
      type:-1
    };
  },
  async onLoad(option) {
    if(option.type == 0){
      this.type = option.type;
    }
    this.list = [];
    this.getList()
  },

  onShow() {
  },
  onUnload() {},
  methods: {
    onshow() {
      this.show = true;
    },
    onhidden() {
      this.show = false;
    },
    kefu(){
      redirectTo('/pages/ibotim/main')
    },
    getList () {
      productList({}).then(res => {
        this.list=[];

        res.data.forEach(item=>{
          if(item.name != '饮水机'){
            this.list.push(item)
          }
        })
      })
    },
    choose (item) {
      let pro ={
        id :item.id,
        logo:item.logo,
        name:item.name,
        pdv :item.pdv
      }
      wx.setStorageSync('productInfo', pro)
      // wx.navigateBack({
      //   delta: 1 // 回退前 delta(默认为1) 页面
      // })
        navigate('/pages/product/main?type=3')

    },
    scan () {
      let that = this
      wx.scanCode({
        success: function(res){
          let str = decodeURI(res.result);
          let goodsId = that.GetUrlParam(str, "EN");
          let fd = that.GetUrlParam(str, "Fd");
          let sn = that.GetUrlParam(str, "zn");
          that.bind(goodsId, fd, sn, 1)
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    },
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
        console.log(res)
        if (res.data.code == -1) {
          wx.showToast({ title: "未检索到产品", icon: "none", mask: true });
          return;
        }
          wx.setStorageSync('productInfo', res.data.data)
          redirectTo('/pages/product/main?type=0')

      })
    },
  }
};
</script>

<style scoped lang="less">
@import "../../utils/flex.less";
.product {
  .cantfind {
    position: fixed;
    width:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    /*padding: 20px;*/
    background: rgba(0, 0, 0, 0.6);
    z-index: 8888;
    height: 100%;
    text-align: center;
    .modal{
      background: #fff;
      border-radius: 8px;
      padding:23px 20px 20px;
      width: 70%;
      margin: 105px auto ;
      h5{
        color: #3C464B;
        font-size: 18px;
      }
      .scroll{
        margin-top: 12px;
        height: 280px;
        white-space: nowrap;
        padding: 0 17px;
        img {
          width: 100%;
          height: 1000px;
        }
      }
      .closebtn{
        width: 100%;
        height: 35px;
        border-radius: 5px;
        background: #107BB8;
        /*border: 1px solid #41aaaa;*/
        line-height: 35px;
        margin: 20px auto;
        font-size: 14px;
        color: #fff;
      }

    }

  }
  .pro-top {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    padding: 21px 0;
    .wrap {
      position: relative;
      img {
        width: 160px;
        height: 160px;
      }
      .code {
        position: absolute;
        bottom: 40px;
        left: 30px;
        font-size: 14px;
        color: #ffffff;
      }
    }
    .what {
      position: absolute;
      top: 24px;
      right: 20px;
      display: flex;
      align-items: center;
      img {
        width: 11px;
        height: 11px;
        margin-left: 2px;
      }
      span {
        font-size: 10px;
        color: #3C464B;
      }
    }
  }
  .wrpa-list {
    display: flex;
    flex-wrap: wrap;
    background: #ffffff;
    padding: 31px 40px;
    .detail:nth-child(3n+0) {
      margin-right: 0;
    }
    .detail {
      width: 75px;
      text-align: center;
      margin-right: 34px;
      margin-bottom: 34px;
      img {
        width: 75px;
        height: 75px;
      }
      p {
        font-size: 10px;
        color: #3C464B;
        margin-top: 15px;
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
