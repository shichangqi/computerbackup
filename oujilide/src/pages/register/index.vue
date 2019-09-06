<template>
    <div class="register">
        <div class="register-content">
            <div class="register-content-left">
                <input type="number" v-model="formData.mobile" placeholder-style="color:rgba(23,89,117,.38);"  placeholder="请输入手机号">
                <input type="number" v-model="formData.code" placeholder-style="color:rgba(23,89,117,.38);" placeholder="请输入验证码">
            </div>
            <div class="register-content-right">
                <p class="register-content-right-in" v-if="show" @click="sendCode">获取验证码</p>
                <p class="register-content-right-count" v-else>{{count}}″</p>
            </div>
        </div>
        <div :class="[{active:showNext == true},'register-btn']">
            <p class="register-btn-in" @click="nextStep">下一步</p>
        </div>
        <div class="img"><img src="/static/images/img1.png" alt=""></div>
        <!-- 协议弹框 -->
            <div class="modal-bg" v-if="showModal">
                <div class="modal"  @touchmove.prevent>
                    <div class="modal-img">
                        <img src="/static/images/bg6.png" alt="">
                    </div>
                    <!-- 弹窗内容 -->
                    <div class="modal-content">
                        <p class="modal-content-title">欧几里德知情同意书</p>
                        <p class="modal-content-detail">
                            <wxParse :content="notification"/>
                        </p>
                        <div class="modal-content-btn">
                            <p class="btnin" @click="consent"><span v-if="count1 > 0">({{count1}})</span> 我同意欧几里德知情同意</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
