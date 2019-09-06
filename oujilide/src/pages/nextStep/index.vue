<template>
    <div class="nextPage">
        <div class="img">
            <img src="/static/images/img2.png" alt="">
        </div>
        <div class="nextPage-content">
            <div class="option">
                <p class="option-left">戴者生日</p>
                <p class="option-right">
                    <picker mode="date" :value="birthday" :start="start" :end="end" @change="bindDateChange" placeholder="选择出生日期">
                        <view class="picker">
                        {{birthday}}
                        </view>
                    </picker>
                </p>
                <img src="/static/images/right.png" alt="">
            </div>
            <div class="option">
                <p class="option-left">您的邮箱</p>
                <p class="option-right">
                    <input type="email" v-model="email" placeholder-style="color:rgba(23,89,117,0.6)" placeholder="请输入您的邮箱">
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
            <div class="interest">
                <p class="interest-title">您感兴趣的话题</p>
                <ul class="interest-list">
                     <li v-for="(item, index) in topic" :key="index" @click="changeStatus(index)" :class="{active: item.status}">{{item.tipic}}</li>
                </ul>
            </div>
            <div class="nextPage-content-btn">
                <p class="nextPage-content-btn-in" @click="submitInfo">提交注册</p>
            </div>
        </div>
    </div>
</template>
<script>
import { getTopic, submitSecondRegister } from '@/api/api'
import { toast } from '@/utils/index'
export default {
    data(){
        return {
            birthday: '请选择出生日期',
            region: ['北京市', '北京市', '东城区'],
            email: null,
            topic: [],  //话题列表
            chooseTopic: null,
            address: null,
            start: null,
            end: null
        }
    },
    watch: {

    },
    onLoad(){
        this.getTimeInfo()
        this.queryAllTopic()
    },
    methods: {

        /**
         * 获取起始时间
         */
        getTimeInfo(){
            let date = new Date()
            let year = date.getFullYear()
            this.start = parseInt(year) - 40
            this.end = parseInt(year) - 8
        },

        /**
         * 选择日期
         */
        bindDateChange(value){
            this.birthday = value.target.value
        },

        bindRegionChange: function (e) {
            this.region = e.mp.detail.value
        },

        /**
         * 根据下标改变状态
         */
        changeStatus(index){
            for (var i = 0; i < this.topic.length; i++) {
                if(i === index){
                    this.topic[i].status = !this.topic[i].status
                    break;
                }
            }
        },

        /**
         * 提交时 获取所有勾选的话题
         */
        getChoose(){
            let newArr = []
            this.topic.forEach(element => {
                if(element.status){
                    newArr.push(element.tipic)
                }
            });
            this.chooseTopic = newArr.join(',')
        },

        /**
         * 获取所有话题
         */
        async queryAllTopic(){
            const { data } = await getTopic()
            let array = data.data.arrayList
            array.forEach(element => {
                element.status = false
            });
            this.topic = array
        },

        /**
         * 提交注册信息
         */
        async submitInfo(){
            if(this.birthday == '请选择出生日期') {toast('请选择出生日期!') ;return}
            if(this.age < 8 || this.age > 40) {toast('请输入有效的年龄范围(8-40岁)!','none', 3000) ;return}
            if(!this.email) {toast('请输入邮箱!') ;return}
            if(!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.email))) {toast('邮箱格式不正确!') ;return}

            this.getChoose()
            let phone = this.$mp.query.phone
            let param = {
                phone: phone,
                birthday: this.birthday,
                email: this.email,
                topics: this.chooseTopic,
                address: this.region.join(',')
            }
            const { data } = await submitSecondRegister(param)
            if(data.code === 0){
                wx.reLaunch({
                    url: '/pages/personalCenter/main'
                })
            }
        }
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
    padding: 30rpx;
    box-sizing: border-box;
    background: #FFFFFF;
    overflow: hidden;
    &-content {
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        padding: 30rpx;
        box-sizing: border-box;
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
                box-sizing: border-box;
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
                box-sizing: border-box;
                .picker {
                    color: rgba(23,89,117,0.6);
                }
                input {
                    text-align: right;
                    color: rgba(23,89,117,0.6)
                }
            }
            image {
                width: 12rpx;
                height: 22rpx;
                margin-left: 20rpx;
            }
        }
        .interest {
            width: 100%;
            max-height: 350rpx;
            padding: 40rpx 0;
            box-sizing: border-box;
            box-shadow:0rpx 0rpx 10rpx 0rpx rgba(172,168,168,1);
            border-radius:48rpx;
            overflow-y: scroll;
            &-title {
                font-size: 28rpx;
                color: #175975;
                margin-bottom: 30rpx;
                padding: 0 30rpx;
                box-sizing: border-box;
            }
            &-list {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                padding: 0 30rpx;
                box-sizing: border-box;
                li {
                    background:#ECECEC;
                    border-radius:32rpx;
                    padding: 0 30rpx;
                    box-sizing: border-box;
                    text-align: center;
                    line-height: 64rpx;
                    height: 64rpx;
                    color: #485155;
                    margin-right: 30rpx;
                    margin-bottom: 20rpx;
                    font-size: 28rpx;
                    font-weight: 500;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                    overflow: hidden;
                }
                .active {
                    color: #FFFFFF;
                    background: #39AFAA;
                }
            }
        }
        &-btn {
            width: 100%;
            height: 88rpx;
            display: flex;
            justify-content: center;
            margin-top: 40rpx;
            &-in {
                box-shadow:0rpx 0rpx 10rpx 0rpx rgba(172,168,168,1);
                border-radius:44rpx;
                width: 240rpx;
                height: 100%;
                text-align: center;
                line-height: 88rpx;
                font-size: 32rpx;
                color: #175975;
                font-weight: 500;
                box-sizing: border-box;
            }
        }
    }
    .img {
        width: 100%;
        height: 326rpx;
        position: fixed;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        image {
            width: 100%;
            height: 100%;
        }
    }
}
</style>

