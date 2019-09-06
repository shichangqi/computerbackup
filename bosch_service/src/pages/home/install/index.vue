<template>
  <div>
    <div class="notqr">
      <div class="cantfind"  v-if="show" catchtouchmove="ture">
        <div class="modal">
          <h5>哪里可以找到产品二维码</h5>
          <scroll-view scroll-y="true" class="scroll">
            <img src="../../../static/images/notfind.jpg">
          </scroll-view>
          <div class="closebtn" @tap="onhidden">知道了</div>
        </div>
      </div>
      <div class="calendar" v-if="calendar1"catchtouchmove="ture">
        <div class="container2" @tap.stop="calendar1 = false"></div>
        <div class="container">
          <Calendar @select="selectdate" :begin="begin"ref="calendar"/>
        </div>
      </div>
      <div class="calendar2" v-if="calendar2"catchtouchmove="ture">
        <div class="container2" @tap.stop="calendar2 = false"></div>
        <div class="container">
          <Calendar @select="selectdate2" :begin="begin2"ref="calendar2"/>
        </div>
      </div>
      <div class="top" v-if="isQR == false">
        <div class="qrcontent">
          <img src="../../../static/images/qrcode_icon.png" @tap="scanQR">
          <p>扫描机身二维码</p>
        </div>
        <p class="notfind" @tap="onshow">找不到二维码？</p>
        <span class="top_bottom" @tap="changePro">
          更换产品
          <img src="../../../static/images/right_icon.png">
        </span>

      </div>
      <div class="top-2" v-if="isQR">
        <p class="title">
          <span>产品信息</span>
          <img src="../../../static/images/qr_icon.png"@tap="scanQR">
        </p>
        <div class="productinfo">
          <div class="img">
            <img :src="prodectInfo.logo" alt="">
          </div>
          <div class="right">
            <p>产品类型：{{productType}}</p>
            <p class="p2">产品型号：{{productmodal}}</p>
          </div>
        </div>
        <p class="top-2_bottom" @tap="changePro">
          更换产品
          <img src="../../../static/images/right_icon.png">
        </p>
      </div>
      <mpvue-picker ref="typePicker" mode="selector" @onCancel="onCancel"  @onConfirm="producttypechange"  :pickerValueArray="productpicker"></mpvue-picker>

      <div class="form1">
        <div class="productid_panel panel" v-if="isQR == false">
          <!--<picker :value="index" :range="producttypearray" @change="producttypechange">-->
          <p @tap="typeclick">
            <span class="panel_name">产品类别</span>
            <span class="check_name">
                {{productType?productType:'请选择'}}
                <img src="../../../static/images/right_icon.png">
              </span>
          </p>
          <!--</picker>-->
        </div>
        <div class="panel" v-if="isQR == false">
          <p>
            <span class="panel_name">产品型号</span>
            <span class="check_name modalcheck">
                <input type="text" placeholder="请选择"  v-model="productmodal"placeholder-style="color:rgba(184,195,202,1);font-size:14px"@focus="inputfocus" @input="modalinput">
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
      <div class="panel">
        <picker :value="index" :range="arrivalalarray" @change="arrivalchange">
          <p>
            <span class="panel_name">是否到货</span>
            <span class="check_name">
                {{arrival?arrival:'请选择'}}
                <img src="../../../static/images/right_icon.png">
              </span>
          </p>
        </picker>
      </div>
      <div class="panel expectpanel" v-if="!isarrival"@tap="expectdateChange">
        <!--<picker mode="date" :value="expectdate" @change="expectdateChange":start="startdate">-->
        <p>
          <span class="panel_name">预计到货时间</span>
          <span class="check_name">
                {{expectdate?expectdate:'请选择时间'}}
                <img src="../../../static/images/right_icon.png">
              </span>
        </p>
        <!--</picker>-->
      </div>
      <div class="contactpanel">
        <p @tap="selectcontactor">
          <span class="panel_name">联系方式</span>
          <span class="check_name">
              {{address.name?'已选择':'请选择'}}
              <img src="../../../static/images/right_icon.png">
            </span>
        </p>
        <div class="contact"v-if="address.name">
          <div class="info">
            <p><span>{{address.surname+address.name}}{{address.sex == 1?'先生':'女士'}}</span><span>{{address.mobile}}</span></p>
            <p class="address">{{address.province}}{{address.city}}{{address.country}}{{address.addr}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="form2">
    <div class="panel" @tap="dateChange">
      <!--<picker mode="date" :value="date" @change="dateChange":start="exceptstart">-->
      <p class="panelmar">
        <span class="panel_name">期望上门时间</span>
        <span class="check_name">
              {{date?date:'请选择上门时间'}}
              <img src="../../../static/images/right_icon.png">
            </span>
      </p>
      <!--</picker>-->
    </div>
    <div class="panel" @tap="timeclick">
      <p>
        <span class="panel_name">期望服务时段</span>
        <span class="check_name">
              {{timetext?timetext:'请选择服务时段'}}
              <img src="../../../static/images/right_icon.png">
            </span>
      </p>

    </div>
  </div>

  <div class="otherrequire" v-if="!show && calendar1 == false && calendar2 == false && spicker == false">
    <p>其他要求</p>
    <textarea placeholder="选填"  placeholder-style="font-size:14px;color:#B8C3CA;" v-model="desc"></textarea>
  </div>
  <div class="form3" v-if="isQR == false">
    <div class="panel" v-if="hasproduct == false">
      <p>
        <span class="panel_name">安装提示</span>
        <span class="check_name">请选择产品后显示</span>
      </p>
    </div>
    <div class="tips" v-if="tip != '<p></p>'">
      <p class="title">安装提示</p>
      <div class="content">
        <wxParse :content="tip"/>
      </div>
    </div>
    <div class="panel"v-if="showpart">
      <p>
        <span class="panel_name">预约原厂配件</span>
        <span class="check_name">
            <switch @change="switchChange" color="#41AAAA"/>
          </span>
      </p>
    </div>
    <div class="partslist" v-for="(i,index) in partlist" :key="index" v-if="isswitch"@tap="selectpart(i)">
      <img :src="i.selected?'../../../static/images/selected_icon.png':'../../../static/images/select_icon.png'">
      <div class="info">
        <div class="right">
          <div class="imgs">
            <img :src="'http://dob.wechat.bshg.com.cn'+i.fittingImg" alt>
          </div>
          <p>{{i.fittingName}}</p>
        </div>
        <span>¥{{i.price}}</span>
      </div>
    </div>
  </div>

  <div class="form4" v-if="isQR">
    <div class="tips" v-if="tip != '<p></p>'">
      <p class="title">安装提示</p>
      <div class="content">
        <wxParse :content="tip"/>
      </div>
    </div>

    <div class="parts"v-if="showpart">
      <div class="panel">
        <p>
          <span class="panel_name">预约原厂配件</span>
          <span class="check_name" >
              <switch @change="switchChange" color="#41AAAA"/>
            </span>
        </p>
      </div>
      <div class="partslist" v-for=" i in partlist" v-if="isswitch">
        <img :src="i.selected?'../../../static/images/selected_icon.png':'../../../static/images/select_icon.png'">
        <div class="info">
          <div class="right">
            <div class="imgs">
              <img :src="'http://dob.wechat.bshg.com.cn'+i.fittingImg" alt>
            </div>
            <p>{{i.fittingName}}</p>
          </div>
          <span>¥{{i.price}}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bottom">
    <div class="agree"@tap="agree(1)">
      <img :src="agree1?'../../../static/images/selected_icon.png':'../../../static/images/select_icon.png'">
      <p>我已阅读并同意 博世家电 <span @tap.stop="gopro">《隐私保密规定》</span><span @tap.stop="gouse">《使用条款》</span></p>
    </div>
    <div class="agree agree2" @tap="agree(2)">
      <img :src="agree2?'../../../static/images/selected_icon.png':'../../../static/images/select_icon.png'">
      <p>我已同意 博世家电、其关联公司及其委托的第三方公司使用服务预约中登记的用户信息做售后回访、市场分析及调研、产品及品牌活动信息推荐，及其他相关市场推广活动等。我已知晓我输入的数据，会被存储并在这次服务中使用。</p>
    </div>
    <button class="submit" @tap="getPhoneNumber">提交预约</button>
  </div>
  </div>
</template>

<script>

  import wxParse from 'mpvue-wxparse'
  import { formatTime, navigate, reLaunch,arrayTime,formatNumber } from "../../../utils/index";
  import {getInstallProductTypes,getProductModal,getToken,saveOrder,getUserPhone,getrepairtypes,bindProduct,getProductTypes,wxordersave} from "../../../api/api";
  import Calendar from 'mpvue-calendar'
  import 'mpvue-calendar/src/style.css'
  import mpvuePicker from 'mpvue-picker';
  export default {

    data () {
      return {
        isQR:false,
        hasproduct:true,
        isswitch:false,
        agree1:true,
        agree2:true,
        index:0,
        producttypearray:[],
        productType:'',
        productmodalarray:[],
        productmodal:'',
        arrivalalarray:['否','是'],
        arrival:'',
        isarrival:true,
        date:'',
        expectdate:'',
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
        address:{},
        show:false,
        animationData: {},
        productTypes: [],
        tip:'<p></p>',
        productId:0,
        delivedFlag:0,
        pro:{},
        desc:'',
        prodectInfo:{},
        partlist:[],
        startdate:formatTime(new Date()),
        showpart:false,
        showpromodal:false,
        productmodals:[],
        exceptstart:'',
        instype:['洗衣机','洗干一体机','干衣机','嵌入式冰箱','对开门冰箱','多门冰箱','吸油烟机','灶具','消毒柜','洗碗机','烤箱','蒸箱','微波炉','酒柜','暖碟抽屉'],
        begin:arrayTime(new Date()),
        calendar1:false,
        begin2:arrayTime(new Date(new Date().getTime()+86400000)),
        calendar2:false,
        scanImg:'',
        spicker:false,
        pickertype:1,
        productpicker:[],
        proName:''
      }},
    components: {
      wxParse,
      Calendar,
      mpvuePicker
    },
    async onLoad(option) {
      Object.assign(this.$data, this.$options.data());
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
      //获取产品类别
      const data = {
        source: 1
      };
      await getProductTypes(data).then(res => {
        this.productTypes = [];
        this.producttypearray=[]
        this.instype.forEach((item,i)=>{
          for (let i = 0; i < res.data.data.length; i++) {
            if(res.data.data[i].typeName == item){
              let arr={
                label:res.data.data[i].typeName,
                value :i
              }
              this.producttypearray.push(arr);
              this.productTypes.push(res.data.data[i])
            }
          }

        })
        this.productpicker = this.producttypearray;
        wx.hideLoading();
      })
      this.prodectInfo = JSON.parse(option.extraData)

      if(this.prodectInfo.name){
        this.bind(this.prodectInfo.vib, this.prodectInfo.fd, this.prodectInfo.sn, 1)
        this.productTypes.forEach(item=>{
          if(item.typeName == this.prodectInfo.productName){
            this.partlist = item.fittingList;
            this.scanImg = item.scanImg;
            if(item.installTips == '' || item.installTips == null){
              this.tip = '<p></p>'
            }else{
              this.tip = item.installTips;
            }
            if(this.partlist.length == 0){
              this.showpart = false;
            }else{
              this.showpart = true;
            }
          }
        })
      }
    },
    onShow(){
      let address = wx.getStorageSync('address');
      if(address){
        this.address = address;
        this.timetext = '';
        this.producttypearray=[];
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
        this.producttypearray = this.timearray;
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
                source: 1,
                pdv: item.pdv
              };
              getProductModal(data).then(res => {
                for (let i = 0; i < res.data.data.length; i++) {
                  this.productmodalarray.push(res.data.data[i].applCode);
                }
              });
            }

          })
        }
      }

    },
    onUnload() {
      wx.removeStorageSync("address");
      wx.removeStorageSync("selectPro");
      this.$refs.typePicker.pickerCancel();
    },
    methods: {
      expectdateChange(e) {
        this.calendar1 = true;
        this.date= '';
      },

      selectdate(v1){
        this.expectdate = v1.join('-');

        this.date= '';
        console.log(this.begin2)
        // this.expectdate = v1.join('/');
        this.expectdate = formatNumber(v1[0])+'/'+formatNumber(v1[1])+'/'+formatNumber(v1[2])
        this.begin2 = arrayTime(new Date(Date.parse(this.expectdate)+86400000))

        this.$forceUpdate()
        this.calendar1 = false;
      },
      dateChange(e) {
        this.calendar2 = true;
      },
      selectdate2(v1){
        this.date = formatNumber(v1[0])+'/'+formatNumber(v1[1])+'/'+formatNumber(v1[2])
        // this.begin = v1;
        this.calendar2 = false;
        this.$forceUpdate()
      },
      inputfocus(){
        this.productmodals = this.productmodalarray;
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
      checkmodal(i){
        if(i == 5){
          this.productmodal = "未知产品型号"
        }else{
          this.productmodal = i
        }
        this.showpromodal = false
        this.productmodals.forEach(item=>{

        })
      },
      selectpart(obj){
        obj.selected = !obj.selected;
        this.$forceUpdate()
      },
      async getPhoneNumber(){

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

          if(!_this.arrival){
            wx.showToast({ title: '请选择是否到货', icon: 'none', mask: true })
            return;
          }
          if(!_this.address.name){
            wx.showToast({ title: '请选择联系方式', icon: 'none', mask: true })
            return;
          }
          if(!_this.date){
            wx.showToast({ title: '请选择上门时间', icon: 'none', mask: true })
            return;
          }
          let partlist=[];
          let partdesc = '';
          _this.partlist.forEach(item=>{
            if(item.selected){
              partlist.push(item.id)
              partdesc = partdesc+'配件名称：'+item.fittingName+ '配件编号：'+item.fittingCode+','
            }
          })
          this.desc = this.desc.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, "");
          let desc = `问题描述: 微信报单, 备注:${_this.desc}`+partdesc+'期望上门时间:'+_this.date+'  '+_this.timetext+'优先联系电话:'+_this.address.mobile+'微信授权手机号：'+ phone;
          const datas ={
            addressId:_this.address.id,
            source:1,
            orderDate:_this.date,
            productId:_this.productId,
            productSn:_this.productmodal,
            timeRange:_this.timetext,
            otherRequest:desc,
            delivedFlag: parseInt(_this.delivedFlag),
            type:1,
            fittingOrderList:partlist,
            diagCode:24810,
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
                serviceType:1,
                productId:_this.productId,
                proName:_this.productType,
                applCode:_this.productmodal,
                expectationTime:_this.date,
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
                reLaunch(`/pages/installsuccess/main?tip=${JSON.stringify(_this.tip)}&address=${JSON.stringify(_this.address)}`)
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
        debugger
        this.spicker = false;
      },

      gopro() {
        navigate("/pages/privacyProvisions/main");
      },
      gouse() {
        navigate("/pages/termsOfUse/main");
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
            let flag=false;
            this.instype.forEach((item,i)=>{
              if(res.data.data.productName.indexOf(item) != -1){
                flag = true;
              }
            })
            if(!flag){
              wx.showToast({ title: "此产品不可用", icon: "none", mask: true });
              return;
            }
            this.prodectInfo = res.data.data
            this.productmodal = this.prodectInfo.vib
            this.productType = this.prodectInfo.productName
            this.productId = this.prodectInfo.productId
            this.isQR = true
          }
        })
      },
      onshow() {
        this.show = true;
      },
      onhidden() {
        this.show = false;
      },

      selectcontactor() {
        navigate("/pages/contactWay/main");
      },
      changePro() {
        console.log(this.pro)
        navigate(`/pages/selectProduct/main?id=${this.pro.id}&protype=${JSON.stringify(this.instype)}&type=1`)
      },
      timechange(e) {
        this.timetext =e.label;
        this.spicker = false;
        console.log(e)
      },


      arrivalchange(e) {
        this.arrival = this.arrivalalarray[e.mp.detail.value];
        if(e.mp.detail.value == 0){
          this.isarrival = false;
        }else{
          this.isarrival = true;
          this.exceptstart = formatTime(new Date(Date.parse(this.startdate)+86400000))
        }
        this.delivedFlag = e.mp.detail.value;
      },
      async producttypechange(e) {
        if(this.pickertype == 1){
          this.productmodalarray = [];
          this.productmodal = "";
          this.productType = e.label;
          for (let i = 0; i < this.productTypes.length; i++) {
            if(this.productTypes[i].typeName == e.label){
              this.partlist = this.productTypes[i].fittingList;
              let pdv = this.productTypes[i].pdv;
              this.scanImg = this.productTypes[i].scanImg;
              if(this.productTypes[i].installTips == '' || this.productTypes[i].installTips == null){
                this.tip = '<p></p>'
              }else{
                this.tip = this.productTypes[i].installTips;
              }
              // this.tip = this.installtips[e.mp.detail.value];
              if(this.partlist.length == 0){
                this.showpart = false;
              }else{
                this.showpart = true;
              }
              const data = {
                source: 1,
                pdv: pdv
              };
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
              this.productmodals = [];
              await getProductModal(data).then(res => {
                for (let i = 0; i < res.data.data.length; i++) {
                  this.productmodalarray.push(res.data.data[i].applCode);
                  this.productmodals.push(res.data.data[i].applCode)
                }
                wx.hideLoading();

              });

              this.productId = this.productTypes[i].typeId;

            }
          }
          this.partlist.forEach(item=>{
            item.selected = false;
          })

        }
        else if(this.pickertype == 2){
          this.timetext =e.label;
        }
        this.hasproduct = false
        this.spicker = false;
        this.$forceUpdate()
      },
      productmodalchange(e) {
        this.productmodal = this.productmodalarray[e.mp.detail.value];
      },
      agree(index) {
        if (index == 1) {
          this.agree1 = !this.agree1;
        } else {
          this.agree2 = !this.agree2;
        }
      },
      switchChange(e) {
        this.isswitch = e.mp.detail.value;
      },

    }
  };
