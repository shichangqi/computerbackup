<template>
  <div class="selectpro" >
    <div class="cantfind"  v-if="show" catchtouchmove="ture">
      <div class="modal">
        <h5>哪里可以找到产品二维码</h5>
        <scroll-view scroll-y="true" class="scroll">
          <img src="../../static/images/notfind.jpg">
        </scroll-view>
        <div class="closebtn" @tap="onhidden">知道了</div>
      </div>
    </div>

    <div class="cantfindmodal"  v-if="showmodal" catchtouchmove="ture">
      <div class="modal">
        <h5>哪里可以找到产品型号</h5>
        <scroll-view scroll-y="true" class="scroll">
          <div class="desc">
            <p class="p1">洗衣机 / 洗干一体机 / 烘干机 (W开头)</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：洗衣机门内框上  </p>
            <img src="../../static/images/modalicon1.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">上下两门冰箱 / 上下三门冰箱	  (K开头)</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：冰箱内腔右壁  </p>
            <img src="../../static/images/modalicon2.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">对开门冰箱 / 多门冰箱		  (K开头)</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：冰箱内腔右壁  </p>
            <img src="../../static/images/modalicon3.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">吸油烟机  (L开头)</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：机器平板顶部或烟囱右侧  </p>
          </div>
          <div class="desc">
            <p class="p1">吸油烟机  (D开头)</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：机器平板顶部或烟囱右侧  </p>
            <img src="../../static/images/modalicon4.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">灶具	(E开头)</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：机器底部  </p>
          </div>
          <div class="desc">
            <p class="p1">灶具  (P开头)</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：机器底部  </p>
            <img src="../../static/images/modalicon5.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">消毒柜  (HS开头)</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：机身右侧  </p>
            <img src="../../static/images/modalicon6.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">洗碗机	 (S开头)</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：机器门内上侧或右侧  </p>
            <img src="../../static/images/modalicon7.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">烤箱 / 蒸箱 / 蒸汽炉	  (H或C开头)</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：机器门框左侧  </p>
            <img src="../../static/images/modalicon8.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">微波炉	 (H或B开头)</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：机器门框左侧  </p>
            <img src="../../static/images/modalicon9.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">电热水器		 (D开头)</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：机身上  </p>
          </div>
          <div class="desc">
            <p class="p1">咖啡机</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：机身上  </p>
          </div>
          <div class="desc">
            <p class="p1">酒柜	 (K开头)</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：酒柜内腔右壁  </p>
            <img src="../../static/images/modalicon10.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">暖碟抽屉	 (HW或BI开头)</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：机器门框右侧  </p>
            <img src="../../static/images/modalicon11.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">饮水机</p>
            <p class="p2">1.纸质发票或电子发票 </p>
            <p class="p2">2.中国能效标识贴纸上 </p>
            <p class="p2">3.扫描机身二维码  </p>
            <p class="p2">4.特定位置：机身上  </p>
          </div>

        </scroll-view>
        <div class="closebtn" @tap="onhiddenmodal">知道了</div>
      </div>
    </div>
    <div class="list">
      <div class="card" :class="'card'+i%4" v-for="(c,i) in prolist" :key="i">
        <div class="ll">
          <img :src="c.logo" alt="" v-if="c.logo">
          <div class="replacelogo"v-if="!c.logo"></div>
          <div class="info">
            <p class="p1">{{c.productName}}</p>
            <p class="p2">产品型号: {{c.vib}}</p>
          </div>
        </div>
        <span @tap="selectproduct(c)" class="sele_span">选择 ></span>
      </div>
      <p class="more"v-if="list.length!=0"@tap="more">更多已绑定产品 ···</p>

    </div>
    <div class="bind">
      <p class="title">添加我的产品</p>
      <div class="inputs">
        <div class="list">
          <div class="typecheck">
            <input type="text" placeholder="请选择产品类别"v-model="productType" placeholder-style="color:rgba(60, 70, 75, .4);font-size:12px"@focus="inputfocus1" >
            <div class="modalcover" v-if="showprotypemodal">
              <scroll-view scroll-y="true" class="pscroll">
                <p v-for="(i,index) in protypemodals" :key="i"  @tap.stop="checktypemodal(i)">{{i}}</p>
              </scroll-view>
            </div>
          </div>
          <div class="modalcheck">
            <input type="text" placeholder="请输入产品型号"v-model="productmodal" placeholder-style="color:rgba(60, 70, 75, .4);font-size:12px" @focus="inputfocus" @input="modalinput">
            <div class="modalcover" v-if="showpromodal" >
              <scroll-view scroll-y="true" class="pscroll">
              <p @tap.stop="checkmodal(5)" v-if="productType">未知型号</p>
              <p v-for="(i,index) in productmodals" :key="i"  @tap.stop="checkmodal(i)">{{i}}</p>
              </scroll-view>
            </div>
          </div>
        </div>
        <div class="qr">
          <img src="../../static/images/qrbg.png" alt="" @tap="scanQR">
          <p>扫码添加</p>
        </div>
      </div>
      <p class="bottom"><span @tap="onshowmodal">找不到产品型号?<img src="../../static/images/what.png" alt=""></span>
        <span class="qrnot"@tap="onshow">找不到二维码?<img src="../../static/images/what.png" alt=""></span></p>
      <div class="bindbtn"  @tap="submit">确认添加</div>
    </div>
  </div>

