<template>
  <div class="container">
    <div class="hardness">
      <div class="city" @click="goJump">
        <div>{{getList.province}}{{getList.city}}{{getList.district}}</div>
        <img src="../../../static/images/icon-Path.png" alt="">
      </div>
      <div class="Location">
        <img src="../../../static/images/icon-Shape.png" alt="">
        <span>重新定位</span>
      </div>
    </div>
    <div class="bor"></div>
    <div class="Water">
      <span>水硬度值</span>
      <img src="../../../static/images/icon3.png" alt="">
    </div>
    <div class="num">{{getList.waterHardnessValue}}</div>
    <div class="hardness_btn">
      <div class="hardness_msg">
        <div class="Set_up">
          <h3>洗碗机设置</h3>
        </div>
        <div class="set_msg">
          <div class="set_left">
            <img src="../../../static/images/icon1.png" alt="">
            <h4>请设置为</h4>
            <p>{{getList.avalue}}</p>
            <div class="btn">查看操作方式</div>
          </div>
          <div class="set_left">
            <img src="../../../static/images/icon1.png" alt="">
            <h4>请设置为</h4>
            <p>{{getList.bvalue}}</p>
            <div class="btn">查看操作方式</div>
          </div>
        </div>
        <div class="Explain">目前仅提供西门子操作方式视频，博世设备请查看相关说明书</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lat: '',  //纬度
      lng: '', //经度
      id:''
    }
  },
  computed:{
    getList () {
      return this.$store.state.home.details 
    },
  },
  methods: {
    goJump () {
      wx.navigateTo ({
        url:"/pages/conservancy/switchcity/main",
      }) 
    },
    laodAdd () {
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
  },
  created () {
    this.laodAdd()
  },
  onLoad () {
    this.latArr = wx.getStorageSync('latArr')
    this.id =  this.$root.$mp.query.id ? this.$root.$mp.query.id : ''

    let parame = {
      lat:this.latArr.lat,
      lng: this.latArr.lng,
    }
    if (this.id){
      parame.id = this.id
    }
    this.$store.dispatch('home/getDetails', parame)
  }
}
</script>

<style lang="less" scoped>
  .container{
    width: 100%;
    .hardness{
      padding: 14px 15px 0 0px;
      box-sizing: border-box;
      display: flex;
      justify-content:flex-end;
      .city{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 34px;
        div{
          font-size: 14px;
          color: #3C464B;
          margin-right: 15px;
        }
        img{
          width: 16px;
          height: 10px;
        }
      }
      .Location{
        display: flex;
        align-items: center;
        img{
          width: 12px;
          height: 12px;
          margin-right: 4px;
        }
        span{
          font-size: 10px;
          color: #176DD0;
        }
      }
    }
    .bor{
      width: 24px;
      margin: 16px auto;
      border-top: 1px solid #3C464B;
    }
    .Water{
      text-align: center;
      span{
        font-size: 12px;
        color: #3C464B;
        text-align: center;
        margin-right: 8px;
      }
      img{
        width: 11px;
        height: 11px;
      }
    }
    .num{
      text-align: center;
      font-size:60px;
      font-weight:400;
      color:rgba(23,109,208,1);
      line-height:168px;
      text-shadow:0px 6px 15px rgba(103,159,229,0.63);
    }
    .hardness_btn{
      width: 100%;
      background: #176DD0;
      padding: 93px 20px 37px 20px;
      box-sizing: border-box;
      .hardness_msg{
        padding: 28px 30px 25px 27px;
        background:rgba(255,255,255,1);
        box-shadow:0px 4px 14px 0px rgba(0,0,0,0.2);
        border-radius:37px;
        .Set_up{
          h3{
            font-size: 18px;
            color: #3C464B;
            text-align: center;
            margin-bottom: 29px;
          }
        }
        .set_msg{
          display: flex;
          justify-content: flex-start;
            .set_left{
            width: 120px;
            background: #fff;
            margin-right: 39px;

            img{
              width: 120px;
              height: 34px;
              margin-bottom: 14px;
            }
            h4{
              font-size: 12px;
              color: #3C464B;
              display: block;
              text-align: center;
            }
            p{
              font-size: 35px;
              color: #3C464B;
              text-align: center;
            }
            .btn{
              width: 118px;
              height: 34px;
              line-height: 34px;
              background:#176DD0;
              box-shadow:0px 4px 14px 0px rgba(0,0,0,0.2);
              border-radius:37px;
              text-align: center;
              font-size: 12px;
              color: #FFFFFF;
              margin-top: 10px;
            }
          }
        }
        .Explain{
          font-size: 10px;
          color: #3C464B;
          margin-top: 30px;
        }
      }
    }
  }
</style>
