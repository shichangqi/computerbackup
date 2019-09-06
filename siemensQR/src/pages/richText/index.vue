<template>
  <div class="rich">
    <!-- <web-view :src="Url" /> -->
    <h5>{{name}}</h5>
    <div class="btn">
      <button open-type="share" class="share_btn"></button>
      <img src="../../../static/images/share.png" alt="" class="toshare"></img>
      <span class="sharetxt">分享</span>
    </div>
    <p class="desc"><span>更新时间：{{time}}</span> <span>作者：产品助手团队</span></p>
    <div class="rich-text">
      <wxParse :content="tip"/>
    </div>
    <cover-view class="link">
      <cover-view class="left"><cover-image src="../../static/images/read.png" alt="" class="read"></cover-image><cover-view>  {{info.lookCount}}</cover-view></cover-view>
      <cover-view class="right">
        <cover-view @tap="collect" class="loveview">
          <cover-image src="../../static/images/love.png" alt="" v-if="isLove == 1" class="love"></cover-image>
          <cover-image src="../../static/images/heart.png" alt="" v-if="isLove == 0" class="love"></cover-image>
          <cover-view class="lovetxt">点心</cover-view>
        </cover-view>


      </cover-view>
    </cover-view>
  </div>
</template>

<script>
import { problemDetail, richContent, problemCollect ,getUserInfo} from "../../api/api";
import wxParse from "mpvue-wxparse";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      id: '',
      tip: '<p></p>',
      type: 1,
      name: '',
      info: {},
      time:'',
      first:true,
      isLove:0
    };
  },
  components: {
    wxParse
  },
  onLoad(option) {
    Object.assign(this.$data, this.$options.data());
    this.id = option.id
    this.type = option.type

    getUserInfo().then(res=>{
      console.log(res.data)
      this.head = res.data.headimgurl
      this.name=res.data.nickname;
      wx.setStorageSync('phone', res.data.mobile)
      wx.setStorageSync('head', res.data.headimgurl)
      wx.setStorageSync('nickname', res.data.nickname)
    });
  },
  onShow() {
    let _this = this;
    this.getInfo()
    setTimeout(function() {
      _this.getInfo()
    },200)
  },
  //右上角分享功能
  onShareAppMessage: function(res) {
    var that = this;
    return {
      title: "西门子家电",
      path: "/pages/richText/main?id=" + that.id + "&type=" + that.type,
      success: function(res) {
        // 转发成功
        // that.shareClick();
      },
      fail: function(res) {
        // 转发失败
      }
    };
  },
  methods: {
    getInfo () {
      let that = this
      wx.showLoading({ title: "加载中", mask: true });
      problemDetail({
        id: this.id,
        type: this.type,
        unionid: wx.getStorageSync('unionid')
      }).then(res => {
        if (res.data.cms) {

          that.info = res.data.cms
          that.isLove = that.info.isLove;
          that.name = res.data.cms.questionName;
          if(res.data.cms.gmtModified){
            that.time = res.data.cms.gmtModified;
          }else{
            that.time = res.data.cms.gmtCreate
          }
          wx.setNavigationBarTitle({
            title: '西门子家电'
          })
          that.getRich(res.data.cms.richTextId)
        } else {
          // wx.showToast({ title: "未查询到该问题", icon: "none", mask: true });
          // setTimeout (function() {
          //   wx.navigateBack({
          //     delta: 1
          //   })
          // }, 1000)
        }
        wx.hideLoading();
      })
    },
    getRich (id) {
      richContent({
        id: id
      }).then(res => {
        this.tip = res.data
      })
    },
    collect () {
      let that =this;
      // if(!that.first){
      //   wx.showToast({ title: "您已点击哦~", icon: "none", mask: true });
      //   return;
      // }
      that.first = false
      if (that.isLove== 0) {
        that.isLove = 1
        wx.showToast({ title: "点赞成功~", icon: "none", mask: true });
      } else {
        that.isLove = 0
      }
      problemCollect({
        id: this.id,
        type: this.type,
        unionid: wx.getStorageSync('unionid')
      }).then(res => {

        // that.$forceUpdate()
        that.first = true;
      })
    }
  }
};
</script>