</template>

<script>
  import {getToken,getInstallProductTypes,getProductModal,productBind,queryProductBind,bindProduct} from "../../api/api";
  import {goBack} from "../../utils/index";

  export default {
    data(){
      return {
        index:0,
        producttypearray:[],
        productType:'',
        productmodalarray:[],
        productmodal:'',
        show:false,
        showmodal:false,
        animationData: {},
        list:[],
        productTypes:[],
        typeId:0,
        logo:'',
        applName:'',
        modals:[],
        showpromodal:false,
        showprotypemodal:false,
        productmodals:[],
        protypemodals:[],
        pdv:'',
        prolist:[],
        typelist:[],
        from:0,
        first:true,
        toup:false
      }
    },
    async onLoad(option){
      Object.assign(this.$data, this.$options.data())
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

      await queryProductBind().then(res=>{
        this.list = res.data
        this.list.forEach((item,index)=>{
          if(index<5){
            this.prolist.push(item)
          }
            if(option.id == item.id){
              item.selected = true;

            }else{
              item.selected = false;
            }
          }
        )
      })
      //获取产品类别
      const data={
        source:1
      }
      await getInstallProductTypes(data).then(res=>{
        this.productTypes = res.data.data;
        for (let i=0;i<res.data.data.length;i++) {
          this.producttypearray.push(res.data.data[i].typeName)
        }
        this.protypemodals = this.producttypearray;
        console.log(this.productTypes)
        wx.hideLoading();
      })
      if(option.type){
        this.from = option.type
        this.typelist = JSON.parse(option.protype)
      }

      // if(option.address){
      //   this.address = JSON.parse(option.address)
      // }
    },
    methods:{
      more(){
        if(!this.toup){
          this.prolist = this.list;
          this.toup = true;
        }else{
          this.prolist = [];
          for(let i=0;i<this.list.length;i++){
            if(i<5){
              this.prolist.push(this.list[i])
            }
          }
          this.toup = false;
        }
      },
      inputfocus(){
        if(this.productmodals.length != 0 ){
          this.showpromodal = true;
        }
      },

      modalinput(e){
        let str = e.mp.detail.value
        this.productmodals=[];
        for(let i = 0;i<this.productmodalarray.length;i++){
          if(this.productmodalarray[i].toLowerCase().indexOf(str.toLowerCase()) != -1){
            this.productmodals.push(this.productmodalarray[i])
          }
        }
        this.$forceUpdate()

      },
      inputfocus1(){
          this.showprotypemodal = true;
        this.showpromodal = false;

      },


      checkmodal(i){
        if(i == 5 ){
          this.productmodal = '未知型号'
          this.applName = '未知型号';

        }else{
          this.productmodal = i
          this.modals.forEach(item=>{
            if(i == item.applCode){
              this.applName = item.applName;
            }
          })
        }

        this.showpromodal = false

      },
     async checktypemodal(i){
       this.productType = i;
        this.productmodalarray = [];
        this.productmodals = [];
        this.productmodal='';
       let pdv='';
        this.productTypes.forEach((item)=>{
          if(i == item.typeName){
            this.typeId = item.typeId;
            this.logo = item.scanImg;
            pdv = item.pdv;
            this.pdv= pdv;
          }
        })

        const data={
          source:1,
          pdv:pdv
        }
        wx.showLoading({title: '加载中',mask: true})
        //获取bstoken
        const formData = {
          account: "admin",
          password: "admin"
        };
        wx.removeStorageSync("bstoken");
        await getToken(formData).then(function(res) {
          wx.setStorageSync("bstoken", res.data.data.token);
        });
        await getProductModal(data).then(res=>{
          this.modals = res.data.data;
          for (let i=0;i<res.data.data.length;i++) {
            this.productmodalarray.push(res.data.data[i].applCode)
            this.productmodals.push(res.data.data[i].applCode)
          }
          wx.hideLoading();
        })
        this.showprotypemodal = false;
      },
      scanQR() {
        wx.scanCode({
          success: res => {
            let str = decodeURI(res.result);
            let goodsId = this.GetUrlParam(str, "EN");
            let fd = this.GetUrlParam(str, "fd");
            let sn = this.GetUrlParam(str, "zn");
            this.bind(goodsId, fd, sn, 1)
          },
          fail: res => {
            console.log(res);
          }
        });
      },

      // 获取地址栏信息
      GetUrlParam(url, paraName) {
        var arrObj = url.split("?");
        if (arrObj.length > 1) {
          var arrPara = arrObj[1].split("&");
          var arr;
          for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");
            if (arr != null && arr[0] == paraName) {
              return arr[1];
            }
          }
          return "";
        } else {
          return "";
        }
      },

      // 绑定机器
      bind (id, fd, sn, type) {
        bindProduct({
          vib: id,
          fd: fd,
          sn: sn,
          sourceType: type
        }).then(res => {
          if(res.data.code == -1){
            wx.showToast({ title: "未检索到产品", icon: "none", mask: true });
          } else {
            if(res.data.code == 1){
              wx.showToast({ title: '添加成功!', icon: 'none', mask: true })
            }else if(res.data.code == 0){
              wx.showToast({ title: '产品列表中已有该机器!', icon: 'none', mask: true })
            }
            this.prodectInfo = res.data

            queryProductBind().then(res=>{
              if(this.prolist.length<5){
                this.prolist = res.data
                this.list = res.data
              }else{
                this.prolist = [];
                this.list = res.data
                for(let i=0;i<res.data.length;i++){
                  if(i<5){
                    this.prolist.push(this.list[i])
                  }
                }
              }
              this.list.forEach((item,index)=>{
                  item.selected = false;
                }
              )
            })
          }
        })
      },
      selectproduct(obj,index){
        if(this.from == 1 || this.from == 3){//安装
          let flag = false;
          this.typelist.forEach(item=>{
            if(obj.productName == item){
              flag = true
            }
          })
          if(!flag){
            wx.showToast({ title: "该产品类别不适用此项服务", icon: "none", mask: true });
            return;
          }
        }else if(this.from == 2){//维修
          let flag = false;
          this.typelist.forEach(item=>{
            if(obj.productName == item.label){
              flag = true
            }
          })
          if(!flag){
            wx.showToast({ title: "该产品类别不适用此项服务", icon: "none", mask: true });
            return;
          }
        }else if(this.from == 4){//预埋烟管
          if(obj.productName != '吸油烟机'){
            wx.showToast({ title: "该产品类别不适用此项服务", icon: "none", mask: true });
            return;
          }
        }else if(this.from == 5){//换门方向
          if(obj.productName.indexOf('上下两门冰箱') == -1 && obj.productName.indexOf('上下三门冰箱') == -1 && obj.productName.indexOf('酒柜') == -1){
            wx.showToast({ title: "该产品类别不适用此项服务", icon: "none", mask: true });
            return;
          }
        }

        wx.setStorageSync('selectPro',JSON.stringify(obj));
        goBack();
      },
      submit(){
        let that = this;
        if(!that.first){
          wx.showToast({ title: "您已点击哦~", icon: "none", mask: true });
          return;
        }
        that.first = false
        if (!this.productType) {
          wx.showToast({ title: "请选择产品类别", icon: "none", mask: true });
          return;
        }
        if (!this.productmodal) {
          wx.showToast({ title: "请选择产品型号", icon: "none", mask: true });
          return;
        }
        let  data={}
        if(this.productmodal == '未知型号'){
            data={
            productName:this.productType,
            vib:this.pdv+'未知型号',
            sourceType:2,
            productId:this.typeId,
            logo:this.logo,
            name:this.applName
          }
        }else{
          data={
            productName:this.productType,
            vib:this.productmodal,
            sourceType:2,
            productId:this.typeId,
            logo:this.logo,
            name:this.applName
          }
        }
        productBind(data).then(res=>{
          if(res.status == 200){
            if(res.data.code == 1){
              wx.showToast({ title: '添加成功!', icon: 'none', mask: true })
            }else if(res.data.code == 0){
              wx.showToast({ title: '产品列表中已有该机器!', icon: 'none', mask: true })
            }
            that.first = true;

            queryProductBind().then(res=>{
              if(this.prolist.length<5){
                this.prolist = res.data
                this.list = res.data
              }else{
                this.prolist = [];
                this.list = res.data
                for(let i=0;i<res.data.length;i++){
                  if(i<5){
                    this.prolist.push(this.list[i])
                  }
                }
              }
              this.list.forEach((item,index)=>{
                  item.selected = false;
                }
              )
            })
          }
        })
      },
      onshow() {
        this.show = true;
      },
      onhidden() {
        this.show = false;
      },
      onshowmodal() {
        this.showmodal = true;
      },
      onhiddenmodal() {
        this.showmodal = false;
      },
      async producttypechange(e){
        this.productmodalarray = [];
        this.productmodal='';
        this.typeId = this.productTypes[e.mp.detail.value].typeId;
        this.logo = this.productTypes[e.mp.detail.value].scanImg;
        this.productType = this.producttypearray[e.mp.detail.value];
        let pdv = this.productTypes[e.mp.detail.value].pdv;
        const data={
          source:1,
          pdv:pdv
        }
        wx.showLoading({title: '加载中',mask: true})
        //获取bstoken
        const formData = {
          account: "admin",
          password: "admin"
        };
        wx.removeStorageSync("bstoken");
        await getToken(formData).then(function(res) {
          wx.setStorageSync("bstoken", res.data.data.token);
        });
        await getProductModal(data).then(res=>{
          this.modals = res.data.data;
          for (let i=0;i<res.data.data.length;i++) {
            this.productmodalarray.push(res.data.data[i].applCode)
              this.productmodals.push(res.data.data[i].applCode)
          }
          wx.hideLoading();
        })
      },
      productmodalchange(e){
        this.productmodal = this.productmodalarray[e.mp.detail.value];
        this.applName = this.modals[e.mp.detail.value].applName;
      },

    }
  };
