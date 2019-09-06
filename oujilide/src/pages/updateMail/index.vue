<template>
    <div class="updateMail">
        <div class="updateMail-content">
            <div class="option">
                <p class="option-left">您的邮箱</p>
                <p class="option-right">
                    <input type="email" v-model="email" placeholder-style="color:rgba(23,89,117,0.6)" placeholder="请输入您的邮箱">
                </p>
            </div>
        </div>
        <div class="updateMail-btn">
            <p class="updateMail-btn-in" @click="saveInfo">保存</p>
        </div>
        <div class="img"><img src="/static/images/img1.png" alt=""></div>
    </div>
</template>
<script>
import {  getUserInfo, updateInfo } from '@/api/api'
import { goBack } from '@/utils/index'
export default {
    data(){
        return {
            email: null
        }
    },
    onShow(){
        this.queryUserInfo()
    },
    methods: {
        /**
         * 保存修改信息
         */
        async saveInfo(){
            if(!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.email))) { toast('邮箱格式不正确！'); return}
            const { data } = await updateInfo({email: this.email})
            if(data.code == 0){
                goBack()
            }
        },


        /**
         * 获取用户信息
         */
        async queryUserInfo(){
            const { data } = await getUserInfo()
            if(data.code === 0){
                this.email = data.data.userInfo.email
            }
        },
    }
}
</script>

<style lang="less">
page {
    width: 100%;
    height: 100%;
}
.updateMail {
    width: 100%;
    height: 100%;
    padding-top: 100rpx;
    box-sizing: border-box;
    overflow: hidden;
    &-content {
        width: 100%;
        padding: 0 30rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .option {
            width:100%;
            height:100rpx;
            background:rgba(255,255,255,1);
            box-shadow:0rpx 0rpx 10rpx 0rpx rgba(172,168,168,1);
            border-radius:50rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30rpx;
            box-sizing: border-box;
            margin-bottom: 60rpx;
            &-left {
                font-size: 28rpx;
                color: #175975;
                font-weight: 500;
                .picker {
                    font-size: 28rpx;
                }
            }
            ._picker {
                font-size: 28rpx;
                color: rgba(23,89,117,0.6);
                flex: 1;
                .picker {
                    width: 100%;
                    text-align: right;
                }
            }
            &-right {
                font-size: 28rpx;
                flex: 1;
                text-align: right;
                input {
                    text-align: right;
                }
            }
        }
    }
    &-btn {
        width: 100%;
        height: 88rpx;
        display: flex;
        justify-content: center;
        &-in {
            width: 240rpx;
            height: 100%;
            box-shadow:0px 0px 10px 0px rgba(172,168,168,1);
            border-radius:44rpx;
            font-size: 32rpx;
            color: #175975;
            font-weight: 500;
            text-align: center;
            line-height: 88rpx;
        }

    }
    .img {
        width: 100%;
        height: 680rpx;
        image {
            width: 100%;
            height: 100%;
            margin-top: 110rpx
        }
    }
}
</style>

