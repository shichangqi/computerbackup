<template>
  <div class="register">
    <img src="/static/images/moen_logo.png" alt class="logo" />
    <div class="form">
      <div class="phone">
        <img src="/static/images/regist_phone.png" alt />
        <input
          type="text"
          placeholder="请输入手机号"
          placeholder-style="color:rgba(27, 54, 93, .5);font-size:16px"
          v-model="phone"
        />
      </div>
      <div class="phonecode">
        <img src="/static/images/regist_code.png" alt />
        <input
          type="password"
          placeholder="请输入密码"
          placeholder-style="color:rgba(27, 54, 93, .5);font-size:16px"
          v-model="password"
        />
      </div>
      <p class="statement">(记住密码一个月)</p>
      <div class="registerBtn" @click="login">登录</div>
    </div>
  </div>
</template>
<script>
import  storage  from "../../utils/storage";
import {getToken} from '../../api/api'
import {reLaunch} from '../../utils/index'
export default {
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  onLoad(){
      this.phone = storage.get('username');
      this.password = storage.get('password');
      console.log(this.password);
      
  },
  methods: {
    login() {
      if(this.phone == '' || this.phone == undefined){
        wx.showToast({
                title: '用户名不能为空',
                icon: "none",
                mask: true
              });
        return;
      }
      if(this.password == '' || this.password == undefined){
        wx.showToast({
                title: '密码不能为空',
                icon: "none",
                mask: true
              });
        return;
      }
      storage.put("username", this.phone);
      storage.put("password", this.password, 2592000);
      getToken({
        grant_type : 'password',
        client_id : 'fides',
        username : this.phone,
        password :this.password
      }).then(res=>{
        if(res.status == 200){
          wx.setStorageSync("token", res.data.access_token);
          if(res.data.access_token){
            reLaunch('/pages/index/main');
          }
        }else if(res.status == 401){
          wx.showToast({
                title: '用户名或密码错误',
                icon: "none",
                mask: true
              });
        }else{
           wx.showToast({
                title: '网络异常，请稍后再试！',
                icon: "none",
                mask: true
              });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.register {
  position: absolute;
  background: #7490a5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  .logo {
    width: 103px;
    height: 23px;
    margin-top: 59px;
  }
  .form {
    padding: 57px 32px 0 32px;
    text-align: left;
    input {
      height: 44px;
      font-size: 16px;
      color: #fff;
      width: 100%;
    }
    .phone {
      display: flex;
      align-items: center;
      height: 44px;
      border-bottom: 1px solid #b7c9d3;
      img {
        width: 11px;
        height: 18px;
        margin-right: 11px;
      }
    }
    .phonecode {
      display: flex;
      align-items: center;
      height: 44px;
      border-bottom: 1px solid #b7c9d3;
      img {
        width: 29rpx;
        height: 36rpx;
        margin-right: 9px;
      }
    }
    .statement {
      margin-top: 10px;
      color: #999999;
      font-size: 14px;
      text-align: right;
    }
    .registerBtn {
      width: 100%;
      height: 44px;
      background: rgba(183, 201, 211, 1);
      border-radius: 4px;
      text-align: center;
      line-height: 44px;
      font-size: 16px;
      color: #7490a5;
      margin-top: 59px;
    }
  }
}
</style>