</script>

<style scoped lang="less">
  @import "../../../utils/flex.less";
  .notqr {
    background: #fff;
    .calendar{
      position: fixed;
      top:0;
      right:0;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 999999;
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
        z-index: 999999;
        opacity: 1;
        background: #fff;
      }
    }
    .calendar2{
      position: fixed;
      top:0;
      right:0;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 999999;
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
        z-index: 999999;
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
  }
  .top-2 {
    height: 142px;
    padding: 13px 15px;
    box-sizing: border-box;
    background: #fff;
    -moz-box-shadow: 0 5px 10px 0 rgba(60, 70, 75, 0.05); /*firefox*/
    -webkit-box-shadow: 0 5px 10px 0 rgba(60, 70, 75, 0.05); /*webkit*/
    box-shadow: 0 5px 10px 0 rgba(60, 70, 75, 0.05); /*opera或ie9*/
    .title {
      .display_flex;
      .justify-content_space_flex-justify;
      span {
        color: #3c464b;
        font-size: 16px;
      }
      img {
        width: 18px;
        height: 18px;
      }
    }
    .productinfo {
      margin-top: 12px;
      .display_flex;
      .img {
        text-align: center;
        width: 58px;
        height: 58px;
        background: rgba(255, 255, 255, 1);
        border-radius: 6px;
        border: 1px solid rgba(226, 227, 228, 1);
        .display_flex;
        .align-items_center;
        .justify-content_flex-center;
        img {
          width: 45px;
          height: 33px;
        }
      }
      .right {
        margin-left: 10px;
        .display_flex;
        .justify-content_flex-center;
        .flex-direction_column;
        p {
          color: #6d7478;
          font-size: 14px;
          line-height: 20px;
        }
        .p2 {
          margin-top: 6px;
        }
      }
    }
    &_bottom {
      color: #41aaaa;
      font-size: 12px;
      margin-top: 10px;
      img {
        width: 6px;
        height: 11px;
        margin-left: 5px;
      }
    }
  }
  .top {
    position: relative;
    padding: 0 15px 13px 15px;
    background: #fff;
    -moz-box-shadow: 0 5px 10px 0 rgba(60, 70, 75, 0.05); /*firefox*/
    -webkit-box-shadow: 0 5px 10px 0 rgba(60, 70, 75, 0.05); /*webkit*/
    box-shadow: 0 5px 10px 0 rgba(60, 70, 75, 0.05); /*opera或ie9*/
    .qrcontent {
      .display_flex;
      .flex-direction_column;
      .align-items_center;
      img {
        width: 100px;
        height: 100px;
        margin-top: 23px;
        /*margin-bottom: 12px;*/
      }
      p {
        color: #879baa;
        font-size: 14px;
      }
    }
    .notfind {
      position: absolute;
      top: 23px;
      right: 15px;
      color: #41aaaa;
      font-size: 12px;
    }
    &_bottom {
      color: #41aaaa;
      font-size: 12px;
      margin-top: 10px;
      img {
        width: 6px;
        height: 11px;
        margin-left: 5px;
      }
    }

  }

  .form1 {
    margin-top: 10px;
    background: #f6f6f6;
    .expectpanel {
      margin-bottom: 10px !important;
      border-bottom: 0 !important;
    }
    .contactpanel {
      padding: 0 15px;
      border-bottom: 1px solid #e2e3e4;
      background: #fff;
      p {
        .display_flex;
        .justify-content_space_flex-justify;
        font-size: 14px;
        line-height: 44px;
        .panel_name {
          color: #3c464b;
        }
        .check_name {
          color: #b8c3ca;
          img {
            width: 8px;
            height: 14px;
            margin-bottom: -2px;
            margin-left: 10px;
          }
        }
      }
      .contact {
        border-top: 1px solid #e2e3e4;
        padding: 0 5px;
        .info {
          color: rgba(135, 155, 170, 1);
          p {
            .display_flex;
            .justify-content_space_flex-justify;
            font-size: 14px;
          }
          .address {
            font-size: 14px;
            margin-top: -15px;
          }
        }
      }
    }
    .panel {
      height: 44px;
      padding: 0 15px;
      border-bottom: 1px solid #e2e3e4;
      background: #fff;
      p {
        .display_flex;
        .justify-content_space_flex-justify;
        font-size: 14px;
        line-height: 44px;
        .panel_name {
          color: #3c464b;
        }
        .check_name {
          color: #b8c3ca;
          img {
            width: 8px;
            height: 14px;
            margin-bottom: -2px;
            margin-left: 10px;
          }
        }
      }
      &:last-child {
        border: 0 !important;
      }
    }
  }
  .form2 {
    margin-top: 10px;
    background: #fff;
    .panel {
      height: 44px;
      padding: 0 15px 0 0;
      margin-left: 15px;
      border-bottom: 1px solid #e2e3e4;
      p {
        .display_flex;
        .justify-content_space_flex-justify;
        font-size: 14px;
        line-height: 44px;
        .panel_name {
          color: #3c464b;
        }
        .check_name {
          color: #b8c3ca;
          img {
            width: 8px;
            height: 14px;
            margin-bottom: -2px;
            margin-left: 10px;
          }
        }
      }
      &:last-child {
        border: 0 !important;
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
  .form3 {
    margin-top: 10px;
    background: #fff;
    .panel {
      height: 44px;
      padding: 0 15px;
      border-bottom: 1px solid #e2e3e4;
      p {
        .display_flex;
        .justify-content_space_flex-justify;
        font-size: 14px;
        line-height: 44px;
        .panel_name {
          color: #3c464b;
        }
        .check_name {
          color: #b8c3ca;
        }
      }
    }
    .partslist {
      background: #fff;
      .display_flex;
      .align-items_center;
      padding-left: 15px;
      height: 88px;
      img {
        width: 16px;
        height: 16px;
      }
      .info {
        .display_flex;
        .flex_1;
        .justify-content_space_flex-justify;
        .align-items_center;
        margin-left: 10px;
        border-bottom: 1px solid #e2e3e4;
        height: 100%;
        padding-right: 15px;
        .right {
          .display_flex;
          .align-items_center;
          font-size: 14px;
          color: #6d7478;
          .imgs {
            text-align: center;
            width: 58px;
            height: 58px;
            background: rgba(255, 255, 255, 1);
            border-radius: 6px;
            border: 1px solid rgba(226, 227, 228, 1);
            margin-right: 12px;
            .display_flex;
            .align-items_center;
            .justify-content_flex-center;
            img {
              width: 44px;
              height: 32px;
            }
          }
        }
        span {
          font-size: 16px;
          color: #af235f;
        }
      }
      &:last-child {
        .info {
          border: 0;
        }
      }
    }
    .tips {
      color: #3c464b;
      font-size: 14px;
      line-height: 44px;
      padding: 10px 15px 12px 15px;
      background: #fff;
      .content {
        color: #879baa;
        font-size: 12px;
        line-height: 17px;
      }
    }
  }
  .form4 {
    margin: 10px 0;
    .tips {
      color: #3c464b;
      font-size: 14px;
      line-height: 44px;
      padding: 10px 15px 12px 15px;
      background: #fff;
      .content {
        color: #879baa;
        font-size: 12px;
        line-height: 17px;
      }
    }
    .parts {
      margin-top: 10px;
      background: #fff;
      .panel {
        height: 44px;
        padding: 0 15px;
        border-bottom: 1px solid #e2e3e4;
        p {
          .display_flex;
          .justify-content_space_flex-justify;
          font-size: 14px;
          line-height: 44px;
          .panel_name {
            color: #3c464b;
          }
          .check_name {
            color: #b8c3ca;
          }
        }
      }
      .partslist {
        background: #fff;
        .display_flex;
        .align-items_center;
        padding-left: 15px;
        height: 88px;
        img {
          width: 16px;
          height: 16px;
        }
        .info {
          .display_flex;
          .flex_1;
          .justify-content_space_flex-justify;
          .align-items_center;
          margin-left: 10px;
          border-bottom: 1px solid #e2e3e4;
          height: 100%;
          padding-right: 15px;
          .right {
            .display_flex;
            .align-items_center;
            font-size: 14px;
            color: #6d7478;
            .imgs {
              text-align: center;
              width: 58px;
              height: 58px;
              background: rgba(255, 255, 255, 1);
              border-radius: 6px;
              border: 1px solid rgba(226, 227, 228, 1);
              margin-right: 12px;
              .display_flex;
              .align-items_center;
              .justify-content_flex-center;
              img {
                width: 44px;
                height: 32px;
              }
            }
          }
          span {
            font-size: 16px;
            color: #af235f;
          }
        }
        &:last-child {
          .info {
            border: 0;
          }
        }
      }
    }
  }
  .bottom {
    padding: 20px 15px 17px 15px;
    background: #fff;
    .agree {
      .display_flex;
      img {
        width: 16px !important;
        height: 16px !important;
      }
      p {
        .flex_1;
        margin-left: 10px;
        font-size: 12px;
        color: #879baa;
        word-wrap: break-word;
        word-break: break-all;
        span {
          color: #41aaaa;
        }
      }
    }
    .agree2 {
      margin-top: 15px;
    }
    .submit {
      width: 160px;
      height: 44px;
      background: rgba(65, 170, 170, 1);
      border-radius: 22px;
      margin: 30px auto 0 auto;
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
