<template>
    <div class="nextPage">
        <div class="nextPage-content">
            <div class="option">
                <p class="option-left">LensID</p>
                <p class="option-right">
                    <input type="text" v-model="LensCode" placeholder-style="color:rgba(23,89,117,0.6)" :placeholder="len">
                </p>
            </div>
            <div class="option">
                <p class="option-left">验证码</p>
                <p class="option-right">
                    <input type="number" v-model="code" placeholder-style="color:rgba(23,89,117,0.6)" placeholder="请输入验证码">
                </p>
                <p class="code">{{code1}}</p>
            </div>
            <div class="option">
                <p class="option-left">姓名</p>
                <p class="option-right">
                    <input type="text" v-model="name" placeholder-style="color:rgba(23,89,117,0.6)" :placeholder='len1'>
                </p>
            </div>
        </div>
        <div class="nextPage-btn">
            <p class="nextPage-btn-in" @click="submitInfo">查询</p>
        </div>
        <!-- <p class="tip">如果您输入激光编码后,系统显示如下内容:<br> 您购买到欧几里德角膜塑形镜，
            可通过查询镜片上以EC开头的六位（或七位）激光编码辨别其真伪。<br> 
            如果您的镜片上没有激光编码,那么您的镜片不是欧几里德生成的,请立即联系当地工商局;<br>
            如果您输入激光编码后,系统显示如下内容：<br><span v-if="checkName">这是正品欧几里德镜片，您在系统中登记的姓名为：{{checkName}}</span>
        </p> -->
        <p class="tip">
            欧几里德角膜塑形镜为定制化生产，可通过产品唯一ID验证真伪。<br>
            Lens ID为镜片信封包装背面标签或内部保真卡上的6位（或7位）数字编码。<br>
            验真时需输入EC或ESC+空格+数字编码。<br>
            如您购买到的是欧几里德正品镜片，输入ID后系统将显示：<br>
            <span style="color:#00AFF0">这是正品欧几里德镜片，您在系统中登记的姓名为：____。</span><br>
            如显示其他内容，请拨打我们的热线电话400-820-3712
        </p>
        <div class="img">
            <img src="/static/images/img2.png" alt="">
        </div> 
        <div class="modal-bg"  @touchmove.prevent v-if="showModal">
            <div class="modal" :animation="animationData">
                <div class="modal-title">尊敬的客户</div>
                <!-- 弹窗内容 -->
                <div class="modal-content">
                    <p class="modal-content-info">
                        这是正品欧几里德镜片<br> 您在系统中登记的姓名为 <br>
                        <span style="color:#00AFF0">{{checkName}}</span> <br>
                        您的订单日期为：<br> {{orderDate}}
                    </p>
                </div>
                <div class="modal-btn" @click="goRecord">确定</div>
            </div>
        </div>
        <div class="modal-bg"  @touchmove.prevent v-if="showModal1">
            <div class="modal" :animation="animationData">
                <div class="modal-title">尊敬的客户</div>
                <!-- 弹窗内容 -->
                <div class="modal-content">
                    <p class="modal-content-info">抱歉，验证失败，您输入的 <br><span style="color:#ED7D30" >订单ID</span>或<span style="color:#ED7D30">激光防伪码</span>有误。<br>请确认后重新输入。<br> <span>如有疑问，请致电400-820-3712 </span></p>
                </div>
                <div class="modal-btn" @click="showModal1 = false">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
import { checkManagement, getCode1 } from '@/api/api'
import { mapState } from 'vuex'
import { toast } from '@/utils/index'
export default {
    data(){
        return {
            showModal: false,
            showModal1: false,
            LensCode: '',
            code: '',
            name: '',
            checkName: '',
            code1: null,
            animationData: null,
            orderDate: null,
            len: '如"ESC 1234567"',
            len1: '如"王明美"，输入"WangMM"'
        }
    },
    computed: {
        ...mapState([
            'checkInfo'
        ])
    },
    onShow(){
        this.queryCode()
            this.LensCode = '',
            this.code = '',
            this.name = '',
            this.checkName = '',
            this.code1 = null
    },
    methods: {
        /**
         * 提交验证信息
         */
        async submitInfo(){
            if(!this.LensCode) {toast('请输入lensId!') ;return}
            if(!this.name) {toast('请输入姓名拼音!') ;return}
            if(!this.code) {toast('请输入验证码!') ;return}
            if(this.code != this.code1) {toast('验证码不正确!') ;return}
            let param = {
                city: this.checkInfo.region,
                datetime: this.checkInfo.birthday,
                relation: this.checkInfo.relationVal,
                wearerAge: this.checkInfo.age,
                lensId: this.LensCode,
                pinyinName: this.name,
                code: this.code
            }
            const { data } = await checkManagement(param)
            if(data.code === 0){
                this.checkName = data.data.checkManagement.patientName
                this.orderDate = data.data.checkManagement.orderDate
                if(this.checkName){
                    // this.showModal = true
                    this.showModalInfo(1)
                }
            } else if(data.code == 418) {
                toast(data.msg)
            } else {
                // this.showModal1 = true
                this.showModalInfo(2)
            }
        },

        /**
         * 获取验证码
         */
        async queryCode(){
            const { data } = await getCode1()
            this.code1 = data.data.string
        },

        /**
         * 跳转到记录页面
         */
        goRecord(){
            this.showModal = false
            this.navigate('/pages/checkRecords/main')
        },

        /**
         * 页面跳转
         */
        navigate(url){
            wx.navigateTo({ url: url });
        },

        /**
         * 显示模态框
         */
        showModalInfo(type){
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
            if(type == 1){
                 _this.showModal = !_this.showModal
            } else if(type == 2){
                 _this.showModal1 = !_this.showModal1
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
                width: 130rpx;
            }
            &-right {
                font-size: 28rpx;
                flex: 1;
                text-align: right;
                input {
                    text-align: left;
                    padding-left: 40rpx;
                }
            }
            .code {
                width: 148rpx;
                height: 64rpx;
                border-radius: 32rpx;
                background: #ECECEC;
                font-size: 28rpx;
                color: #485155;
                text-align: center;
                line-height: 64rpx;
            }
        }
    }
    .tip {
        font-size: 24rpx;
        color: #96A0A4;
        line-height: 38rpx;
        font-weight: 400;
        position: absolute;
        z-index: 1001;
        span {
            color: #39AFAA
        }
    }
    &-btn {
        width: 100%;
        height: 88rpx;
        display: flex;
        justify-content: center;
        margin-top: 60rpx;
        margin-bottom: 60rpx;
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
            // height: 292rpx;
            padding-top: 40rpx;
            box-sizing: border-box;
            .modal-title {
                font-size: 32rpx;
                color: #04212E;
                font-weight: 400;
            }
            .modal-content {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 42rpx 84rpx;
                box-sizing: border-box;
                border-bottom: 1rpx #C6D1D5 solid;
                &-info {
                    font-size: 28rpx;
                    color: #575C5F;
                    font-weight: 400;
                    line-height: 40rpx;
                }
            }
            &-btn {
                width: 100%;
                height: 88rpx;
                line-height: 88rpx;
                font-size: 32rpx;
                font-weight: 500;
                color: #175975;
            }
        }
    }
}
</style>

