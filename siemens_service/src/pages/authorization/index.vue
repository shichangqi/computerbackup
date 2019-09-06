<template>
    <div class="authorization">
        <div class="bg">
            <img src="../../static/images/authorization_bg.png" alt="">
        </div>
        <div class="content">
            <button open-type="getUserInfo" @getuserinfo="getUserInfo">获取微信授权</button>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import {getToken} from "../../api/api";
import {goBack} from "../../utils";

export default {
    data(){
        return {
          id:null,
          type:null
        }
    },
  onLoad(options){
    if(options.id){
      this.id = options.id;
      this.type = options.type
    }
    console.log(21212)
    console.log(options)
  },
    methods: {

        /**
         * 获取Actions
         */
        ...mapActions([
            'getAccessToken'
        ]),

        /**
         * 登录授权按钮
         */
        getUserInfo (e) {
            let _this = this
            let userInfo = e.target ? e.target.userInfo : null
            if (!userInfo) {
                wx.showToast({ title: '拒绝授权，将无法使用本小程序全部功能，请重新获取授权！', icon: 'none', mask: true })
                return
            }
            wx.login({
                success (resLogin) {
                     wx.showLoading({title: '授权中',mask: true})
                    if (resLogin.code) {
                      // const data= {
                      //   account:"admin",
                      //   password:"admin"
                      // }

                      const data={
                        code:resLogin.code,
                        nickname:userInfo.nickName,
                        headimgurl:userInfo.avatarUrl,
                        gender:userInfo.gender
                      }
                      wx.setStorageSync('code',resLogin.code);
                      console.log(userInfo)
                      console.log(resLogin)

                      _this.getAccessToken(data).then(res => {
                          wx.hideLoading();
                        if(_this.id && _this.type){
                          console.log(222)

                          wx.redirectTo({
                            url: '/'+ _this.$root.$mp.appOptions.path + '?id='+_this.id+'&type='+_this.type
                          })
                        }else{
                          wx.redirectTo({
                            url: '/'+ _this.$root.$mp.appOptions.path
                          })
                        }
                          // goBack();
                          // wx.redirectTo({
                          //   url: '/pages/seimensindex/main'
                          // })
                      }).catch((error) => {
                        console.log(error)
                      })
                    }
                }
            })
        }
    }
}
</script>

<style lang="less">
page {
    height: 100%;
    overflow: hidden;
}
.authorization {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        image {
            width: 100%;
            height: 100%;
        }
    }
    .content {
        button {
          position: absolute;
          bottom: 96px;
          left: 0;
          right: 0;
          margin: auto;
          width: 81%;
          height: 44px;
          background: #41AAAA;
          color: #FFF;
          font-size: 16px;
          border-radius: 10px;
          text-align: center;
          line-height: 44px;
          box-shadow:0px 0px 10px 0px rgba(172,168,168,0.2)
        }
    }
}
</style>

