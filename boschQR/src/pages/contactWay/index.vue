<template>
  <div class="contactWay">

    <div class="list"v-if="list != null && list.length != 0">
      <div class="contact" v-for="(i,index) in list" :key="index">
        <div class="info" >
          <p>
            <span>{{i.surname+i.name}}{{i.sex == 1?'先生':'女士'}}</span>
            <span>{{i.mobile}}</span>
          </p>
          <p class="address">{{i.province+i.city+i.country+i.addr}}</p>
        </div>
        <p class="operation">
          <img src="../../../static/images/edit_icon.png" @tap="toedit(i)">
          <img @tap="deleteaddr(i)" src="../../../static/images/delete_icon.png" alt class="delete">
        </p>
      </div>
    </div>
    <div class="none"v-else>
      <img src="../../../static/images/none.png" alt="">
      <p>暂无联系地址</p>
    </div>

    <div class="submit" @tap="addContact">添加联系地址</div>
  </div>
</template>

<script>
import { navigate, goBack } from "../../utils/index";
import { getAddress, getToken,deleteaddress } from "../../api/api";

export default {
  data() {
    return {
      list: [],
      type:0
    };
  },

   onLoad(option) {
    Object.assign(this.$data, this.$options.data());

  if(option.type){
  this.type =parseInt( option.type);
}

  },
 async onShow(){
   wx.showLoading({ title: "加载中", mask: true });

   //获取bstoken
    const formData = {
      account: "admin",
      password: "admin"
    };
    wx.removeStorageSync("bstoken");
    await getToken(formData).then(function(res) {
      wx.setStorageSync("bstoken", res.data.data.token);
    });

    const data = {
      unionId: wx.getStorageSync("unionid")
    };
    await getAddress(data).then(res => {
      this.list = res.data.data;
      wx.hideLoading();
    });
  },
  methods: {

    toedit(obj) {
      navigate(`/pages/editContact/main?address=${JSON.stringify(obj)}`);
    },
    addContact() {
      navigate("/pages/newContact/main");
    },
    deleteaddr(obj) {
      let _this = this;
      wx.showModal({
        title: "提示",
        content: "确定删除吗?",
        confirmColor: "#FF3300",
        success(res) {
          if (res.confirm) {
            const data = {
              id: obj.id,
              unionId: wx.getStorageSync("unionid")
            };
            deleteaddress(data).then(res => {
              console.log(res.data);
              wx.showLoading({ title: "加载中", mask: true });
              getAddress(data).then(res => {
                _this.list = res.data.data;
                wx.hideLoading();
              });
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../../utils/flex.less";

page {
  background: #fff;
}
.contactWay {
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
  .list{
    padding-bottom: 200px;
  }
  .contact {
    padding: 15px 0 11px 15px;
    width: 85%;
    /*height: 90px;*/
    margin: 15px auto 0 auto;
    border-radius: 6px;
    -moz-box-shadow: 0px 0px 30px 0 rgba(60, 70, 75, 0.08); /*firefox*/
    -webkit-box-shadow: 0px 0px 30px 0 rgba(60, 70, 75, 0.08); /*webkit*/
    box-shadow: 0px 0px 30px 0 rgba(60, 70, 75, 0.08); /*opera或ie9*/
    .info {
      color: rgba(60, 70, 75, 1);
      border-bottom: 1px solid #e2e3e4;
      padding-right: 15px;
      p {
        .display_flex;
        .justify-content_space_flex-justify;
        font-size: 14px;
      }
      .address {
        color: rgba(135, 155, 170, 1);
        font-size: 12px;
        margin-top: 10px;
        margin-bottom: 12px;
        padding-right: 15px;
      }
    }
    .operation {
      padding-right: 15px;
      height: 24px;
      img {
        float: right;
        width: 18px;
        height: 18px;
        margin-top: 11px;
      }
      .delete {
        margin-right: 20px;
      }
    }
  }
  .submit {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 44px;
    background: rgba(65, 170, 170, 1);
    padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    padding-left: constant(safe-area-inset-left);
    padding-left: env(safe-area-inset-left);
    margin-right: constant(safe-area-inset-right);
    margin-right: env(safe-area-inset-right);
    margin: auto;
    text-align: center;
    line-height: 44px;
    color: #fff;
    font-size: 16px;
    -moz-box-shadow: 2px 2px 10px rgba(65, 170, 170, 0.7); /*firefox*/
    -webkit-box-shadow: 2px 2px 10px rgba(65, 170, 170, 0.7); /*webkit*/
    box-shadow: 2px 2px 10px rgba(65, 170, 170, 0.7); /*opera或ie9*/
  }
}
</style>
