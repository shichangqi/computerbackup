<template>
    <div class="installsuccess">
      <div class="top">
        <img src="../../static/images/success_bg.png" alt="">
        <div class="successtips">
          <p>提交成功</p>
        </div>
        <div class="desc">
          <p>工程师最迟会在上门日期当天早上9：30前与您确认上门时间，请保持电话通畅。</p>
          <p>工程师上门信息将以短信发送至您手机，敬请留意。</p>
          <!--<p>您的预约移机订单已提交成功！您可在“服务记录”中查看相应状态~</p>-->
        </div>
      </div>
      <div class="userinfo" v-if="address.name">
        <p><label>类型：</label><span>拆机</span></p>
        <p><label>用户名：</label><span>{{address.surname+address.name}}</span></p>
        <p><label>手机号：</label><span>{{address.mobile}}</span></p>
        <div class="address"><label>服务地址：</label><p>{{address.province}}{{address.city}}{{address.country}}{{address.addr}}</p></div>
      </div>
      <div class="userinfo2" v-if="address2.name">
        <p><label>类型：</label><span>二次安装</span></p>
        <p><label>用户名：</label><span>{{address2.surname+address2.name}}</span></p>
        <p><label>手机号：</label><span>{{address2.mobile}}</span></p>
        <div class="address"><label>安装地址：</label><p>{{address2.province}}{{address2.city}}{{address2.country}}{{address2.addr}}</p></div>
      </div>
      <div class="submit" @tap="addContact">确定</div>
    </div>
</template>

<script>
  import {redirectTo} from "../../utils/index";

  export default {
    data(){
      return {
        address:{},
        address2:{}
      }
    },
    onLoad(option){
      if(option.address){
        this.address = JSON.parse(option.address)
        this.address.mobile = this.address.mobile.substr(0, 3) + '****' + this.address.mobile.substr(7);
      }
      if(option.address2){
        this.address2 = JSON.parse(option.address2)
        this.address2.mobile = this.address2.mobile.substr(0, 3) + '****' + this.address2.mobile.substr(7);
      }

    },
    methods:{
      addContact(){
        redirectTo('/pages/seimensindex/main')
      }
    },
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
      width: 85%;
      margin:37px auto 0 auto;
      box-sizing: border-box;
      padding: 0 34px 15px 34px;
      p{
        color: #879BAA;
        font-size: 12px;
        line-height: 17px;
        text-align: center;
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
  .userinfo2{
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
