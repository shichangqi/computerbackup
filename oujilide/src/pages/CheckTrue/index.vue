<template>
    <div class="CheckTrue">
        <div class="CheckTrue-content">
            <div class="option">
                <p class="option-left">您购买角塑镜的城市</p>
                <picker mode="region" @change="bindRegionChange" :value="region">
                    <p class="picker">
                     {{region[0]}} {{region[1]}} {{region[2]}}
                    </p>
                </picker>
                <img src="/static/images/right.png" alt="">
            </div>
            <div class="option">
                <p class="option-left">本副镜片开始佩戴日期</p>
                <p class="option-right">
                    <picker mode="date" :value="birthday" @change="bindDateChange" placeholder="">
                        <view class="picker">
                        {{birthday}}
                        </view>
                    </picker>
                </p>
                <img src="/static/images/right.png" alt="">
            </div>
            <div class="option">
                <p class="option-left">您是佩戴者的</p>
                <p class="option-right">
                    <picker :value="relation" @change="relationChange" :range="relationList" >
                        <view class="picker" v-if="relation != '请选择'">{{relationList[relation]}}</view>
                        <view class="picker" v-else>请选择</view>
                    </picker>
                </p>
                <img src="/static/images/right.png" alt="">
            </div>
            <div class="option">
                <p class="option-left">佩戴者年龄</p>
                <p class="option-right">
                    <input type="number" v-model="age" placeholder-style="color:rgba(23,89,117,0.6)" placeholder="请输入佩戴者年龄">
                </p>
                <img src="/static/images/right.png" alt="">
            </div>
            <p class="tip">*请您如实填写本页面信息，这将有助于我们为您提供更好的服务。感谢您的配合，我们会对信息进行保密处理，确保您的信息安全！</p>
        </div>
        <div class="CheckTrue-btn">
            <p class="CheckTrue-btn-in" @click="nextStep">下一步</p>
        </div>
        <div class="img">
            <img src="/static/images/img2.png" alt="">
        </div>
    </div>
</template>
<script>
import { checkManagement } from '@/api/api'
import { toast } from '@/utils/index'
import { mapState } from 'vuex'
export default {
    data(){
        return {
            birthday: '请选择',
            region: ['北京市', '北京市', '东城区'],
            relationList: ['本人','父亲', '母亲', '兄弟', '姐妹', '祖辈', '其他'],
            relation: '请选择',
            relationVal: null,
            age: ''
        }
    },
    onShow(){
        this.birthday = '请选择'
        this.relation = '请选择',
        this.relationVal = null,
        this.age = ''
    },
    computed: {
        ...mapState([
            'checkInfo'
        ])
    },
    methods: {
        /**
         * 选择日期
         */
        bindDateChange(value){
            this.birthday = value.target.value
        },

        bindRegionChange: function (e) {
            console.log(e)
            this.region = e.mp.detail.value
        },

        relationChange: function (e) {
            this.relation = parseInt(e.mp.detail.value)
            this.relationVal = this.relationList[this.relation]
        },

        /**
         * 下一步
         */
        nextStep(){
            if(this.birthday == '请选择') {toast('请选择日期!') ;return}
            if(!this.relationVal) {toast('请选择和佩戴者的关系!') ;return}
            if(!this.age) {toast('请输入年龄!') ;return}
            if(this.age < 8 || this.age > 40) {toast('请输入有效的年龄范围(8-40岁)!','none', 3000) ;return}
            let obj = {
                relationVal: this.relationVal,
                birthday: this.birthday,
                region: this.region.join(','),
                age: this.age
            }
             this.$store.commit('checkInfo', obj)
             this.navigate('/pages/CheckTrueNext/main')
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
    overflow: hidden;
}
.CheckTrue {
    width: 100%;
    height: 100%;
    padding: 30rpx 30rpx 0 30rpx;
    box-sizing: border-box;
    background: #FFFFFF;
    overflow: hidden;
    position: relative;
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
                .picker {
                    color: rgba(23,89,117,0.6);
                }
                input {
                    text-align: right;
                }
            }
            image {
                width: 12rpx;
                height: 22rpx;
                margin-left: 20rpx;
            }
        }
        .tip {
            font-size: 24rpx;
            color: #39AFAA;
            line-height: 34rpx;
            font-weight: 400;
        }
    }
    &-btn {
        width: 100%;
        height: 88rpx;
        display: flex;
        justify-content: center;
        margin-top: 60rpx;
        position: absolute;
        bottom: 310rpx;
        z-index: 999;
        padding-right: 30rpx;
        box-sizing: border-box;
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

