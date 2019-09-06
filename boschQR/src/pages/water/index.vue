<template>
      <div class="water">
        <div class="cantfind"  v-if="show" catchtouchmove="ture">
          <div class="modal">
            <div class="closebtn" @click="onhidden">知道了</div>
          </div>
        </div>
        <div class="cantfind"  v-if="show1" catchtouchmove="ture">
          <div class="modal">
            <video autoplay src="http://txb-qr-1252281731.cos.ap-beijing.myqcloud.com/全尺寸独立型按键.mp4"></video>
            <div class="closebtn" @click="show1 = false">知道了</div>
          </div>
        </div>
        <div class="cantfind"   v-if="show2" catchtouchmove="ture">
          <div class="modal">
            <video autoplay src="http://txb-qr-1252281731.cos.ap-beijing.myqcloud.com/全嵌-洗涤用品添加.mp4"></video>
            <div class="closebtn" @click="show2 = false">知道了</div>
          </div>
        </div>
        <div class="top">
          <span class="again" @click="again"><img src="../../../static/images/location_icon.png"class="location">重新定位</span>
          <div class="address" @click="switchcity">
              <span> {{info.province}} {{info.city}} {{info.district}} <img src="../../../static/images/city_down.png" class="down"></span>
            </div>
          <div class="line"></div>
          <div class="water_desc" @click="onshow"> 水硬度值 <img src="../../../static/images/water_water.png" alt=""></div>
          <div class="content c2"v-if="info.waterHardnessValue == ''">暂无数据</div>
          <div class="content" v-else>{{info.waterHardnessValue}}</div>
        </div>
        <div class="bottom">
          <img src="../../../static/images/water_bg.png" class="water_bg">
          <div class="container">
            <div class="content" v-if="info.avalue == '' || info.bvalue == ''">
              <img src="../../../static/images/water_none.png" class="water_none">
              <p class="p1">洗碗机设置</p>
              <p class="p2">请向当地供水部门咨询当地水硬度值</p>
              <p class="p3">并根据说明书设置洗碗机</p>
            </div>
            <div class="content"v-else>
              <p>洗碗机设置</p>
              <div class="setting">
                <div class="item">
                  <img src="../../../static/images/water_icon1.png" alt="">
                  <p>请设置为</p>
                  <h5>{{info.avalue}}</h5>
                  <div class="check" @click="videoshow(1)">查看操作方式</div>
                </div>
                <div class="item">
                  <img src="../../../static/images/water_icon2.png" alt="">
                  <p>请设置为</p>
                  <h5>{{info.bvalue}}</h5>
                  <div class="check"  @click="videoshow(2)">查看操作方式</div>
                </div>
              </div>
              <p class="explain">目前仅提供西门子操作方式视频，博世设备请查看相关说明书</p>
              <p class="desc">以上为制造商收集数据，供您进行参考，保留更新权利</p>
            </div>

          </div>

        </div>
      </div>
</template>

<script>
  import {redirectTo} from "../../utils/index";
  import {getwaterdetail} from "../../api/api";

  export default {
    name: "index",
    data(){
      return{
        info:{},
        show:false,
        lat: '',  //纬度
        lng: '', //经度
        id:'',
        show1:false,
        show2:false
      }
    },
    onLoad(){
      var _this = this
      wx.getLocation({
        type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success(res) {
          _this.lat = res.latitude
          _this.lng = res.longitude

          let latArr = {lat: res.latitude, lng: res.longitude}
          wx.setStorageSync('latArr', latArr)
        }
      })
    },
    onShow(){
      this.getinfo();
    },
    methods:{
      videoshow(index){
        if(index == 1){
          this.show1 = true;
        }else{
          this.show2 = true;

        }
      },
      again(){
        var _this = this
        wx.getLocation({
          type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
          success(res) {
            _this.lat = res.latitude
            _this.lng = res.longitude

            let latArr = {lat: res.latitude, lng: res.longitude}
            wx.setStorageSync('latArr', latArr)
            _this.getinfo()
          }
        })
      },
     async getinfo(){
        this.latArr = wx.getStorageSync('latArr')
        this.id =  this.$root.$mp.query.id ? this.$root.$mp.query.id : ''

        let parame = {
          lat:this.latArr.lat,
          lng: this.latArr.lng,
        }
        if (this.id){
          parame.id = this.id
        }
       const {data} = await getwaterdetail(parame)
       this.info = data
       console.log(data)
      },
      onhidden() {
        this.show = false;
      },
      onshow() {
        this.show = true;
      },
      switchcity(){
        redirectTo('/pages/switchcity/main')
      },
    }
  };