</script>

<style  lang="less">
  @import "../../utils/flex.less";
  page{
    background: #fff;
  }
  .selectpro{
    .cantfind {
      position: fixed;
      width:100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
      /*padding: 20px;*/
      background: rgba(0, 0, 0, 0.6);
      z-index: 8888;
      height: 100%;
      text-align: center;
      .modal{
        background: #fff;
        border-radius: 8px;
        padding:23px 20px 20px;
        width: 70%;
        margin: 105px auto ;
        h5{
          color: #3C464B;
          font-size: 18px;
        }
        .scroll{
          margin-top: 12px;
          height: 280px;
          white-space: nowrap;
          padding: 0 17px;
          img {
            width: 100%;
            height: 1000px;
          }
        }
        .closebtn{
          width: 100%;
          height: 35px;
          border-radius: 5px;
          background: #107BB8;
          /*border: 1px solid #41aaaa;*/
          line-height: 35px;
          margin: 20px auto;
          font-size: 14px;
          color: #fff;
        }

      }

    }
    .cantfindmodal {
      position: fixed;
      width:100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
      /*padding: 20px;*/
      background: rgba(0, 0, 0, 0.6);
      z-index: 8888;
      height: 100%;
      text-align: center;
      .modal{
        background: #fff;
        border-radius: 8px;
        padding:23px 20px 20px;
        width: 70%;
        margin: 105px auto ;
        h5{
          color: #3C464B;
          font-size: 18px;
        }
        .scroll{
          margin-top: 12px;
          height: 280px;
          white-space: nowrap;
          padding: 0 17px;
          .desc{
            margin-top: 18px;
            text-align: left;
            .p1{
              font-size: 12px;
              margin-bottom: 8px;
            }
            .p2{
              font-size: 11px;
              line-height: 16px;
            }
            img{
              width: 100px;
              height: 100px;
            }
          }
        }
        .closebtn{
          width: 100%;
          height: 35px;
          border-radius: 5px;
          background: #107BB8;
          /*border: 1px solid #41aaaa;*/
          line-height: 35px;
          margin: 20px auto;
          font-size: 14px;
          color: #fff;
        }
      }
      img {
        width: 90%;
        height: 1000px;
      }
    }
    .list{
      padding: 7px 15px 13px 15px;
      /*background: #F4F4F4;*/
      .card{
        width: 90%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 25px;
        .ll{
          display: flex;
          align-items: center;
          img{
            width: 45px;
            height: 47px;
            margin:0 23px;
          }
          .replacelogo{
            width: 45px;
            height: 47px;
            margin:0 23px;
          }
          .info{
            .p1{
              font-size: 13px;
            }
            .p2{
              font-size: 9px;
              margin-top: 4px;
            }
          }
        }
        span{
          flex: 1;
          font-size: 13px;
          padding: 20px;
          text-align: right;
        }
      }
      .card0{
        background: url("../../static/images/selepro_bg1.png") no-repeat;
        background-size: 100% 100%;
      }
      .card1{
        background: url("../../static/images/selepro_bg2.png") no-repeat;
        background-size: 100% 100%;
      }
      .card2{
        background: url("../../static/images/selepro_bg3.png") no-repeat;
        background-size: 100% 100%;
      }
      .card3{
        background: url("../../static/images/selepro_bg4.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .more{
      text-align: center;
      font-size: 10px;
    }
    .bind{
      margin-top: 34px;
      padding: 0 20px;
      input{
        border-bottom: 1px solid #A5A5A5;
        width: 239px;
        height: 30px;
      }
      .title{
        font-size: 14px;
      }
      .inputs{
        display: flex;
        .list{
          padding: 0;
          /*background: #fff;*/
          .modalcheck{
            margin-top: 23px;
          }
          .typecheck{
            margin-top: 23px;
          }
        }
        .qr{
          text-align: center;
          margin-left: 35px;
          margin-top: 28px;
          img{
            width: 48px;
            height: 48px;
          }
          p{
            margin-top: 11px;
            font-size: 11px;
          }
        }
      }
      .bottom{
        margin-top: 14px;
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: rgba(60, 70, 75, 7);
        img{
          width: 12px;
          height: 12px;
          margin-bottom: -1px;
        }
        .qrnot{
          margin-right: 20px;
        }
      }
      .bindbtn{
        height:47px;
        line-height: 47px;
        color: #fff;
        background:rgba(16,123,184,1);
        border-radius:10px;
        text-align: center;
        margin: 20px 0;
      }
    }
    .modalcheck{
      position: relative;
      .display_flex;
      .modalcover{
        position: absolute;
        top: 30px;
        right: 0;
        width: 100%;
        background: #fff!important;
        border: 1px solid rgba(226, 227, 228, 1);
        padding: 0 8px 8px;
        .pscroll{
          white-space: nowrap;
          height: 200px!important;
          p{
            padding: 5px;
            height: 22px;
            border-bottom: 1px solid rgba(226, 227, 228, 1);
          }
        }

      }

    }
    .typecheck{
      position: relative;
      .display_flex;
      .modalcover{
        position: absolute;
        top: 30px;
        right: 0;
        width: 100%;
        background: #fff!important;
        border: 1px solid rgba(226, 227, 228, 1);
        padding: 0 8px 8px;
        z-index: 999;
        .pscroll{
          white-space: nowrap;
          height: 200px!important;
          p{
            padding: 5px;
            height: 22px;
            border-bottom: 1px solid rgba(226, 227, 228, 1);
          }
        }

      }

    }
  }



</style>