<style  lang="less">
@import "../../utils/flex.less";
@import url("~mpvue-wxparse/src/wxParse.css");
page{
  background: #fff;
}
/*.rich {*/
  /*.btn {*/
    /*position: relative;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    /*position: absolute;*/
    /*right: 30px;*/
    /*color:#47B8D4;*/
    /*top:0;*/
    /*.toshare{*/
      /*width: 20px;*/
      /*height: 20px;*/
      /*margin-bottom: 4px;*/
    /*}*/
    /*.sharetxt{*/
      /*font-size: 10px;*/
    /*}*/
    /*.share_btn {*/
      /*position: absolute;*/
      /*top: 0;*/
      /*bottom: 0;*/
      /*left: 0;*/
      /*right: 0;*/
      /*opacity: 0;*/
    /*}*/
  /*}*/
  /*h5{*/
    /*font-size: 16px;*/
    /*color: #3C464B;*/
    /*padding: 15px 15px 0 15px;*/
  /*}*/
  /*.desc{*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*font-size: 12px;*/
    /*padding: 10px 15px;*/
    /*color: rgba(60, 70, 75, .4);*/
  /*}*/
  /*.rich-text img {*/
    /*border-radius: 3px;*/
    /*margin-bottom: -4px;*/
    /*max-width: 100%*/
  /*}*/
  /*.rich-text {*/
    /*overflow: hidden;*/
    /**,*/
    /**:after,*/
    /**:before {*/
      /*-webkit-box-sizing: border-box;*/
      /*-moz-box-sizing: border-box;*/
      /*box-sizing: border-box !important;*/
    /*}*/
    /*p {*/
      /*box-sizing: border-box !important;*/
    /*}*/
    /*.wxParse view {*/
      /*box-sizing: border-box !important;*/
    /*}*/
    /*padding: 0 8px 30px 8px;*/
    /*box-sizing: border-box !important;*/
  /*}*/
  /*.link {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/
    /*position: fixed;*/
    /*z-index: 99999999999!important;*/
    /*bottom: 0;*/
    /*width: 100%;*/
    /*height: 47px;*/
    /*background: #47B8D4;*/
    /*box-sizing: border-box;*/
    /*padding: 0 10px;*/
    /*color: #fff;*/
    /*font-size: 12px;*/
    /*.left{*/
      /*display: flex;*/
    /*}*/
    /*.read{*/
      /*width: 22px;*/
      /*height: 14px;*/
      /*margin-right: 8px;*/
    /*}*/
    /*span {*/
      /*font-size: 14px;*/
    /*}*/
    /*.right {*/
      /*display: flex;*/
      /*align-items: center;*/
      /*margin-right:10px;*/
      /*.love{*/
        /*width: 18px;*/
        /*height: 16px;*/
      /*}*/
      /*.lovetxt{*/
        /*margin-top: 5px;*/
        /*font-size: 10px;*/
      /*}*/
      /*!*img {*!*/
      /*!*width: 20px;*!*/
      /*!*height: 20px;*!*/
      /*!*vertical-align: bottom;*!*/
      /*!*}*!*/

    /*}*/
  /*}*/

/*}*/
.rich {
  .loveview{
    padding: 5px;
  }
  .btn {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 30px;
    color:#47B8D4;
    top:0;
    .toshare{
      width: 20px;
      height: 20px;
      margin-bottom: 4px;
    }
    .sharetxt{
      font-size: 10px;
    }
    .share_btn {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0;
    }
  }
  h5{
    font-size: 16px;
    color: #3C464B;
    padding: 15px 15px 0 15px;
  }
  .desc{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding: 10px 15px;
    color: rgba(60, 70, 75, .4);
  }
  .rich-text img {
    border-radius: 3px;
    margin-bottom: -4px;
    max-width: 100%
  }
  .rich-text {
    overflow: hidden;
    *,
    *:after,
    *:before {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box !important;
    }
    p {
      box-sizing: border-box !important;
    }
    .wxParse view {
      box-sizing: border-box !important;
    }
    padding: 0 8px 30px 8px;
    box-sizing: border-box !important;
  }
  .link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 99999999999!important;
    bottom: 0;
    width: 100%;
    height: 47px;
    background: #47B8D4;
    box-sizing: border-box;
    padding: 0 10px;
    color: #fff;
    font-size: 12px;
    .left{
      display: flex;
    }
    .read{
      width: 22px;
      height: 14px;
      margin-right: 8px;
    }
    span {
      font-size: 14px;
    }
    .right {
      display: flex;
      align-items: center;
      margin-right:10px;
      .love{
        width: 18px;
        height: 16px;
      }
      .lovetxt{
        margin-top: 5px;
        font-size: 10px;
      }
      /*img {*/
      /*width: 20px;*/
      /*height: 20px;*/
      /*vertical-align: bottom;*/
      /*}*/

    }
  }

}
</style>
