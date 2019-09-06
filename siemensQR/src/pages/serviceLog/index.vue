<template>
  <div class="log">
    <div class="none"v-if="list.length == 0">
      <img src="../../../static/images/none.png" alt="">
      <p>暂无内容</p>
    </div>
    <div class="list" v-for="(item, index) in list" :key="index" v-if="list.length !=0">
      <p class="list-top">
        <span v-if="item.orderNum">订单编号：{{item.orderNum}}</span>
        <span v-else> <span></span></span>
        <span class="status" v-if="!item.orderNum">已提交</span>
        <span class="status" v-if="item.orderNum">已预约</span>
      </p>
      <p class="list-bottom">
        <span >{{item.createTime}}</span>
        <span v-if="item.proName">·{{item.proName}}</span>
        <span v-if="item.type == 1">安装</span>
        <span v-if="item.type == 2">维修</span>
        <span v-if="item.type == 3">调试</span>
        <span v-if="item.type == 4">设计</span>
        <span v-if="item.type == 5">预埋烟管</span>
        <span v-if="item.type == 6">移机</span>
        <span v-if="item.type == 7">换门方向</span>
        <span v-if="item.type == 8">新机鉴定</span>
      </p>
    </div>
  </div>
</template>

<script>
  import {
    formatTime
  } from "../../utils/index";
  import { getdoborder,getToken} from "../../api/api";

export default {
  data() {
    return {
      list: []
    };
  },
  async onLoad(option) {},
  onShow() {
    this.getList()
  },
  onUnload() {},
  methods: {
    getList () {
      let _this = this;
      const formData = {
        account: "admin",
        password: "admin"
      };
      wx.removeStorageSync("bstoken");
      getToken(formData).then(function(res) {
        wx.setStorageSync("bstoken", res.data.data.token);
        const data = {
          source:0,
          unionId: wx.getStorageSync('unionid'),
          openId: wx.getStorageSync('openid'),
          curPage:1,
          pageSize:500
        }
        getdoborder(data).then(res=>{
          _this.list = res.data.data
          _this.list.forEach(item=>{
            item.orderDate = formatTime(new Date(item.orderDate))
            item.createTime = formatTime(new Date(item.createTime))
          })
        })
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "../../utils/flex.less";
.log {
  .none{
    text-align: center;
    font-size: 16px;
    color: #ccc;
    img{
      width: 100%;
      margin-top: 40%;
      margin-bottom: 20px;
    }
  }
  .list {
    background: #ffffff;
    padding: 20px 10px;
    margin-top: 10px;
    .list-top {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #3C464B;
      .status {
        color: #47B8D4;
      }
    }
    .list-bottom {
      font-size: 14px;
      color: #3C464B;
      margin-top: 10px;
    }
  }
}
</style>