import { getCode, submitFirstRegister, system } from '@/api/api'
import { toast } from '@/utils/index'
import wxParse from 'mpvue-wxparse'
export default {
  components: {
    wxParse
  },
    data(){
        return {
            showNext: false,  //是否显示下一步
            show: true,  //是否显示倒计时
            count: '',  //倒计时秒数
            timer: null,  //倒计时
            formData: {
                mobile: null, //手机号
                code: null,  //验证码
            },
            showModal: true,
            count1: '',  //倒计时秒数
            timer1: null,  //倒计时
            notification: ''
        }
    },
    watch: {
        /**
         * 验证手机号和验证码都有值
         */
        formData: {
            handler(newVal,oldVal){
                if((/^1[23456789]\d{9}$/.test(this.formData.mobile)) && this.formData.code){
                    this.showNext = true
                } else {
                    this.showNext = false
                }
            },
            deep: true
        }
    },
    onShow(){
        this.getSystem()
    },
    methods: {
        /**
         * 获取手机验证码接口
         */
        sendCode(){
            if(!this.formData.mobile) {toast('请输入手机号!') ;return}
            if((/^1[23456789]\d{9}$/.test(this.formData.mobile))){
                getCode({
                    mobile:this.formData.mobile,
                }).then(res=>{
                    if(res.data.code == 0){
                        //倒计时
                        this.countDown()
                    } else {
                        toast(res.data.msg)
                    }
                })
            } else {
                toast('手机号格式不正确!')
            }
        },

        /**
         * 倒计时
         */
        countDown(){
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
        },

        /**
         * 同意书倒计时
         */
        countDown1(){
            const TIME_COUNT = 10;
            if (!this.timer1) {
                this.count1 = TIME_COUNT;
                this.modal = false;
                this.timer1 = setInterval(() => {
                    if (this.count1 > 0 && this.count1 <= TIME_COUNT) {
                        this.count1--;
                    } else {
                        this.modal = true;
                        clearInterval(this.timer1);
                        this.timer1 = null;
                    }
                }, 1000)
            }
        },

        /**
         * 确认通知书
         */
        consent(){
            if(this.count1 > 0)  return
            this.showModal = false
        },

        /**
         * 获取通知书
         */
        async getSystem(){
            const { data } = await system()
            this.notification = data.data.sysNotification.notification
            this.countDown1()
        },

        /**
         * 下一步
         */
        async nextStep(){
            const { data } = await submitFirstRegister({phone: this.formData.mobile, phoneCode: this.formData.code})
            if(data.code === 0){
                if(data.data.integer == 3){
                    this.navigate(`/pages/nextStep/main?phone=${this.formData.mobile}`)
                } else {
                    // this.navigate('/pages/personalCenter/main')
                    wx.reLaunch({url: '/pages/personalCenter/main'})
                }
            } else {
                toast(data.msg)
            }
        },

        /**
         * 获取用户信息
         */
        async queryUserInfo(){
            const { data } = await getUserInfo()
            console.log(data)
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
@import url("~mpvue-wxparse/src/wxParse.css");
page {
    width: 100%;
    height: 100%;
}
.register {
    width: 100%;
    height: 100%;
    padding-top: 40rpx;
    box-sizing: border-box;
    overflow: hidden;
    &-content {
        width: 100%;
        padding: 0 60rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        &-left {
            width: 410rpx;
            font-size: 28rpx;
            input {
                width: 100%;
                height: 80rpx;
                line-height: 80rpx;
                border-bottom: 2rpx #175975 solid;
                margin-bottom: 20rpx;
                color: #175975;
            }
        }
        &-right {
            width: 184rpx;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 16rpx;
            box-sizing: border-box;
            &-in {
                width: 100%;
                height: 64rpx;
                font-size: 24rpx;
                color: #175975;
                border-radius: 36rpx;
                text-align: center;
                line-height: 64rpx;
                box-shadow:0px 0px 10rpx 0px rgba(172,168,168,1);
            }
            &-count {
                width: 100%;
                height: 64rpx;
                font-size: 24rpx;
                color: #175975;
                border-radius: 36rpx;
                text-align: center;
                line-height: 64rpx;
                box-shadow:0px 0px 10rpx 0px rgba(172,168,168,1);
                opacity: .3;
            }
        }
    }
    &-btn {
        width: 240rpx;
        height: 88rpx;
        box-shadow:0px 0px 10rpx 0px rgba(172,168,168,1);
        border-radius:44rpx;
        font-size: 32rpx;
        color: #FFF;
        background:#39B1AC;
        opacity: 0.2;
        text-align: center;
        line-height: 88rpx;
        margin-left: 60rpx;
        margin-top: 30rpx;
    }
    .active {
        width:240rpx;
        height:88rpx;
        background:rgba(57,177,172,1);
        box-shadow:0px 0px 10rpx 0px rgba(172,168,168,1);
        border-radius:44rpx;
        opacity: 1;
    }
    .img {
        width: 100%;
        height: 680rpx;
        image {
            width: 100%;
            height: 100%;
            margin-top: 84rpx
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
            width: 644rpx;
            height: 80%;
            background: #fff;
            text-align: center;
            border-radius: 10rpx;
            padding: 48rpx 36rpx 36rpx 36rpx;
            box-sizing: border-box;
            position: relative;
            &-img {
                width: 100%;
                height: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
            }
            &-content {
              width: 100%;
              box-sizing: border-box;
              height: 100%;
              overflow: hidden;
              position: absolute;
              bottom: 0;
              left: 0;
              padding: 50rpx 30rpx;
              &-title {
                  width: 100%;
                  font-size: 32rpx;
                  color: #175975;
                  text-align: center;
                  font-weight: 500;
                  text-align: center;
                  margin-bottom: 30rpx;
              }
              &-detail {
                  width: 100%;
                  overflow-y: scroll;
                  height: 80%;
                  font-size: 28rpx;
                  color: #485155;
                  line-height: 40rpx;
                  -webkit-overflow-scrolling: touch;
              }
              &-btn {
                  width: 100%;
                  height: 88rpx;
                  margin-top: 40rpx;
                  display: flex;
                  justify-content: center;
                  .btnin {
                      width: 500rpx;
                      height: 100%;
                        background:rgba(57,177,172,1);
                        box-shadow:0rpx 0rpx 10rpx 0rpx rgba(172,168,168,1);
                        border-radius:44rpx;
                        font-size: 28rpx;
                        color: #FFF;
                        font-weight: 500;
                        text-align: center;
                        line-height: 88rpx;
                  }
              }
            }
        }
    }
}
</style>

