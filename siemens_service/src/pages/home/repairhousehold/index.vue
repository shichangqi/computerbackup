<template>
    <div class="repairnothousehold">
      <div class="notqr">
        <div class="cantfind"  :animation="animationData" v-if="show"catchtouchmove="ture">
          <div class="modal">
            <p>请确认家电二维码的位置：</p>

            <scroll-view scroll-y="true" class="scroll">
              <img src="../../../static/images/notfind.jpg" alt>
            </scroll-view>
            <div class="closebtn"@tap="onhidden">知道了</div>
          </div>
        </div>
        <div class="calendar2" v-if="calendar2"catchtouchmove="ture">
          <div class="container2" @tap.stop="calendar2 = false"></div>
          <div class="container">
            <Calendar @select="selectdate2" :begin="begin2"ref="calendar2"/>
          </div>
        </div>
        <div class="top" v-if="isQR == false">
          <div class="top-content">
            <div class="qrcontent">
              <img src="../../../static/images/qrcode_icon.png"@tap="scanQR">
              <p>扫描机身二维码</p>
            </div>
            <p class="notfind"@tap="onshow">找不到二维码？</p>

          </div>

          <p class="top_bottom" @tap="changePro">更换产品 <img src="../../../static/images/right_icon.png"></p>
        </div>
        <div class="top-2" v-if="isQR">
          <div class="top-content">
            <p class="title"><span>产品信息</span> <img src="../../../static/images/qr_icon.png" @tap="scanQR"></p>
            <div class="productinfo">
              <div class="img">
                <img :src="prodectInfo.logo" alt="">
              </div>
              <div class="right">
                <p>产品类型：{{productType}}</p>
                <p class="p2">产品型号：{{productmodal}}</p>
              </div>
            </div>
          </div>

          <p class="top-2_bottom" @tap="changePro">更换产品 <img src="../../../static/images/right_icon.png"></p>
        </div>
        <mpvue-picker ref="typePicker" mode="selector" @onCancel="onCancel"  @onConfirm="producttypechange"  :pickerValueArray="productpicker"></mpvue-picker>

        <div class="form1">
          <div class="productid_panel panel" v-if="isQR == false">
            <!--<picker  :value="index" :range="producttypearray" @change="producttypechange">-->
            <p @tap="typeclick"><span class="panel_name">产品类别</span>
              <span class="check_name">{{productType?productType:'请选择'}} <img src="../../../static/images/right_icon.png"></span>
            </p>
            <!--</picker>-->
          </div>
          <div class="panel" v-if="isQR == false">
            <p><span class="panel_name">产品型号</span>
              <span class="check_name modalcheck">
                 <input type="text" placeholder="请选择" v-model="productmodal"placeholder-style="color:rgba(184,195,202,1);font-size:14px"  @focus="inputfocus" @input="modalinput">
                      <div class="modalcover" v-if="showpromodal">
                        <scroll-view scroll-y="true" class="pscroll">
                        <p @tap.stop="checkmodal(5)" v-if="productType">未知型号</p>
                        <p v-for="(i,index) in productmodals" :key="i"  @tap.stop="checkmodal(i)">{{i}}</p>
                        </scroll-view>
                      </div>
                <img src="../../../static/images/right_icon.png">
              </span>
            </p>

          </div>
          <div class="productid_panel panel">
            <picker  :value="index" :range="faulttypearray" @change="faulttypechange">
            <p><span class="panel_name">故障类别</span>
                <span class="check_name">{{faultType?faultType:'请选择'}} <img src="../../../static/images/right_icon.png"></span>
            </p>
            </picker>
          </div>
        </div>
      </div>
      <!--<div class="otherrequire">-->
        <!--<h5>故障描述</h5>-->
        <!--<div class="textarea">-->
          <!--<textarea placeholder="输入故障描述" @input="textinput"  maxlength="200" placeholder-style="font-size:14px;color:#B8C3CA;" v-model="desc"></textarea>-->
          <!--<p>{{num}}/200</p>-->
        <!--</div>-->
      <!--</div>-->
  <div class="otherrequire"v-if="!show && calendar2 == false && spicker == false">
    <p>其他要求</p>
    <textarea placeholder="选填"  placeholder-style="font-size:14px;color:#B8C3CA;" v-model="desc"></textarea>
  </div>
      <div class="contact">
        <div class=" contactpanel" @tap="selectcontactor">
          <p><span class="panel_name">联系方式</span>
            <span class="check_name" >{{address.name?'已选择':'请选择'}}  <img src="../../../static/images/right_icon.png"></span>
          </p>
          <div class="contact"v-if="address.name" >
            <div class="info">
              <p><span>{{address.surname+address.name}}{{address.sex == 1?'先生':'女士'}}</span><span>{{address.mobile}}</span></p>
              <p class="address">{{address.province}}{{address.city}}{{address.country}}{{address.addr}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="remarks"v-if="housetip">
        <p>*小家电产品需要送到服务中心维修，提交预约后，请您查看寄送的服务中心地址，工程师也会与您电话联系。</p>
      </div>
      <div class="form2"v-if="!housetip">
        <div class="panel"@tap="dateChange">
          <!--<picker mode="date" :value="date"  @change="dateChange":start="startdate">-->
          <p class="panelmar"><span class="panel_name">期望上门时间</span>
              <span class="check_name">{{date?date:'请选择上门时间'}} <img src="../../../static/images/right_icon.png"></span>
          </p>
          <!--</picker>-->
        </div>
        <div class="panel">
          <p @tap="timeclick"><span class="panel_name">期望服务时段</span>
              <span class="check_name">{{timetext?timetext:'请选择服务时段'}} <img src="../../../static/images/right_icon.png"></span>
          </p>
        </div>
      </div>
      <div class="bottom">
        <div class="btns">
          <div class="packagerepair" @tap="toproductrepair">产品包修规定</div>
          <div class="chargingstandard" @tap="chargingstandard">客户服务收费标准</div>
        </div>
        <div class="agreement">
          <div class="agree"@tap="agree(1)">
            <img :src="agree1?'../../../static/images/selected_icon.png':'../../../static/images/select_icon.png'">
            <p>我已阅读并同意 西门子家电 <span @tap.stop="gopro">《隐私保密规定》</span><span @tap.stop="gouse">《使用条款》</span></p>
          </div>
          <div class="agree agree2" @tap="agree(2)">
            <img :src="agree2?'../../../static/images/selected_icon.png':'../../../static/images/select_icon.png'">
            <p>我已同意 西门子家电、其关联公司及其委托的第三方公司使用服务预约中登记的用户信息做售后回访、市场分析及调研、产品及品牌活动信息推荐，及其他相关市场推广活动等。我已知晓我输入的数据，会被存储并在这次服务中使用。</p>
          </div>
        </div>
        <button class="submit" @tap="getPhoneNumber">提交预约</button>
      </div>

    </div>
</template>

<script>
  import {navigate,reLaunch,formatTime,arrayTime,formatNumber} from "../../../utils/index";
  import {getInstallProductTypes,getProductModal,getToken,saveOrder,getUserPhone,wxordersave,bindProduct} from "../../../api/api";
  import Calendar from 'mpvue-calendar'
  import 'mpvue-calendar/src/style.css'
  import mpvuePicker from 'mpvue-picker';
  export default {
    components: {
      Calendar,
      mpvuePicker
    },
      data(){
        return{
          isQR:false,
          agree1:true,
          agree2:true,
          index:0,
          producttypearray:[],
          productType:'',
          productmodalarray:[],
          productmodal:'',
          faulttypearray:[],
          faultType:'',
          num:0,
          date:'',
          timearray: [
            {
              label:'09:00-11:00',
              value:0
            },
            {
              label:'11:00-14:00',
              value:1
            },
            {
              label:'14:00-16:00',
              value:2
            },
            {
              label:'16:00-18:00',
              value:3
            }
          ],
          timetext:'',
          show:false,
          animationData: {},
          productTypes:[],
          address:{},
          productId:0,
          delivedFlag:0,
          pro:{},
          desc:'',
          defaultid:0,
          defaultcode:0,
          prodectInfo:{},
          startdate:formatTime(new Date()),
          housetip:false,
          showpromodal:false,
          productmodals:[],
          begin2:arrayTime(new Date(new Date().getTime()+86400000)),
          calendar2:false,
          scanImg:'',
          spicker:false,
          pickertype:1,
          productpicker:[]
        }
      },
    onUnload() {
      wx.removeStorageSync("address");
      wx.removeStorageSync("selectPro");
      this.$refs.typePicker.pickerCancel();
    },
    async onLoad(option){
      Object.assign(this.$data, this.$options.data())
      this.startdate = formatTime(new Date(Date.parse(this.startdate)+86400000));
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
      const data={
        source:0
      }
      await getInstallProductTypes(data).then(res=>{
        this.productTypes = res.data.data;
        for (let i=0;i<res.data.data.length;i++) {
          if(res.data.data[i].typeName != '暖碟抽屉'){
            let arr={
              label:res.data.data[i].typeName,
              value :i
            }
            this.producttypearray.push(arr);
          }

        }
        this.productpicker = this.producttypearray;
        wx.hideLoading();
      })
      this.prodectInfo = JSON.parse(option.extraData)

      if(this.prodectInfo.name) {
        this.bind(this.prodectInfo.vib, this.prodectInfo.fd, this.prodectInfo.sn, 1)
        this.productTypes.forEach(it=>{
          it.wrongInfoList.forEach(item => {
            this.faulttypearray.push(item.wrongInfo);
            this.defaultid = item.id;
            this.defaultcode = item.diagCode;
          })
        })
        if(this.prodectInfo.name == '家用小电器'){
          this.housetip = true;
        }else {
          this.housetip = false;
        }
      }
    },
    onShow(){
      let address = wx.getStorageSync('address');
      if(address){
        this.address = address;
        this.timetext = '';
        if(address.province == '新疆'){
          let xjtimes=   [

            {
              label:'11:00-13:00',
              value:0
            },
            {
              label:'13:00-16:00',
              value:1
            },
            {
              label:'16:00-18:00',
              value:2
            },
            {
              label:'18:00-20:00',
              value:3
            }
          ]

          this.timearray=xjtimes;
        }else{
          let times=   [
            {
              label:'09:00-11:00',
              value:0
            },
            {
              label:'11:00-14:00',
              value:1
            },
            {
              label:'14:00-16:00',
              value:2
            },
            {
              label:'16:00-18:00',
              value:3
            }
          ]
          this.timearray=times;
        }
      }
      if(this.productTypes.length !=0){
        let pro = wx.getStorageSync('selectPro');
        if(pro){
          this.pro = JSON.parse(pro);
          this.productType = this.pro.productName;
          this.productmodal = this.pro.vib;
          this.productId = this.pro.id;
          this.productTypes.forEach(item=>{
            if(item.typeName == this.pro.productName){
              const data = {
                source: 0,
                pdv: item.pdv
              };
              getProductModal(data).then(res => {
                for (let i = 0; i < res.data.data.length; i++) {
                  this.productmodalarray.push(res.data.data[i].applCode);
                }

              });
            }
            if(this.pro.productId == item.typeId){
              item.wrongInfoList.forEach(item=>{
                this.faulttypearray.push(item.wrongInfo);
              })
            }

          })
        }
      }
    },
    methods:{
      typeclick(){
        this.productpicker = this.producttypearray;
        this.$refs.typePicker.show();
        this.pickertype = 1
        this.spicker = true
      },
      timeclick(){
        this.productpicker = this.timearray;
        this.$refs.typePicker.show();
        this.pickertype = 2
        this.spicker = true
      },
      onCancel(){
        this.spicker = false;
      },
      dateChange(e) {
        this.calendar2 = true;
      },
      selectdate2(v1){
        this.date = formatNumber(v1[0])+'/'+formatNumber(v1[1])+'/'+formatNumber(v1[2])
        this.calendar2 = false;
        this.$forceUpdate()
      },
      inputfocus(){
        this.productmodals = this.productmodalarray;

        if(this.productmodals.length != 0 ){
          this.showpromodal = true;
        }
      },

      checkmodal(i){
        if(i == 5){
          this.productmodal = "未知产品型号"
        }else{
          this.productmodal = i
        }
        this.showpromodal = false

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
      gopro(){
        navigate('/pages/privacyProvisions/main')
      },
      gouse(){
        navigate('/pages/termsOfUse/main')
      },
     async  getPhoneNumber(){
        let _this = this;
         let phone = wx.getStorageSync('phone')
                if(_this.agree1 && _this.agree2){

                  if(!_this.isQR){
                    if(!_this.productType){
                      wx.showToast({ title: '请选择产品类别', icon: 'none', mask: true })
                      return;
                    }
                    if(!_this.productmodal){
                      wx.showToast({ title: '请选择产品型号', icon: 'none', mask: true })
                      return;
                    }
                  }
                  if(!_this.address.name){
                    wx.showToast({ title: '请选择联系方式', icon: 'none', mask: true })
                    return;
                  }
                  if(!_this.faultType){
                    wx.showToast({ title: '请填写故障类别', icon: 'none', mask: true })
                    return;
                  }
                  if(!_this.housetip){
                    if(!_this.date){
                      wx.showToast({ title: '请选择上门时间', icon: 'none', mask: true })
                      return;
                    }
                  }
                  this.desc = this.desc.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, "");

                  const datas ={
                    addressId:_this.address.id,
                    source:0,
                    orderDate:this.housetip?_this.startdate.replace(/-/g,'/'):_this.date,
                    productId:_this.productId,
                    productSn:_this.productmodal,
                    timeRange:_this.timetext,
                    otherRequest:_this.desc+'微信授权手机号：'+ phone,
                    diagCodeInfo:_this.faultType,
                    delivedFlag: 1,
                    type:2,
                    diagCodeId:_this.defaultid,
                    diagCode:_this.defaultcode,
                    unionId:wx.getStorageSync('unionid'),
                    openId:wx.getStorageSync('openid')
                  }
                  wx.showLoading({title: '提交中',mask: true})
                  //获取bstoken
                  const formData = {
                    account: "admin",
                    password: "admin"
                  };
                  wx.removeStorageSync("bstoken");
                  await getToken(formData).then(function(res) {
                    wx.setStorageSync("bstoken", res.data.data.token);
                  });
                  saveOrder(datas).then(res=>{

                    if (res.data.flag == 1100) {
                      const od={
                        logo:_this.scanImg,
                        orderNo:res.data.actOrderId,
                        serviceType:2,
                        productId:_this.productId,
                        proName:_this.productType,
                        applCode:_this.productmodal,
                        expectationTime:this.housetip?_this.startdate.replace(/-/g,'/'):_this.date,
                        expectationTimeType:_this.timetext,
                        userName:_this.address.surname+_this.address.name,
                        userMobile:_this.address.mobile,
                        wehcatMobile:phone,
                        address:_this.address.province+_this.address.city+_this.address.country+_this.address.addr,
                        orderStatus:1
                      }
                      wxordersave(od).then(res=>{
                        wx.hideLoading();
                      wx.showToast({
                        title: "提交成功",
                        icon: "success",
                        duration: 2000
                      });
                      wx.removeStorageSync("address");
                      wx.removeStorageSync("selectPro");
                        if(_this.productType == '家用小电器'){
                          reLaunch(`/pages/repairsuccess/main?tip=${JSON.stringify(_this.tip)}&address=${JSON.stringify(_this.address)}`)
                        }else{
                          reLaunch(`/pages/repairsuccessnot/main?tip=${JSON.stringify(_this.tip)}&address=${JSON.stringify(_this.address)}`)

                        }
                    })
                    } else {
                      wx.showToast({
                        title: res.data.msg,
                        icon: "none",
                        duration: 2000
                      });
                    }
                  })
                }else{
                  wx.showToast({ title: '请先同意协议', icon: 'none', mask: true })
                  return;
                }




      },
      onshow() {
        this.show = true;
      },
      onhidden() {
        this.show = false;
      },
      scanQR() {
        let _this = this;
        wx.scanCode({
          success: res => {
            let str = decodeURI(res.result);
            let goodsId = _this.GetUrlParam(str, "EN");
            let fd = _this.GetUrlParam(str, "Fd");
            let sn = _this.GetUrlParam(str, "zn");
            _this.bind(goodsId, fd, sn, 1)
            console.log(res)
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
          console.log('res', res)
          if (res.data.code == -1) {
            wx.showToast({ title: "未检索到产品", icon: "none", mask: true });
          } else {
            if(res.data.data.productName == '暖碟抽屉'){
              wx.showToast({ title: "此产品不可用", icon: "none", mask: true });
              return ;
            }
            this.prodectInfo = res.data.data
            this.productmodal = this.prodectInfo.vib
            this.productType = this.prodectInfo.name
            this.productId = this.prodectInfo.productId
            this.productTypes.forEach(item=>{
              if(item.typeName == this.prodectInfo.name){
                item.wrongInfoList.forEach(item=>{
                  this.faulttypearray.push(item.wrongInfo);
                })
              }
            })
            if(this.prodectInfo.name == '家用小电器'){
              this.housetip = true;
            }else {
              this.housetip = false;
            }
            this.isQR = true
          }
        })
      },
      toproductrepair(){
        navigate('/pages/productguarantees/main')
      },
      chargingstandard(){
        navigate('/pages/chargingstandard/main')
      },
      agree(index){
        if(index == 1){
          this.agree1 = !this.agree1;
        }else{
          this.agree2 = !this.agree2;
        }
      },
      timechange(e){
        this.timetext = this.timearray[e.mp.detail.value];
      },
      // dateChange(e){
      //   this.date = e.mp.detail.value.replace(/-/g, "/");
      // },
      selectcontactor(){
        navigate('/pages/contactWay/main')
      },
      textinput(e){
        this.num =e.mp.detail.value.length;
      },
      changePro(){
        navigate(`/pages/selectProduct/main?id=${this.pro.id}&protype=${JSON.stringify(this.producttypearray)}&type=2`)
      },
      faulttypechange(e){
        this.faultType = this.faulttypearray[e.mp.detail.value];
      },
     async producttypechange(e){
       this.spicker = false;
       if(this.pickertype == 1) {
         this.productmodalarray = [];
         this.faulttypearray = [];
         this.productmodal = '';
         for (let i = 0; i < this.productTypes.length; i++) {
           if (this.productTypes[i].typeName == e.label) {
             this.productType = e.label;
             let pdv = this.productTypes[i].pdv;
             this.scanImg = this.productTypes[i].scanImg;
             if (this.productType == '家用小电器') {
               this.housetip = true;
             } else {
               this.housetip = false;
             }
             // this.tip = this.installtips[e.mp.detail.value];
             const data = {
               source: 0,
               pdv: pdv
             }
             wx.showLoading({ title: '加载中', mask: true })
             //获取bstoken
             const formData = {
               account: "admin",
               password: "admin"
             };
             wx.removeStorageSync("bstoken");
             await getToken(formData).then(function(res) {
               wx.setStorageSync("bstoken", res.data.data.token);
             });
             this.productmodals = [];
             await getProductModal(data).then(res => {
               for (let i = 0; i < res.data.data.length; i++) {
                 this.productmodalarray.push(res.data.data[i].applCode)
                 this.productmodals.push(res.data.data[i].applCode)
               }
               wx.hideLoading();

             })
             this.productTypes[i].wrongInfoList.forEach(item => {
               this.faulttypearray.push(item.wrongInfo);
               this.defaultid = item.id;
               this.defaultcode = item.diagCode;
             })

             this.productId = this.productTypes[i].typeId;
           }
         }
       }else if(this.pickertype == 2){
         this.timetext =e.label;
       }

      },
      productmodalchange(e){
        this.productmodal = this.productmodalarray[e.mp.detail.value];
      },

    }
  };
</script>

<style scoped lang="less">
  @import "../../../utils/flex.less";
.repairnothousehold{
  .notqr{
    background: #fff;
    .calendar2{
      position: fixed;
      top:0;
      right:0;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 999;
      .container2{
        position: absolute;
        top:0;
        right:0;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 998;
        opacity: .6;
        background: rgb(0,0,0,.6);
      }
      .container{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 999;
        opacity: 1;
        background: #fff;
      }
    }
    .modalcheck{
      position: relative;
      .display_flex;
      .align-items_center;
      .modalcover{
        position: absolute;
        top: 44px;
        right: 0;
        width: 100px;
        background: #fff;
        border: 1px solid rgba(226, 227, 228, 1);
        padding: 0 8px 8px;
        z-index: 999;
        .pscroll{
          white-space: nowrap;
          height: 135px
        }
        p{
          padding: 0;
          height: 22px;
        }
      }
      input{
        height: 44px;
        text-align: right;
      }
    }
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
        p{
          padding: 15px 0;
          color: #41aaaa;
          font-size: 14px;
          border-bottom: 1px solid rgba(226, 227, 228, 1);
        }
        .scroll{
          height: 350px;
          white-space: nowrap;
        }
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

      img {
        width: 90%;
        height: 1000px;
      }
    }
    .top-2{
      background: #fff;
      -moz-box-shadow:0 5px 10px 0 rgba(60,70,75,0.05);/*firefox*/
      -webkit-box-shadow:0 5px 10px 0 rgba(60,70,75,0.05);/*webkit*/
      box-shadow:0 5px 10px 0 rgba(60,70,75,0.05);/*opera或ie9*/
      .top-content{
        padding: 13px 15px;
        .title{
          .display_flex;
          .justify-content_space_flex-justify;
          span{
            color: #3C464B;
            font-size: 16px;
          }
          img{
            width: 18px;
            height: 18px;
          }
        }
        .productinfo{
          margin-top: 12px;
          .display_flex;
          .img{
            text-align: center;
            width:58px;
            height:58px;
            background:rgba(255,255,255,1);
            border-radius:6px;
            border:1px solid rgba(226,227,228,1);
            .display_flex;
            .align-items_center;
            .justify-content_flex-center;
            img{
              width: 45px;
              height: 33px;
            }
          }
          .right{
            margin-left: 10px;
            .display_flex;
            .justify-content_flex-center;
            .flex-direction_column;
            p{
              color: #6D7478;
              font-size: 14px;
              line-height: 20px;
            }
            .p2{
              margin-top: 6px;
            }
          }
        }
      }
      &_bottom{
        color: #41AAAA;
        font-size: 12px;
        margin-left: 15px;
        border-top: 1px solid #E2E3E4;
        padding: 12px 0;
        img{
          width: 6px;
          height: 11px;
          margin-left: 5px;
        }
      }
    }
    .top{
      background: #fff;
      -moz-box-shadow:0 5px 10px 0 rgba(60,70,75,0.05);/*firefox*/
      -webkit-box-shadow:0 5px 10px 0 rgba(60,70,75,0.05);/*webkit*/
      box-shadow:0 5px 10px 0 rgba(60,70,75,0.05);/*opera或ie9*/
      .top-content{
        position: relative;
        padding: 0 15px 13px 15px;
        .qrcontent{
          .display_flex;
          .flex-direction_column;
          .align-items_center;
          img{
            width: 100px;
            height: 100px;
            margin-top: 23px;
            /*margin-bottom: 12px;*/
          }
          p{
            color: #879BAA;
            font-size: 14px;
          }
        }
        .notfind{
          position: absolute;
          top: 23px;
          right: 15px;
          color: #41AAAA;
          font-size: 12px;
        }

      }
      &_bottom{
        color: #41AAAA;
        font-size: 12px;
        margin-left: 15px;
        border-top: 1px solid #E2E3E4;
        padding: 12px 0;
        img{
          width: 6px;
          height: 11px;
          margin-left: 5px;
        }
      }
    }
    .form1{
      margin-top: 10px;
      background: #f6f6f6;
      .expectpanel{
        margin-bottom: 10px!important;
      }
      .panel{
        height: 44px;
        padding: 0 15px;
        border-bottom: 1px solid #E2E3E4;
        background: #fff;
        p{
          .display_flex;
          .justify-content_space_flex-justify;
          font-size: 14px;
          line-height: 44px;
          .panel_name{
            color: #3C464B;
          }
          .check_name{
            color: #B8C3CA;
            img{
              width: 8px;
              height: 14px;
              margin-bottom: -2px;
              margin-left: 10px;
            }
          }
        }
        &:last-child{
          border: 0!important;
        }
      }

    }
  }
  .otherrequire {
    padding: 12px 15px;
    background: #fff;
    margin-top: 10px;
    p {
      color: #3c464b;
      font-size: 14px;
    }
    textarea {
      height: 77px;
      border-radius: 6px;
      border: 1px solid rgba(226, 227, 228, 1);
      padding-left: 15px;
      margin-top: 12px;
      width: calc(100% - 15px);
      padding-top: 12px;
    }
  }
  .contact{
    margin-top: 10px;
    .panel{
      height: 44px;
      padding: 0 15px;
      border-bottom: 1px solid #E2E3E4;
      background: #fff;
      p{
        .display_flex;
        .justify-content_space_flex-justify;
        font-size: 14px;
        line-height: 44px;
        .panel_name{
          color: #3C464B;
        }
        .check_name{
          color: #B8C3CA;
          img{
            width: 8px;
            height: 14px;
            margin-bottom: -2px;
            margin-left: 10px;
          }
        }
      }
      &:last-child{
        border: 0!important;
      }

    }
    .contactpanel{
      /*height: 44px;*/
      padding: 0 15px;
      border-bottom: 1px solid #E2E3E4;
      background: #fff;
      p{
        .display_flex;
        .justify-content_space_flex-justify;
        font-size: 14px;
        line-height: 44px;
        .panel_name{
          color: #3C464B;
        }
        .check_name{
          color: #B8C3CA;
          img{
            width: 8px;
            height: 14px;
            margin-bottom: -2px;
            margin-left: 10px;
          }
        }
      }
      &:last-child{
        border: 0!important;
      }
      .contact{
        border-top: 1px solid #E2E3E4;
        padding: 0 5px;
        .info{
          color: rgba(135, 155, 170, 1);
          p{
            .display_flex;
            .justify-content_space_flex-justify;
            font-size: 14px;
          }
          .address{
            font-size: 14px;
            margin-top: -15px;
          }
        }
      }
    }
  }
  .remarks{
    background: #fff;
    font-size: 12px;
    margin-top: 10px;
    padding: 12px 15px;
    color: #FFB900;
  }
  .form2{
    margin-top: 10px;
    background: #fff;
    .panel{
      height: 44px;
      padding: 0 15px 0 0;
      margin-left: 15px;
      border-bottom: 1px solid #E2E3E4;
      p{
        .display_flex;
        .justify-content_space_flex-justify;
        font-size: 14px;
        line-height: 44px;
        .panel_name{
          color: #3C464B;
        }
        .check_name{
          color: #B8C3CA;
          img{
            width: 8px;
            height: 14px;
            margin-bottom: -2px;
            margin-left: 10px;
          }
        }
      }
      &:last-child{
        border: 0!important;
      }
    }
  }
  .bottom{
    padding-bottom: 17px;
    background: #fff;
    margin-top: 10px;
    .btns{
      /*width: 320px;*/
      height: 40px;
      margin: 0px auto 20px auto;
      border-bottom: 1px solid #E2E3E4;
      .display_flex;
      .justify-content_space_flex-justify;
      .align-items_center;
      .packagerepair{
        width:50%;
        height:20px;
        color: #41AAAA;
        font-size: 14px;
        text-align: center;
        border-right: 1px solid #E2E3E4;
      }
      .chargingstandard{
        width:50%;
        height:20px;
        color: #41AAAA;
        font-size: 14px;
        text-align: center;
      }
    }
    .agreement{
      padding: 0 15px 17px 15px;
      .agree{
        .display_flex;
        img{
          width: 16px!important;
          height: 16px!important;
        }
        p{
          .flex_1;
          margin-left: 10px;
          font-size: 12px;
          color: #879BAA;
          word-wrap: break-word;
          word-break: break-all;
          span{
            color: #41AAAA;
          }
        }
      }
      .agree2{
        margin-top: 15px;
      }
    }
    .submit{
      width:160px;
      height:44px;
      background:rgba(65,170,170,1);
      border-radius:22px;
      margin: 30px auto 0 auto;
      text-align: center;
      line-height: 44px;
      color: #fff;
      font-size: 16px;
      -moz-box-shadow:2px 2px 10px  rgba(65,170,170,.7);/*firefox*/
      -webkit-box-shadow:2px 2px 10px  rgba(65,170,170,.7);/*webkit*/
      box-shadow:2px 2px 10px  rgba(65,170,170,.7);/*opera或ie9*/
    }

  }
}
</style>
