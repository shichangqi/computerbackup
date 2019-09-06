<template>
    <div class="nextPage" v-if="userInfo">
        <div class="nextPage-content">
            <div class="option">
                <p class="option-left">{{userInfo.nickName}}</p>
                <p class="option-right">
                    <img class="head" :src="userInfo.headImg" alt="">
                </p>
            </div>
            <div class="option">
                <p class="option-left">您的手机号</p>
                <p class="option-right">
                    <span>{{userInfo.phone}}</span>
                </p>
            </div>
            <div class="option">
                <p class="option-left">戴者生日</p>
                <p class="option-right">
                    <picker mode="date" :value="birthday" @change="bindDateChange" placeholder="选择出生日期">
                        <view class="picker">
                        {{birthday}}
                        </view>
                    </picker>
                </p>
                <img src="/static/images/right.png" alt="">
            </div>
            <div class="option" @click="navigate('/pages/updateMail/main')">
                <p class="option-left">您的邮箱</p>
                <p class="option-right">
                    <span>{{userInfo.email}}</span>
                </p>
                <img src="/static/images/right.png" alt="">
            </div>
            <div class="option">
                <p class="option-left">您的地区</p>
                <picker mode="region" @change="bindRegionChange" :value="region">
                    <p class="picker">
                     {{region[0]}}，{{region[1]}}，{{region[2]}}
                    </p>
                </picker>
                <img src="/static/images/right.png" alt="">
            </div>
            <div class="option" @click="navigate('/pages/updateTopic/main')">
                <p class="option-left">感兴趣的话题</p>
                <p class="option-right">
                    <span>{{userInfo.topics}}</span>
                </p>
            </div>
        </div>
        <div class="img">
            <img src="/static/images/img2.png" alt="">
        </div>
    </div>
</template>
<script>
import { getUserInfo, updateInfo } from '@/api/api'
import { formatDate, toast } from '@/utils/index'
export default {
    data(){
        return {
            birthday: '请选择出生日期',
            region: ['北京市', '北京市', '东城区'],
            userInfo: null,
        }
    },
    onShow(){
        this.queryUserInfo()
    },
    methods: {
        /**
         * 选择日期
         */
        bindDateChange(value){
            this.birthday = value.target.value
            this.saveInfo()
        },

        bindRegionChange: function (e) {
            this.region = e.mp.detail.value
            this.saveInfo()
        },

        /**
         * 获取用户信息
         */
        async queryUserInfo(){
            const { data } = await getUserInfo()
            this.userInfo = data.data.userInfo
            this.region = this.userInfo.address.split(',')
            this.birthday = this.userInfo.birthday
        },

        /**
         * 页面跳转
         */
        navigate(url){
            wx.navigateTo({ url: url });
        },

        /**
         * 保存修改信息
         */
        async saveInfo(){
            const { data } = await updateInfo({birthday: this.birthday, address: this.region.join(',')})
            if(data.code == 0){
                toast('修改成功！')
                this.queryUserInfo()
            }
        },
    }
}
</script>

<style lang="less">
page {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.nextPage {
    width: 100%;
    height: 100%;
    padding: 30rpx 30rpx 0 30rpx;
    box-sizing: border-box;
    background: #FFFFFF;
    overflow: hidden;
    &-content {
        width: 100%;
        height: auto;
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
            margin-bottom: 40rpx;
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
                color: #485155;
                flex: 1;
                .picker {
                    width: 100%;
                    text-align: right;
                }
            }
            &-right {
                font-size: 28rpx;
                flex: 1;
                height: 100%;
                text-align: right;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .picker {
                    color: #485155;
                }
                input {
                    text-align: right;
                }
                .head {
                    width: 76rpx;
                    height: 76rpx;
                    border-radius: 38rpx;
                }
                span {
                    max-width: 100%;
                    color: #485155;
                    font-size: 28rpx;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                    overflow: hidden;
                }
            }
            image {
                width: 12rpx;
                height: 22rpx;
                margin-left: 20rpx;
            }
        }
    }
    .img {
        width: 100%;
        height: 326rpx;
        position: absolute;
        bottom: 0;
        left: 0;
        image {
            width: 100%;
            height: 100%;
        }
    }
}
</style>

