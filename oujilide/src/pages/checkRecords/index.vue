<template>
    <div class="checkRecords">
        <div class="checkRecords-bg">
            <img src="/static/images/bg5.png" alt="">
        </div>
        <div class="checkRecords-content">
            <p class="checkRecords-content-icon">
                <img src="/static/images/icon5.png" alt="">
            </p>
            <p class="checkRecords-content-title">正品欧几里德镜片</p>
            <div class="checkRecords-content-detail" v-for="(item, index) in record" :key="index">
                <div class="option">
                    <p class="option-left">购买角塑镜的城市</p>
                    <p class="option-right">{{item.city}}</p>
                </div>
                <div class="option">
                    <p class="option-left">初始佩戴日期</p>
                    <p class="option-right">{{item.datetime}}</p>
                </div>
                <div class="option">
                    <p class="option-left">您是佩戴者的</p>
                    <p class="option-right">{{item.relation}}</p>
                </div>
                <div class="option">
                    <p class="option-left">佩戴者的年龄</p>
                    <p class="option-right">{{item.wearerAge}}</p>
                </div>
                <div class="option">
                    <p class="option-left">LensID</p>
                    <p class="option-right">{{item.lensId}}</p>
                </div>
                <div class="option">
                    <p class="option-left">姓名</p>
                    <p class="option-right">{{item.pinyinName || ''}}</p>
                </div>
                <div class="option">
                    <p class="option-left">查询结果</p>
                    <p class="option-right">{{item.result}}</p>
                </div>
                <div class="option">
                    <p class="option-left">登记姓名</p>
                    <p class="option-right">{{item.registerName}}</p>
                </div>
                <div class="option">
                    <p class="option-left">查询更新时间</p>
                    <p class="option-right">{{item.gmtModified}}</p>
                </div>
            </div>
        </div>
        <div class="btn" @click="navigate('/pages/personalCenter/main')">
            <img src="/static/images/home.png" alt="">
        </div>
    </div>
</template>
<script>
import { checkRecord } from '@/api/api'
import { formatTime } from '@/utils/index'
export default {
    data(){
        return {
            record: []
        }
    },
    onLoad(){
        this.queryData()
    },
    methods: {
        /**
         * 获取纪录
         */
        async queryData(){
            const { data } = await checkRecord()
            if(data.code === 0){
                let array = data.data.arrayList
                array.forEach(element => {
                    element.gmtModified = formatTime(element.gmtModified)
                    element.city = element.city.replace(/,/g, " ")
                });
                this.record = array
            }
        },

        /**
         * 页面跳转
         */
        navigate(url){
            wx.navigateTo({ url: url });
        },
    }
}
</script>

<style lang="less">
page {
    width: 100%;
    height: 100%;
}
.checkRecords {
    width: 100%;
    height: 100%;
    position: relative;
    // overflow: hidden;
    &-bg {
        width: 100%;
        height: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        image {
            width: 100%;
            height: 100%;
        }
    }
    &-content {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 40rpx 30rpx 0 30rpx ;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        &-icon {
            width: 80rpx;
            height: 80rpx;
            image {
                width: 100%;
                height: 100%;
            }
        }
        &-title {
            font-size: 32rpx;
            color: #0097D6;
            font-weight: 500;
            margin-bottom: 40rpx;
            margin-top: 20rpx;
        }
        &-detail {
            width: 100%;
            background:rgba(255,255,255,1);
            box-shadow:0rpx 0rpx 10rpx 0rpx rgba(172,168,168,1);
            border-radius:48rpx;
            padding: 40rpx 30rpx;
            box-sizing: border-box;
            margin-bottom: 40rpx;
            .option {
                width: 100%;
                display: flex;
                align-items: center;
                margin-bottom: 30rpx;
                justify-content: space-between;
                &-left {
                    font-size: 28rpx;
                    color: #175975;
                    font-weight: 500;
                }
                &-right {
                    font-size: 28rpx;
                    color: #485155;
                    font-weight: 400
                }
            }
        }
    }
    .btn {
        width: 88rpx;
        height: 88rpx;
        position: fixed;
        bottom: 168rpx;
        right: 34rpx;
        image {
            width: 100%;
            height: 100%
        }
    }
}
</style>

