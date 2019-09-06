<template>
  <div class="container">
    <div class="switchLocale">
      <div class="Search">
        <img src="../../../../static/images/icon_s.png" alt="">
        <input type="text" v-model="key"  @input="inputTyping">
      </div>

      <div class="switchLocale_msg" v-if="getList.length">
        <ul v-for="(item, index) in getList" :key="index">
          <li @click="gocity(item)">{{item.province}} {{item.city}} {{item.district}}</li>
        </ul>
      </div>
      <div class="No_data" v-if="isShow && !getList.length">暂无数据</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      key:'',
      inputShowed:true,
      isShow:false,
      id:''
    }
  },
  computed:{
    getList () {
      return this.$store.state.home.Address 
    },
  },
  methods: {
    inputTyping (name) {
      this.$store.dispatch('home/getAddress', {name:this.key}).then(res=>{
        this.isShow = true
      })
    },
    gocity (item) {
      wx.redirectTo({
        url: `/pages/conservancy/main?id=${item.id}`,
      }) 
    }
  },
  onLoad () {
    this.key = ''
    this.$store.commit('home/RECORD_ADDRESS', [])
    this.isShow = false
  }
}
</script>

<style lang="less" scoped>
  .container{
    width: 100%;
    background: #F4F4F4;
    .switchLocale{
      width: 100%;
      padding: 15px 15px 0 15px;
      box-sizing: border-box;
      .Search{
        width: 100%;
        position: relative;
        margin-bottom: 12px;
        img{
          width: 16px;
          height: 16px;
          position: absolute;
          left: 20px;
          top: 10px;
        }
        input{
          width:345px;
          height:36px;
          background:rgba(255,255,255,1);
          box-shadow:0px 1px 7px 0px rgba(0,0,0,0.2);
          border-radius:22px;
          padding-left: 51px;
          box-sizing: border-box;
          font-size: 12px;
          color: #3C464B;
        }
      }
      .switchLocale_msg{
        width: 100%;
        ul{
          width: 100%;
          li{
            border-bottom: 1px solid #E5E5E5;
            padding: 13px 0 15px 0px;
            box-sizing: border-box;
            font-size: 12px;
            color: #3C464B;
          }
        }
      }
      .No_data{
        text-align: center;
        font-size: 24px
      }
    }
  }
</style>
