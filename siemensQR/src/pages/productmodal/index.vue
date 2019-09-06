<template>
    <div>
      <div class="modallist">
        <div class="item" v-for="(i,index) in productmodalarray" :key="index"@tap="choose(i)">
          <p>产品名称 :{{name}}</p>
          <p class="modal">产品型号 : {{i.applCode}}</p>
        </div>
      </div>
    </div>
</template>

<script>
  import {getProductModal,getInstallProductTypes,getToken} from "../../api/api";
import {navigate} from "../../utils/index";

  export default {
    name: "index",
    data(){
      return {
        name:'',
        pdv:'',
        productmodalarray:[],
        logo:''
      }
    },
   async onLoad(){
       this.name = wx.getStorageSync('productInfo').name;
       this.pdv = wx.getStorageSync('productInfo').pdv;
      wx.showLoading({title: '加载中',mask: true})
      //获取bstoken
      const formData= {
        account:"admin",
        password:"admin"
      }
      wx.removeStorageSync('bstoken');
      await getToken(formData).then(function (res) {
        wx.setStorageSync('bstoken', res.data.data.token)
      })
      //获取产品类别
      // const data={
      //   source:1
      // }
      // await getInstallProductTypes(data).then(res=>{
      //   for (let i=0;i<res.data.data.length;i++) {
      //     if(res.data.data[i].typeName  == this.name){
      //         this.pdv = res.data.data[i].pdv;
      //         this.id = res.data.data[i].typeId;
      //         this.logo = res.data.data[i].scanImg;
      //     }
      //   }
      // })
     const dat = {
       source: 0,
       pdv: this.pdv
     };
      this.productmodalarray = [];
     await  getProductModal(dat).then(res => {
       for (let i = 0; i < res.data.data.length; i++) {
         let item={
           applCode:res.data.data[i].applCode,
           id:this.id
         }
         this.productmodalarray.push(item);
       }
       this.$forceUpdate()
     });
     wx.hideLoading();

   },
    methods:{
      choose(i){
       let pro= wx.getStorageSync('productInfo')
        // let item ={
        //   name:this.name,
        //   vib:i.applCode,
        //   id:i.id,
        //   logo:this.logo
        // }
        // pro.name = this.name;
        pro.vib = i.applCode
        wx.setStorageSync('productInfo', pro)
        navigate('/pages/product/main')
      }
    }
  };
</script>

<style  lang="less">
  page{
    background: #fff;
  }
  .modallist{
    padding: 15px;
    .item{
      padding: 15px 8px;
      border-radius: 8px;
      box-shadow:0px 0px 30px 0px rgba(60,70,75,0.08);
      font-size: 14px;
      margin-bottom: 20px;
      .modal{
        margin-top: 8px;
      }
    }
  }
</style>