</script>

<style lang="less">
page{
  height: 100%;
}
.water{
  height: 100%;
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  .cantfind {
    position: fixed;
    width: 90%;
    top: 10px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    padding: 20px;
    background: rgba(0, 0, 0, 0.6);
    z-index: 8888;
    height: 100%;
    text-align: center;
    .modal{
      background: #fff;
      border-radius: 8px;
      padding-bottom: 10px;
      .closebtn{
        width: 200px;
        height: 30px;
        border-radius: 20px;
        border: 1px solid #41aaaa;
        line-height: 30px;
        margin: 20px auto;
        font-size: 14px;
        color: #3c464b;
      }
    }
  }
  .top{
    padding: 14px 15px 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .again{
      position: absolute;
      top: 18px;
      right: 15px;
      font-size: 10px;
      color: #176DD0;
      .location{
        width: 12px;
        height: 12px;
        margin-bottom: -2px;
        margin-right: 2px;
      }
    }
    .address{
      font-size: 14px;
      color: #3C464B;
      display: flex;
      align-items: center;
      margin-left: 16px;
      .down{
        width: 8px;
        height: 5px;
        margin-left: 6px;
        margin-bottom: 2px;
      }

    }
    .line{
      width: 24px;
      height: 1px;
      margin-top: 16px;
      background: #000;
    }
    .water_desc{
      font-size: 12px;
      color: rgba(60, 70, 75, .5);
      margin-top: 19px;
      margin-left: 11px;
      img{
        width: 11px;
        height: 11px;
      }
    }
    .content{
      font-size: 60px;
      color: rgba(23, 109, 208, 1);
      text-shadow:0px 6px 15px rgba(103,159,229,0.63);
    }
    .c2{
      font-size: 30px;
    }
  }
  .bottom{
    position: relative;
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    .water_bg{
      height: 100%;
      width: 100%;
      vertical-align: middle;
    }
    .container{
      position: absolute;
      top: 0;
      width: 90%;
      padding-top: 25%;
      .content{
        text-align: center;
        background: #fff;
        box-shadow:0 4px 14px 0 rgba(0,0,0,0.2);
        border-radius:18px;
        padding: 22px 27px 14px;
        p{
          color: rgba(60, 70, 75, 1);
          font-size: 18px;
          margin-bottom: 23px;
        }
        .water_none{
          width: 151px;
          height: 118px;
          margin-top: 22px;
        }
        .p1{
          margin-bottom: 0;
          margin-top: 30px;
          font-size: 18px;
          color: rgba(60, 70, 75, 1);
        }
        .p2{
          margin-bottom: 0;
          margin-top: 14px;
          font-size: 12px;
          color: rgba(60, 70, 75, 1);
          line-height: 7px;
        }
        .p3{
          margin-bottom: 0;
          margin-top: 12px;
          font-size: 12px;
          color: rgba(60, 70, 75, 1);
          line-height: 7px;
          padding-bottom: 15px;
        }
        .setting{
          display: flex;
          justify-content: space-between;
          .item{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
              width: 120px;
              height: 33px;
              margin-bottom: 14px;
            }
            p{
              font-size: 12px;
              color: rgba(60, 70, 75, .5);
              margin-bottom: 2px;
            }
            h5{
              color: rgba(60, 70, 75, 1);
              font-size: 40px;
              margin-bottom: 9px;
            }
            .check{
              width: 118px;
              height: 34px;
              background:rgba(23,109,208,1);
              border-radius:17px;
              line-height: 34px;
              color: #fff;
              font-size: 12px;
            }
          }
        }
        .explain{
          margin-top: 17px;
          font-size: 10px;
          color: rgba(60, 70, 75, 1);
        }
        .desc{
          margin-top: 22px;
          color: rgba(136, 136, 136, 1);
          font-size: 10px;
          margin-bottom: 0px;
        }
      }
    }

  }
}
</style>
