<template>
    <div class="QA">
        <div class="QA-top">
            <img src="/static/images/bg3.png" alt="">
        </div>
        <div class="QA-content">
            <ul class="ulLi">
                <li v-for="(item, index) in typeList" :class="{active: nowType == item.id}"  @click="changeType(item.id)" :key="index">{{item.name}}</li>
            </ul>
            <div class="list">
                <div class="list-li" v-for="(item, index) in list" :key="index" @click="goDetail(item.id)">
                    <p class="list-li-left">{{item.name}}</p>
                    <p class="list-li-right">
                        <img src="/static/images/right.png" alt="">
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { questionList, listById } from '@/api/api'
import { toast } from '@/utils/index'
export default {
    data(){
        return {
            typeList: [],
            nowType: null,
            list: []
        }
    },
    onLoad(){
        this.queryList()
    },
    methods: {
        /**
         * 查询所有的类别
         */
        async queryList(){
            const { data } = await questionList()
            if(data.code === 0){
                this.typeList = data.data.arrayList
                this.nowType = this.typeList[0].id
                this.queryQuestion()
            }
        },

        /**
         * 根据id查询题目
         */
        async queryQuestion(){
            const { data } = await listById({id: this.nowType})
            if(data.code === 0){
                this.list = data.data.arrayList
            }
        },

        /**
         * 切换类型
         */
        changeType(type){
            if(this.nowType === type) return
            this.nowType = type
            this.queryQuestion()
        },

        /**
         * 查看问题答案
         */
        goDetail(id){
            this.navigate('/pages/questionDetail/main?id=' + id)
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
.QA {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    &-top {
        width: 100%;
        height: 592rpx;
        image {
            width: 100%;
            height: 100%;
        }
    }
    &-content {
        width: 100%;
        padding: 0 30rpx;
        box-sizing: border-box;
        .ulLi {
            width: 100%;
            height: 88rpx;
            display: flex;
            align-items: center;
            overflow-x: scroll;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            li {
                font-size: 32rpx;
                color: #575C5F;
                margin-right: 40rpx;
            }
            .active {
                color: #0097D6;
            }
        }
        .list {
            width: 100%;
            margin-top: 40rpx;
            &-li {
                width: 100%;
                height: 100rpx;
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
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                    overflow: hidden;
                    flex: 1;
                }
                &-right {
                    width: 12rpx;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    image {
                        width: 100%;
                        height: 22rpx;
                    }
                }
            }
        }
    }
}
</style>

