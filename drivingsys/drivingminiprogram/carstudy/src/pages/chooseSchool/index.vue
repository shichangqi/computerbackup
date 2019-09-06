<template>
  <div class="choosecity">
    <div class="content">
      <div class="location">
        <div class="panel" @click="choosecity">
          <span>当前城市：{{city?city.name:'请选择城市'}}</span>
          <span class="right">
            <span>切换城市</span>
            <img class="arrow" src="/static/images/arrow_right.png" alt />
          </span>
        </div>
      </div>
      <div class="driverschool">
        <div class="panel" v-for="(item,index) in list" :key="index" @click="choose(item,index)">
          <span>{{item.name}}</span>
          <span :class="index == current ?'radioed':'radio'"></span>
        </div>
        <p class="none" v-if="list.length <= 0">暂无数据</p>
      </div>
    </div>
  </div>
</template>
<script>
import { schoollist } from "../../api/api";
import { goBack, navigate } from "../../utils";
export default {
  data() {
    return {
      current: -1,
      list: [
        // {
        //   id:1,
        //   name:'蒙城春蕾光彩驾校1',
        // },
        // {
        //   id:1,
        //   name:'蒙城春蕾光彩驾校2',
        // },
        // {
        //   id:1,
        //   name:'蒙城春蕾光彩驾校3',
        // }
      ],
      city: null
    };
  },
  onLoad() {
    let obj = wx.getStorageSync("school");
    if (obj) {
      this.current = obj.current;
    }
    
  },
  onShow() {
    this.city = wx.getStorageSync("city");
    this.getlist();
  },
  methods: {
    //跳转选择城市页面
    choosecity() {
      navigate("/pages/chooseCity/main");
    },
    //选择驾校后跳转
    choose(item, index) {
      this.current = index;
      item.current = index;
      wx.setStorageSync("school", item);
      goBack();
    },
    getlist() {
      console.log(this.city.id);
      
      schoollist({
        city_id: this.city.id
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.list = res.data.data;
        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: "none",
            mask: true
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.choosecity {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ededed;
  .content {
    padding-top: 20rpx;
    .panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      background: #fff;
      font-size: 34rpx;
      border-bottom: 1rpx solid #d9d9d9;
      .right {
        font-size: 30rpx;
        color: #7e7e7e;
        .arrow {
          width: 14rpx;
          height: 26rpx;
          margin-left: 17rpx;
        }
      }
      &:last-child {
        border: 0;
      }
    }
    .driverschool {
      margin-top: 16rpx;
      .radio {
        width: 32rpx;
        height: 32rpx;
        box-sizing: border-box;
        border: 6rpx solid rgba(242, 155, 118, 1);
        border-radius: 50%;
      }
      .radioed {
        width: 32rpx;
        height: 32rpx;
        box-sizing: border-box;
        border: 6rpx solid rgba(242, 155, 118, 1);
        border-radius: 50%;
        background: #ea4e27;
      }
      .none {
        text-align: center;
        font-size: 36rpx;
        color: #ccc;
      }
    }
  }
}
</style>