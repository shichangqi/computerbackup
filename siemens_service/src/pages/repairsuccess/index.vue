<template>
    <div class="installsuccess">
      <div class="top">
        <img src="../../static/images/success_bg.png" alt="">
        <div class="successtips">
          <p>提交成功</p>
        </div>
        <div class="desc">
          <p>小家电产品需要送到服务中心维修，请您将机器寄送到:</p>
          <p>{{service.address}}</p>
          <p>联系电话：{{service.mobile}}</p>
          <p class="tips">我们的工程师也会与您联系，敬请留意。</p>
        </div>
      </div>
      <div class="userinfo">
        <p><label>用户名：</label><span>{{address.surname+address.name}}</span></p>
        <p><label>手机号：</label><span>{{address.mobile}}</span></p>
        <div class="address"><label>服务地址：</label><p>{{address.province}}{{address.city}}{{address.country}}{{address.addr}}</p></div>
      </div>
      <div class="submit" @tap="addContact">确定</div>
    </div>
</template>

<script>
  import {redirectTo} from "../../utils/index";
  import {getrecentservice} from "../../api/api";

  export default {
    data(){
      return{
        address:{},
        service:{}
      }
    },
    onLoad(option){
      Object.assign(this.$data, this.$options.data())
      let _this = this;
      this.address = JSON.parse(option.address)
      this.address.mobile = this.address.mobile.substr(0, 3) + '****' + this.address.mobile.substr(7);
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          const data={
            lat:res.latitude,
            lng:res.longitude,
            trademarkType:1
          }
          console.log(res)
          wx.showLoading({title: '加载中',mask: true})

          getrecentservice(data).then(res=>{
              _this.service = res.data
            wx.hideLoading();

          })
        }
      })
    },
    methods:{
      addContact(){
        redirectTo('/pages/seimensindex/main')
      }
    }
  };
</script>

<style scoped lang="less">
  @import "../../utils/flex.less";
.installsuccess{
  .top{
    position: relative;
    background: #fff;
    img{
      height: 108px;
      width: 100%;
    }
    .successtips{
      position: absolute;
      top: 25px;
      left: 0;
      right: 0;
      margin: auto;
      width: 108px;
      height: 108px;
      background: url("../../static/images/success_icon.png") center no-repeat;
      background-size: 100% 100%;
      text-align: center;
      p{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        color: #3C464B;
        font-size: 18px;
      }
    }
    .desc{
      /*width: 85%;*/
      margin:37px auto 0 auto;
      box-sizing: border-box;
      padding: 0 34px 15px 34px;
      p{
        color: #879BAA;
        font-size: 12px;
        line-height: 17px;
        margin-top: 8px;
      }
      .tips{
        margin-top: 30px;
      }
    }
  }
  .userinfo{
    padding: 12px 15px;
    background: #fff;
    margin-top: 10px;
    p{
      color: #3C464B;
      font-size: 13px;
      line-height: 18px;
      margin-bottom: 10px;
      label{
        display: inline-block;
        width: 68px;
      }

    }
    .address{
      .display_flex;
      label{
        display: inline-block!important;
        width: 68px;
        font-size: 13px;
      }
      p{
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
      }

    }

  }
  .submit{
    width:160px;
    height:44px;
    background:rgba(65,170,170,1);
    border-radius:22px;
    margin: 37px auto 17px auto;
    text-align: center;
    line-height: 44px;
    color: #fff;
    font-size: 16px;
    -moz-box-shadow:2px 2px 10px  rgba(65,170,170,.7);/*firefox*/
    -webkit-box-shadow:2px 2px 10px  rgba(65,170,170,.7);/*webkit*/
    box-shadow:2px 2px 10px  rgba(65,170,170,.7);/*opera或ie9*/
  }
}
</style>
