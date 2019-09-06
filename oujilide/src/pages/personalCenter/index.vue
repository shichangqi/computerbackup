<template>
    <div class="personalCenter" v-if="userInfo">
        <div class="personalCenter-bg">
            <img src="/static/images/bg.png" alt="">
        </div>
        <div class="personalCenter-content">
            <div class="personalCenter-content-top">
                <div class="headurl">
                    <img :src="userInfo.headImg" alt="">
                </div>
                <p class="name">{{userInfo.nickName}}</p>
                <div class="right" @click="navigate('/pages/personalData/main')">
                    <span>个人资料</span>
                    <img src="/static/images/right2.png" alt="">
                </div>
            </div>
            <div class="personalCenter-content-detail">
                <div class="option" @click="navigate('/pages/CheckTrue/main')">
                    <p class="option-icon">
                        <img src="/static/images/icon1.png" alt="">
                    </p>
                    <p class="option-title">镜片验真</p>
                </div>
                <div class="option" @click="navigate('/pages/checkRecords/main')">
                    <p class="option-icon">
                        <img src="/static/images/icon2.png" alt="">
                    </p>
                    <p class="option-title">验真纪录</p>
                </div>
                <div class="option" @click="navigate('/pages/QA/main')">
                    <p class="option-icon">
                        <img src="/static/images/icon3.png" alt="">
                    </p>
                    <p class="option-title">Q&A</p>
                </div>
                <div class="option"  @click="showModalInfo">
                    <p class="option-icon">
                        <img src="/static/images/icon4.png" alt="">
                    </p>
                    <p class="option-title">了解更多</p>
                </div>
            </div>
        </div>
        <div class="modal-bg"  @touchmove.prevent v-if="showModal" @click="showModalInfo">
            <div class="modal" :animation="animationData" @click.stop>
                <!-- 弹窗内容 -->
                <div class="modal-content" @click.stop>
                    <div class="modal-content-bg">
                        <img src="/static/images/bg4.png" alt="">
                    </div>
                    <div class="modal-content-detail">
                        <p class="tit">2019更多会员活动敬请期待，退出小程序，返回欧几里德健康视界了解更多爱眼知识</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getUserInfo } from '@/api/api'
export default {
    data(){
        return {
            showModal: false,  //了解更多弹框
            userInfo: null,  //用户信息
            animationData: null
        }
    },
    onShow(){
        this.queryUserInfo()
    },
    methods: {
        /**
         * 页面跳转
         */
        navigate(url){
            wx.navigateTo({ url: url });
        },

        /**
         * 获取用户信息
         */
        async queryUserInfo(){
            const { data } = await getUserInfo()
            this.userInfo = data.data.userInfo
        },

        /**
         * 显示模态框
         */
        showModalInfo(){
            var _this = this;
            // 创建一个动画实例
            var animation  = wx.createAnimation({
            // 动画持续时间
                duration:800,
                // 定义动画效果，当前是匀速
                timingFunction:'ease',
                delay: 0
            })
            // 将该变量赋值给当前动画
           
            _this.animation = animation
            // 先在y轴偏移，然后用step()完成一个动画
            // animation.scale(2).step();
            // 通过export()方法导出数据
            // _this.animationData =  animation.export(),
            animation.opacity(0).step();
            _this.animationData = animation.export()
            // 改变view里面的Wx：if
            // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
            setTimeout(function(){
                // animation.translateY(0).step()
                
                animation.opacity(1).step();
                _this.animationData =  animation.export()
            },0)

            _this.showModal = !_this.showModal
        },
    }
}
</script>

<style lang="less">
page {
    width: 100%;
    height: 100%;
}
.personalCenter {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    &-bg {
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
    &-content {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 30rpx ;
        box-sizing: border-box;
        &-top {
            width: 100%;
            height: 140rpx;
            display: flex;
            align-items: center;
            margin-bottom: 60rpx;
            .headurl {
                width: 140rpx;
                height: 140rpx;
                margin-right: 30rpx;
                image {
                    width: 100%;
                    height: 100%;
                    border-radius: 70rpx
                }
            }
            .name {
                flex: 1;
                font-size: 32rpx;
                color: #175975;
                font-weight: 400
            }
            .right {
                width: 160rpx;
                height: 100%;
                font-size: 28rpx;
                color: #39AFAA;
                font-weight: 400;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                image {
                    width: 14rpx;
                    height: 26rpx;
                    margin-left: 16rpx;
                }
            }
        }
        &-detail {
            width: 100%;
            height: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            .option {
                width: 294rpx;
                height: 294rpx;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 42rpx;
                box-shadow:0rpx 0rpx 10rpx 0rpx rgba(172,168,168,1);
                border-radius:12rpx;
                padding: 64rpx 0;
                box-sizing: border-box;
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
                    color: #39AFAA
                }
            }
        }
    }
    .modal-bg {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #000;
        background: rgba(0, 0, 0, 0.6);
        z-index: 8888;
        .modal {
            width: 552rpx;
            background: #fff;
            text-align: center;
            border-radius: 12rpx;
            height: 400rpx;
            box-sizing: border-box;
            position: relative;
            .modal-content {
                width: 100%;
                height: 100%;
                &-bg {
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
                &-detail {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    bottom: 0;
                    left: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 70rpx;
                    box-sizing: border-box;
                    padding-left: 40rpx;
                    padding-right: 40rpx;
                    .erCode {
                        width: 338rpx;
                        height: 338rpx;
                        image {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .tit {
                        font-size: 30rpx;
                        color: #175975;
                        font-weight: 500;
                        margin-top: 40rpx;
                    }
                }
            }
        }
    }
}
</style>

