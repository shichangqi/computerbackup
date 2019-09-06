<template>
    <div class="authorization">
        <div class="bg">
            <img src="/static/images/bg.png" alt="">
        </div>
        <div class="content">
            <p class="p1">登录后小程序将会获得以下权限</p>
            <p class="p2">• 获得你的公开信息（昵称、头像等）</p>
            <button open-type="getUserInfo" @getuserinfo="getUserInfo">授权登录</button>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data(){
        return {

        }
    },
    mounted(){

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
                        const data = {
                            nickName: userInfo.nickName,
                            headimgurl: userInfo.avatarUrl,
                            code: resLogin.code,
                        }
                        _this.getAccessToken(data).then(res => {
                            wx.hideLoading()
                            wx.redirectTo({
                                url: '/pages/personalCenter/main'
                            })
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
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 0;
        left: 0;
        border-top: 1rpx #F4F4F4 solid;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 200rpx;
        .p1 {
            font-size: 26rpx;
            color: #333;
            margin-bottom: 40rpx;
            font-weight: 400;
        }
        .p2 {
            font-size: 22rpx;
            color: #999;
            margin-bottom: 108rpx;
        }
        button {
            width: 500rpx;
            height: 88rpx;
            background: #39B1AC;
            color: #FFF;
            font-size: 28rpx;
            border-radius: 44rpx;
            text-align: center;
            line-height: 88rpx;
            box-shadow:0px 0px 10px 0px rgba(172,168,168,0.2)
        }
    }
}
</style>

