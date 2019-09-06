<template>
  <div class="boschindex">
    <div class="index"v-if="curindex == 0">
      <div class="topswiper">
        <swiper  autoplay="false" interval="3000"circular="true">
          <swiper-item v-for="(i,index) in 1":key="index">
            <img src="../../static/images/swiper1.png" class="slide-image" />
          </swiper-item>
        </swiper>
      </div>

      <div class="content">
        <div class="product">
          <img v-if="isQR" :src="prodectInfo.logo" alt="" class="pro_logo_selected">
          <img v-if="isQR == false" src="../../static/images/pro_logo_sele.png" alt="" class="pro_logo_sele">
          <div class="right" v-if="isQR">
            <p class="p1">
              <!--<span class="type">iQ700</span>-->
              <span class="name"> &nbsp;{{productType}}</span></p>
            <p class="code">{{productmodal}}</p>
            <p class="helper" @tap="prohelper">产品助手&nbsp;></p>
          </div>
          <div class="notright"v-if="isQR == false">
            <p class="helper" @tap="products">产品家族&nbsp;></p>
          </div>
        </div>
      </div>

      <div class="content_type">
        <div class="tabs">
          <div class="tab" ><span v-for="(t,index) in tab" @tap="tabchange(index)" :key="index" :class="{'cur':index == current}">{{t}}</span></div>
        </div>
        <swiper :current="current" @change="swiperchange" class="bottomswiper">
          <swiper-item>
            <div class="swiper1">
              <div class="content1"v-if="!getphone">
                <div class="item" >
                  <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
                    <img src="../../static/images/swiper_icon1.png" alt="">
                    <p>安装</p>
                  </button>
                </div>
                <div class="item">
                  <button open-type="contact" @contact="handleContact" class="ibt" v-if="first"></button>
                  <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber2">
                    <img src="../../static/images/swiper_icon2.png" alt="">
                    <p>维修</p>
                  </button>
                </div>
                <div class="item"@tap="goto(2)">
                  <img src="../../static/images/swiper_icon3.png" alt="">
                  <p>设计</p>
                </div>
              </div>
              <div class="content1 content2"v-if="!getphone">
                <div class="item" >
                  <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber3">
                    <img src="../../static/images/swiper_icon4.png" alt="">
                    <p>调试</p>
                  </button>
                </div>
                <div class="item">
                  <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber4">
                    <img src="../../static/images/swiper_icon5.png" alt="">
                    <p>换门方向</p>
                  </button>
                </div>
                <div class="item">
                  <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber5">
                    <img src="../../static/images/swiper_icon6.png" alt="">
                    <p>预埋烟管</p>
                  </button>
                </div>
              </div>
              <div class="content1 content3"v-if="!getphone">
                <div class="item" >
                  <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber6">
                    <img src="../../static/images/swiper_icon7.png" alt="">
                    <p>移机</p>
                  </button>
                </div>

                <div class="item item2">
                  <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber7">
                    <img src="../../static/images/swiper_icon8.png" alt="">
                    <p>新机鉴定</p>
                  </button>
                </div>
              </div>

              <div class="content1" v-if="getphone">
                <div class="item" @tap="goto(0)">
                  <img src="../../static/images/swiper_icon1.png" alt="">
                  <p>安装</p>
                </div>
                <div class="item"@tap="goto(1)">
                  <button open-type="contact" @contact="handleContact" class="ibt" v-if="first"></button>
                  <img src="../../static/images/swiper_icon2.png" alt="">
                  <p>维修</p>
                </div>
                <div class="item"@tap="goto(2)">
                  <img src="../../static/images/swiper_icon3.png" alt="">
                  <p>设计</p>
                </div>
              </div>
              <div class="content1 content2"v-if="getphone">
                <div class="item" @tap="goto(3)">
                  <img src="../../static/images/swiper_icon4.png" alt="">
                  <p>调试</p>
                </div>
                <div class="item"@tap="goto(4)">
                  <img src="../../static/images/swiper_icon5.png" alt="">
                  <p>换门方向</p>
                </div>
                <div class="item"@tap="goto(5)">
                  <img src="../../static/images/swiper_icon6.png" alt="">
                  <p>预埋烟管</p>
                </div>
              </div>
              <div class="content1 content3"v-if="getphone">
                <div class="item" @tap="goto(6)">
                  <img src="../../static/images/swiper_icon7.png" alt="">
                  <p>移机</p>
                </div>
                <div class="item item2" @tap="goto(10)">
                  <img src="../../static/images/swiper_icon8.png" alt="">
                  <p>新机鉴定</p>
                </div>
              </div>
            </div>
          </swiper-item>
          <swiper-item>
            <div class="swiper1">
              <div class="content1 content4">
                <div class="item"@tap="goto(7)">
                  <img src="../../static/images/swiper_icon9.png" alt="">
                  <p>包修规定</p>
                </div>
                <div class="item item2"@tap="goto(8)">
                  <img src="../../static/images/swiper_icon10.png" alt="">
                  <p>收费政策</p>
                </div>
                <!--<div class="item"@tap="goto(9)">-->
                <!--<img src="../../static/images/swiper_icon11.png" alt="">-->
                <!--<p>说明书</p>-->
                <!--</div>-->
              </div>
            </div>
          </swiper-item>
        </swiper>
      </div>
    </div>
    <mine v-if="curindex ==2" ></mine>
    <div class="bottom">
      <div class="item" v-for="(bt,index) in bottomtab" :key="index" :class="{'active':curindex == index}">
        <button open-type="contact" @contact="handleContact" class="iboot" v-if="index == 1"></button>
        <img :src="bt.selected ? bt.selectedurl:bt.imgurl" :class="{'kefu':index == 1}" @tap="target(index)">
        <p @tap="target(index)">{{bt.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {navigate} from "../../utils/index";
  import {getUserInfo,getToken,bindProduct,getUserredis,getUserPhone,gethourchat} from "../../api/api";
  import mine from '../mine/index'
  export default {
    components:{
      mine
    },
    name: "index",
    data(){
      return{
        isQR:false,
        current:0,
        tab:['预约服务','自助查询'],
        bottomtab:[
          {
            imgurl:'../../static/images/tabselect1.png',
            selectedurl:'../../static/images/tabselected1.png',
            text:'主页',
            selected:true
          },
          {
            imgurl:'../../static/images/tabselect2.png',
            selectedurl:'../../static/images/tabselected2.png',
            text:'客服',
            selected:false
          },
          {
            imgurl:'../../static/images/tabselect3.png',
            selectedurl:'../../static/images/tabselected3.png',
            text:'我的',
            selected:false
          }
        ],
        prodectInfo:{},
        productmodal:'',
        productType:'',
        productId:0,
        first:true,
        getphone:false,
        curindex:0
      }
    },

    onShow(){
      let _this= this;
      Object.assign(this.$data, this.$options.data());
      this.curindex = this.$store.getters.tab
      this.bottomtab[0].selected = true
      this.bottomtab[1].selected = false
      this.bottomtab[2].selected = false
      if(this.curindex == 2){
        this.bottomtab.forEach((item,i)=>{
          if(i == 2){
            this.bottomtab[2].selected = true;
          }else{
            this.bottomtab[i].selected = false;
          }
        })
      }
      this.extraData =  wx.getStorageSync('extraData')
      if(this.extraData.type == 1){
        this.productType = this.extraData.name;
        this.productmodal = this.extraData.vib;
        this. prodectInfo.logo = this.extraData.logo
        this.isQR = true
      } else{
        this.isQR = false

      }
      wx.showLoading({title: '加载中',mask: true})

      getUserInfo().then(res=>{
        if(res.data.mobile != undefined && res.data.mobile != ''){
          this.getphone = true;
          wx.setStorageSync('phone', res.data.mobile)

        }else{
          this.getphone = false;
        }
        wx.setStorageSync('head', res.data.headimgurl)
        wx.setStorageSync('nickname', res.data.nickname)
      });
      // getUserredis().then(res=>{
      //   if(res.data.code == 418){
      //     this.first=true;
      //   }else{
      //     this.first = false;
      //   }
      // })
      const formData = {
        account: "admin",
        password: "admin"
      };
      wx.removeStorageSync("bstoken");
      getToken(formData).then(function(res) {
        wx.setStorageSync("bstoken", res.data.data.token);
        const dt = {
          unionId: wx.getStorageSync('unionid'),
          openId:wx.getStorageSync('openid'),
          source:0
        }
        gethourchat(dt).then(res=>{
          console.log(res.data)
          if(res.data.isContact == 0){
            _this.first = true;
          }else{
            _this.first = false;
          }
        })
      });
      wx.hideLoading();
      // if (wx.getStorageSync('productInfo')) {
      //   this.prodectInfo = wx.getStorageSync('productInfo')
      //   this.productType = this.prodectInfo.name;
      //   this.productId = this.prodectInfo.id
      //   this.isQR = true;
      // }
    },
    methods:{

      handleContact(e){
        console.log(e)
      },
      products(){
        navigate('/pages/productCenter/main?type=0')
      },
      getPhoneNumber(e){
        if (e.mp.detail.errMsg == 'getPhoneNumber:fail user deny') {
          wx.showToast({ title: '您取消了授权', icon: 'none', mask: true })
          return;
        }
        console.log(this.getphone)
        let _this = this;
        let iv = e.mp.detail.iv;
        let encrypted= e.mp.detail.encryptedData;
        _this.getphone = true;

        wx.login({
            success:function(res) {
              const da = {
                iv:iv,
                code:res.code,
                encrypted:encrypted,
              }
              getUserPhone(da).then(res=>{
                // phone = wx.getStorageSync('phone')
                // phone = res.data.purePhoneNumber;
                wx.setStorageSync('phone', res.data.purePhoneNumber);
                if(this.isQR){
                  navigate(`/pages/home/install/main?extraData=${JSON.stringify(this.extraData)}`)
                }else{
                  navigate(`/pages/home/install/main`)
                }
              })

            },
            fail:function(err) {
              ;console.log(err)
            }
          }
        );
      },
      getPhoneNumber2(e){
        console.log(e.mp.detail.errMsg)

        if (e.mp.detail.errMsg == 'getPhoneNumber:fail user deny') {
          console.log(e.mp.detail.errMsg)

          wx.showToast({ title: '您取消了授权', icon: 'none', mask: true })
          return;
        }
        console.log(this.getphone)

        let _this = this;
        let iv = e.mp.detail.iv;
        let encrypted= e.mp.detail.encryptedData;
        _this.getphone = true;

        wx.login({
            success:function(res) {
              const da = {
                iv:iv,
                code:res.code,
                encrypted:encrypted,
              }
              getUserPhone(da).then(res=>{
                // phone = wx.getStorageSync('phone')
                // phone = res.data.purePhoneNumber;
                wx.setStorageSync('phone', res.data.purePhoneNumber);


                    if(this.isQR){
                      navigate(`/pages/home/repairhousehold/main?extraData=${JSON.stringify(this.extraData)}`)
                    }else{
                      navigate(`/pages/home/repairhousehold/main`)
                    }

              })

            },
            fail:function(err) {
              ;console.log(err)
            }
          }
        );
      },
      getPhoneNumber3(e){
        console.log(e.mp.detail.errMsg)

        if (e.mp.detail.errMsg == 'getPhoneNumber:fail user deny') {
          console.log(e.mp.detail.errMsg)

          wx.showToast({ title: '您取消了授权', icon: 'none', mask: true })
          return;
        }
        console.log(this.getphone)

        let _this = this;
        let iv = e.mp.detail.iv;
        let encrypted= e.mp.detail.encryptedData;
        _this.getphone = true;

        wx.login({
            success:function(res) {
              const da = {
                iv:iv,
                code:res.code,
                encrypted:encrypted,
              }
              getUserPhone(da).then(res=>{
                // phone = wx.getStorageSync('phone')
                // phone = res.data.purePhoneNumber;
                wx.setStorageSync('phone', res.data.purePhoneNumber);
                if(this.isQR){
                  navigate(`/pages/home/debugging/main?extraData=${JSON.stringify(this.extraData)}`)
                }else{
                  navigate(`/pages/home/debugging/main`)
                }
              })

            },
            fail:function(err) {
              ;console.log(err)
            }
          }
        );
      },
      getPhoneNumber4(e){
        console.log(e.mp.detail.errMsg)

        if (e.mp.detail.errMsg == 'getPhoneNumber:fail user deny') {
          console.log(e.mp.detail.errMsg)

          wx.showToast({ title: '您取消了授权', icon: 'none', mask: true })
          return;
        }
        console.log(this.getphone)

        let _this = this;
        let iv = e.mp.detail.iv;
        let encrypted= e.mp.detail.encryptedData;
        _this.getphone = true;

        wx.login({
            success:function(res) {
              const da = {
                iv:iv,
                code:res.code,
                encrypted:encrypted,
              }
              getUserPhone(da).then(res=>{
                // phone = wx.getStorageSync('phone')
                // phone = res.data.purePhoneNumber;
                wx.setStorageSync('phone', res.data.purePhoneNumber);
                if(this.isQR){
                  navigate(`/pages/home/doorchangedir/main?extraData=${JSON.stringify(this.extraData)}`)
                }else{
                  navigate(`/pages/home/doorchangedir/main`)
                }
              })

            },
            fail:function(err) {
              ;console.log(err)
            }
          }
        );
      },
      getPhoneNumber5(e){
        console.log(e.mp.detail.errMsg)

        if (e.mp.detail.errMsg == 'getPhoneNumber:fail user deny') {
          console.log(e.mp.detail.errMsg)

          wx.showToast({ title: '您取消了授权', icon: 'none', mask: true })
          return;
        }
        console.log(this.getphone)

        let _this = this;
        let iv = e.mp.detail.iv;
        let encrypted= e.mp.detail.encryptedData;
        _this.getphone = true;

        wx.login({
            success:function(res) {
              const da = {
                iv:iv,
                code:res.code,
                encrypted:encrypted,
              }
              getUserPhone(da).then(res=>{
                // phone = wx.getStorageSync('phone')
                // phone = res.data.purePhoneNumber;
                wx.setStorageSync('phone', res.data.purePhoneNumber);
                if(this.isQR){
                  navigate(`/pages/home/smokepipe/main?extraData=${JSON.stringify(this.extraData)}`)
                }else{
                  navigate(`/pages/home/smokepipe/main`)
                }
              })
            },
            fail:function(err) {
              ;console.log(err)
            }
          }
        );
      },
      getPhoneNumber6(e){
        console.log(e.mp.detail.errMsg)

        if (e.mp.detail.errMsg == 'getPhoneNumber:fail user deny') {
          console.log(e.mp.detail.errMsg)

          wx.showToast({ title: '您取消了授权', icon: 'none', mask: true })
          return;
        }
        console.log(this.getphone)

        let _this = this;
        let iv = e.mp.detail.iv;
        let encrypted= e.mp.detail.encryptedData;
        _this.getphone = true;

        wx.login({
            success:function(res) {
              const da = {
                iv:iv,
                code:res.code,
                encrypted:encrypted,
              }
              getUserPhone(da).then(res=>{
                // phone = wx.getStorageSync('phone')
                // phone = res.data.purePhoneNumber;
                wx.setStorageSync('phone', res.data.purePhoneNumber);
                if(this.isQR){
                  navigate(`/pages/home/movemachine/main?extraData=${JSON.stringify(this.extraData)}`)
                }else{
                  navigate(`/pages/home/movemachine/main`)
                }
              })

            },
            fail:function(err) {
              ;console.log(err)
            }
          }
        );
      },
      getPhoneNumber7(e){
        console.log(e.mp.detail.errMsg)

        if (e.mp.detail.errMsg == 'getPhoneNumber:fail user deny') {
          console.log(e.mp.detail.errMsg)
          wx.showToast({ title: '您取消了授权', icon: 'none', mask: true })
          return;
        }
        console.log(this.getphone)

        let _this = this;
        let iv = e.mp.detail.iv;
        let encrypted= e.mp.detail.encryptedData;
        _this.getphone = true;

        wx.login({
            success:function(res) {
              const da = {
                iv:iv,
                code:res.code,
                encrypted:encrypted,
              }
              getUserPhone(da).then(res=>{
                // phone = wx.getStorageSync('phone')
                // phone = res.data.purePhoneNumber;
                wx.setStorageSync('phone', res.data.purePhoneNumber);
                if(this.isQR){
                  navigate(`/pages/home/newmacident/main?extraData=${JSON.stringify(this.extraData)}`)
                }else{
                  navigate(`/pages/home/newmacident/main`)
                }
              })

            },
            fail:function(err) {
              ;console.log(err)
            }
          }
        );
      },

      // 绑定机器
      bind (id, fd, sn, type) {
        bindProduct({
          vib: id,
          fd: fd,
          sn: sn,
          sourceType: type
        }).then(res => {
          console.log('res', res)
          if (JSON.stringify(res.data) == "{}") {
            wx.showToast({ title: "未检索到产品", icon: "none", mask: true });
          } else {
            this.prodectInfo = res.data
            this.productmodal = this.prodectInfo.applCode
            this.productType = this.prodectInfo.name
            this.productId = this.prodectInfo.productId
            this.isQR = true
          }
        })
      },
      swiperchange(e){
        this.current = e.mp.detail.current
      },
      tabchange(index){
        this.current = index;
      },
      goto(index){
        if(index == 1){
          if(this.first){
            return;
          }
        }

        switch (index) {
          // case 0: navigate(`/pages/home/install/main?productinfo=${JSON.stringify(this.prodectInfo)}`);
          case 0:
            if(this.isQR){
            navigate(`/pages/home/install/main?extraData=${JSON.stringify(this.extraData)}`)
          }else{
            navigate(`/pages/home/install/main`)
          }
            break;
          case 1:

              if(this.isQR){
                navigate(`/pages/home/repairhousehold/main?extraData=${JSON.stringify(this.extraData)}`)
              }else{
                navigate(`/pages/home/repairhousehold/main`)
              }

            break;
          case 2: wx.showToast({ title: '暂未开放', icon: 'none', mask: true })
            break;
          // case 3: navigate(`/pages/home/debugging/main?productinfo=${JSON.stringify(this.prodectInfo)}`)
          case 3:
            if(this.isQR){
              navigate(`/pages/home/debugging/main?extraData=${JSON.stringify(this.extraData)}`)
            }else{
              navigate(`/pages/home/debugging/main`)
            }
            break;
          // case 4: navigate(`/pages/home/doorchangedir/main?productinfo=${JSON.stringify(this.prodectInfo)}`)
          case 4:
            if(this.isQR){
              navigate(`/pages/home/doorchangedir/main?extraData=${JSON.stringify(this.extraData)}`)
            }else{
              navigate(`/pages/home/doorchangedir/main`)
            }
            break;
          // case 5: navigate(`/pages/home/smokepipe/main?productinfo=${JSON.stringify(this.prodectInfo)}`)
          case 5:
            if(this.isQR){
              navigate(`/pages/home/smokepipe/main?extraData=${JSON.stringify(this.extraData)}`)
            }else{
              navigate(`/pages/home/smokepipe/main`)
            }
            break;
          // case 6: navigate(`/pages/home/movemachine/main?productinfo=${JSON.stringify(this.prodectInfo)}`)
          case 6:
            if(this.isQR){
              navigate(`/pages/home/movemachine/main?extraData=${JSON.stringify(this.extraData)}`)
            }else{
              navigate(`/pages/home/movemachine/main`)
            }
            break;
          case 7:
            if(this.isQR){
              navigate(`/pages/productguarantees/main?extraData=${JSON.stringify(this.extraData)}`)
            }else{
              navigate(`/pages/productguarantees/main`)
            }
            break;
          case 8:
            if(this.isQR){
              navigate(`/pages/chargingstandard/main?extraData=${JSON.stringify(this.extraData)}`)
            }else{
              navigate(`/pages/chargingstandard/main`)
            }
            break;
          // case 10: navigate(`/pages/home/newmacident/main?productinfo=${JSON.stringify(this.prodectInfo)}`)
          case 10:
            if(this.isQR){
              navigate(`/pages/home/newmacident/main?extraData=${JSON.stringify(this.extraData)}`)
            }else{
              navigate(`/pages/home/newmacident/main`)
            }
            break;

        }
      },
      target(index){
        if(this.bottomtab[index].selected){
          return;
        }
        this.$store.commit('tab',index)
        this.bottomtab.forEach((item,i)=>{
          if(index == i){
            this.bottomtab[index].selected = !this.bottomtab[index].selected;
          }else{
            this.bottomtab[i].selected = false;
          }
        })

        this.curindex = index;
      },
      prohelper(){
        if(!this.isQR){
          wx.setStorageSync('productInfo', this.prodectInfo)
          navigate('/pages/product/main?type=2')
        }
        else{
          wx.setStorageSync('productInfo', this.extraData)
          navigate('/pages/product/main?type=2')
        }
      }
    }
  };
</script>

<style lang="less">
  @import "../../utils/flex";
  page{
    background: #fff;
    button{
      margin: 0;
      padding: 0;
      background: transparent;
      line-height: normal;
      border: 0;
      display: inline;
    }
  }
  .boschindex{
    .swiper_desc{
      position: absolute;
      top: 62px;
      right: 31px;
      color: #fff;
      font-size: 18px;
      line-height: 25px;
    }
    .topswiper{
      padding: 7px 15px 13px 15px;
      height: 180px;
      background: -moz-linear-gradient(top, #3C464B 0%, #fff 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3C464B), color-stop(100%,#fff));
      background: -webkit-linear-gradient(top, #3C464B 0%,#fff 100%);
      background: -o-linear-gradient(top, #3C464B 0%,#fff 100%);
      background: -ms-linear-gradient(top, #3C464B 0%,#fff 100%);
      background: linear-gradient(to bottom, #3C464B 0%,#fff 100%);
    }
    swiper{
      height: 190px;
      width: 100%;
    }
    .slide-image{
      height: 190px;
      width: 100%;
    }
    .content{
      height: 90px;
      margin-top: 10px;
      .product{
        background: #47B8D4;
        background-size: 100% 100%;
        height: 100px;
        width: 90%;
        margin: 0 auto;
        box-sizing: border-box;
        padding:5px 40px 5px 46px;
        color: #fff;
        .display_flex;
        .justify-content_space_flex-justify;
        .pro_logo_selected{
          margin-top: 5px;
          height:70px;
          width: 70px;
        }
        .pro_logo_sele{
          margin-top: 4px;
          width: 134px;
          height: 64px;
        }
        .right{
          text-align: right;
          color: #fff;
          padding: 8px 0 22px 0;
          .p1{
            .type{
              position: relative;
              top: -2px;
              font-size: 16px;
            }
            .name{
              font-size: 13px;
              margin-left: 6px;
            }
          }
          .code{
            font-size: 9px;
            line-height: 13px;
          }
          .helper{
            font-size: 13px;
            line-height: 18px;
            margin-top: 7px;
          }
        }
        .notright{
          line-height: 70px;
          font-size: 13px;
        }
      }
    }
    .content_type{
      position: relative;
      top: -10px;
      background: #fff;
      padding: 0 20px;
      color: #3C464B;
      text-align: center;
      .tabs{
        border-bottom: 1px solid #A5A5A5;
        padding: 0 55px;
      }
      .tab{
        .display_flex;
        height: 57px;
        line-height: 57px;
        font-size: 14px;
        span{
          .flex_1;
          position: relative;
        }
        .cur{
          font-weight: 700;
        }
        .cur:before{
          position: absolute;
          bottom: -6px;
          left: 0;
          right: 0;
          margin: auto;
          content: '';
          display: block;
          height: 11px;
          width: 11px;
          border-right: 1px solid #A5A5A5;
          border-bottom: 1px solid #A5A5A5;
          transform:rotate(-135deg);
          background: #fff;
        }
      }
      .bottomswiper{
        height: 400px;
      }
      .swiper1{
        width: 268px;
        margin: 0 auto;
        padding: 42px 0 35px 0;
        .content1{
          .display_flex;
          .justify-content_space_flex-justify;
          .item{
            position: relative;
            .ibt{
              position: absolute;
              top: 0;
              left: 0;
              height: 48px;
              width: 100%;
              opacity: 0;
            }
            img{
              height: 48px;
              width: 48px;
            }
            p{
              font-size: 12px;
              margin-top:3px;
            }
          }
        }
        .content2{
          margin-top: 33px;
        }
        .content3{
          margin-top: 33px;
          .display_flex;
          justify-content: flex-start;
          .item2{
            margin-left: 64px;
          }
        }
        .content4{
          .display_flex;
          justify-content: flex-start;
          .item2{
            margin-left: 64px;
          }
        }
      }
    }
    .bottom{
      position: fixed;
      bottom: 0;
      left: 0;
      height: 86px;
      width: 100%;
      background: url("../../static/images/bottom_bg.png") no-repeat;
      background-size: 100% 100%;
      padding: 5px 20px 10px 20px;
      box-sizing: border-box;
      .display_flex;
      .justify-content_space_flex-justify;
      .align-items_flex-end;
      text-align: center;
      .active{
        color: rgba(71, 184, 212, 1)
      }
      .item{
        position: relative;
        font-size: 0;
        .flex_1;
        .iboot{
          position: absolute;
          top:0;
          bottom:0;
          left:0;
          right:0;
          opacity: 0;
        }
        img{
          height: 30px;
          width: 30px;
          margin-bottom: 2px;
        }
        p{
          font-size: 10px;
        }
        .kefu{
          width: 46px;
          height: 38px;
          margin-bottom: 5px;
        }
      }
    }
    // .bottom{
    //   padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    //   padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    //   padding-left: constant(safe-area-inset-left);
    //   padding-left: env(safe-area-inset-left);
    //   margin-right: constant(safe-area-inset-right);
    //   margin-right: env(safe-area-inset-right);
    // }
  }
</style>
