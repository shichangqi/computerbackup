<template>
    <div class="updateTopic">
        <div class="updateTopic-content">
            <div class="interest">
                <p class="interest-title">您感兴趣的话题</p>
                <ul class="interest-list">
                    <li v-for="(item, index) in topic" :key="index" @click="changeStatus(index)" :class="{active: item.status}">{{item.tipic}}</li>
                </ul>
            </div>
        </div>
        <div class="updateTopic-btn">
            <p class="updateTopic-btn-in" @click="saveInfo">保存</p>
        </div>
        <div class="img">
            <img src="/static/images/img2.png" alt="">
        </div>
    </div>
</template>
<script>
import { getTopicUser, getUserInfo, updateInfo } from '@/api/api'
import { goBack } from '@/utils/index'
export default {
    data(){
        return {
            topic: [],  //话题列表
            chooseTopic: null,
            choose: []
        }
    },
    watch: {

    },
    onLoad(){
        this.queryAllTopic()
    },
    methods: {
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
         * 获取所有话题
         */
        async queryAllTopic(){
            const { data } = await getTopicUser()
            let array = data.data.userInfo.topicsManagements
            let choose = data.data.userInfo.topics.split(',')
            array.forEach(element => {
                element.status = false
                for (var i = 0; i < choose.length; i++) {
                    if(element.tipic == choose[i]){
                        element.status = true
                        break;
                    }
                }
            });
            this.topic = array
        },

        /**
         * 保存修改信息
         */
        async saveInfo(){
            this.getChoose()
            const { data } = await updateInfo({topics: this.chooseTopic})
            if(data.code == 0){
                goBack()
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
    }
}
</script>

<style lang="less">
page {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.updateTopic {
    width: 100%;
    height: 100%;
    padding: 30rpx 30rpx 0 30rpx;
    box-sizing: border-box;
    background: #FFFFFF;
    overflow: hidden;
    &-content {
        width: 100%;
        height: auto;
        .interest {
            width: 100%;
            height: auto;
            padding: 40rpx 0;
            box-sizing: border-box;
            box-shadow:0rpx 0rpx 10rpx 0rpx rgba(172,168,168,1);
            border-radius:48rpx;
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
                    max-width: 300rpx;
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
    }
    &-btn {
        width: 100%;
        height: 88rpx;
        display: flex;
        justify-content: center;
        margin-top: 60rpx;
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
        }
    }
    .img {
        width: 100%;
        height: 282rpx;
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

