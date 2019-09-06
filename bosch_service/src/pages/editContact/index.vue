<template>
  <div class="newContact">
    <div class="form">
      <div class="panel">
        <label>手机号</label>
        <input type="number"placeholder="请输入手机号" placeholder-style="color:rgba(184,195,202,1);font-size:14px" v-model="phone">
      </div>
      <div class="panel codepanel">
        <label>验证码</label>
        <input type="text"placeholder="验证码" placeholder-style="color:rgba(184,195,202,1);font-size:14px" v-model="code">
        <span class="getcode" @tap.stop="getphonecode">{{codetext}}</span>
      </div>
      <div class="gray"></div>
      <div class="callpanel">
        <picker  :value="index" :range="callarray" @change="callchange">
          <p><span class="panel_name"> <label>称呼</label>{{callarray[index]}}</span>
            <span class="check_name"><img src="../../static/images/right_icon.png"></span>
          </p>
        </picker>
      </div>
      <div class="panel surname">
        <label>姓</label>
        <input type="text"placeholder="请输入您的姓氏" placeholder-style="color:rgba(184,195,202,1);font-size:14px"v-model="surname" >
      </div>
      <div class="panel name">
        <label>名</label>
        <input type="text"placeholder="请输入您的名字" placeholder-style="color:rgba(184,195,202,1);font-size:14px" v-model="name">
      </div>
      <div class="gray"></div>
      <div class="regionpanel">
        <picker mode="multiSelector"  @columnchange="MultiPickerColumnChange" :value="multiIndex":range="multiArray"@change="bindRegionChange" >
          <p><span class="panel_name"> <label>省市区</label>{{region[0]?region[0]+','+region[1]+','+region[2]:'请选择'}}</span>
            <span class="check_name"><img src="../../static/images/right_icon.png"></span>
          </p>
        </picker>
      </div>
      <div class="panel addresspanel">
        <label>地址</label>
        <input type="text"placeholder="填写小区/写字楼/学校等" placeholder-style="color:rgba(184,195,202,1);font-size:14px" v-model="street">
      </div>
      <div class="panel name">
        <label>详细地址</label>
        <input type="text"placeholder="请填写楼栋/单元/房号" placeholder-style="color:rgba(184,195,202,1);font-size:14px" v-model="strict">
      </div>
      <div class="gray"></div>
    </div>
    <div class="submit" @tap="addContact">保存</div>
  </div>
</template>

<script>
  import {navigate,goBack} from "../../utils/index";
  import {getAreaInfo,editAddress,getcode,getToken} from "../../api/api";

  export default {
    data(){
      return{
        code:'',
        index:0,
        callarray:['先生','女士'],
        call:'先生',
        region: [],
        multiArray:[[],[],[]],
        multiIndex:[0,0,0],
        allmultiarray:[],
        sex:1,
        surname:'',
        name:'',
        phone:'',
        street:'',
        strict:'',
        s:60,
        codetext:'获取验证码',
        inter:null,
        address:{}
      }
    },
    onUnload() {
      clearInterval(this.inter)
    },
    async onLoad(option){
      Object.assign(this.$data, this.$options.data())
      this.inter?clearInterval(this.inter):null
      this.address = JSON.parse(option.address);
      this.phone = this.address.mobile;
      this.originphone = this.phone;
      this.index = this.address.sex-1;
      this.sex = this.address.sex;
      this.surname = this.address.surname;
      this.name = this.address.name;
      this.region[0] = this.address.province;
      this.region[1] = this.address.city;
      this.region[2] = this.address.country;
      this.street = this.address.addr;
      this.strict = this.address.unitNum;
      // await getBStoken();
      await getAreaInfo().then(res=>{
        let multiArray = res.data.data;

        for (let i=0;i<multiArray.length;i++) {
          this.multiArray[0].push(multiArray[i].name)
        }
        for (let j=0;j < multiArray[0].sub.length;j++){
          this.multiArray[1].push(multiArray[0].sub[j].name)
        }
        for (let k=0;k<multiArray[0].sub[0].sub.length;k++){
          this.multiArray[2].push(multiArray[0].sub[0].sub[k].name)
        }
        this.allmultiarray= multiArray;
      })

    },
    methods:{
      changephone(e){
        this.phone = e.mp.detail.value
      },
      getphonecode(){
        let _this = this;
        let myreg = /^[1][0-9]{10}$/;
        if (!myreg.test(this.phone)) {
          wx.showToast({ title: '手机号格式不正确!', icon: 'none', mask: true })
          return
        }
        if(this.s < 60 && this.s >= 0){
          wx.showToast({ title: `请${this.s}秒后再试！`, icon: 'none', mask: true })
          return;
        }
        const da={
          mobile:this.phone,
          source:1
        }

        getcode(da).then(res=>{
          if(res.data.flag == 1100){
            _this.inter = setInterval(function () {
              _this.cutdown()
            },1000)
            wx.showToast({ title: `发送成功`, icon: 'none', mask: true })

          }else{
            wx.showToast({ title: res.data.msg, icon: 'none', mask: true })

          }

        })

      },
      cutdown(){
        if(this.s<=0){
          this.codetext = '获取验证码';
          this.s = 60;
          clearInterval(this.inter)
          return;
        }
        this.s-=1;
        this.codetext = this.s+'(s)'
      },
     async addContact(){
        if(!this.phone){
          wx.showToast({ title: '请填写手机号', icon: 'none', mask: true })
          return;
        }
        if(this.originphone != this.phone){
          if(!this.code){
            wx.showToast({ title: '请填写手机验证码', icon: 'none', mask: true })
            return;
          }
        }
        if(!this.callarray[this.index]){
          wx.showToast({ title: '请选择称呼', icon: 'none', mask: true })
          return;
        }
        if(!this.surname){
          wx.showToast({ title: '请填写您的姓氏', icon: 'none', mask: true })
          return;
        }
        if(!this.name){
          wx.showToast({ title: '请填写您的名字', icon: 'none', mask: true })
          return;
        }
        if(!this.region[0]){
          wx.showToast({ title: '请选择省市区', icon: 'none', mask: true })
          return;
        }
        if(!this.street){
          wx.showToast({ title: '请填写地址', icon: 'none', mask: true })
          return;
        }
        if(!this.strict){
          wx.showToast({ title: '请填写详细地址', icon: 'none', mask: true })
          return;
        }
        debugger
        const data={
          sex:this.sex,
          surname:this.surname,
          name:this.name,
          mobile:this.phone,
          province:this.region[0],
          city:this.region[1],
          country:this.region[2],
          addr:this.street,
          unitNum:this.strict,
          pcd:this.region[0]+','+this.region[1]+','+this.region[2],
          unionId:wx.getStorageSync('unionid'),
          valid:this.code,
          id:this.address.id,
          openId:wx.getStorageSync('openid'),
          // isDefault:1
        }
        //获取bstoken
        const formData = {
          account: "admin",
          password: "admin"
        };
        wx.removeStorageSync("bstoken");
        await getToken(formData).then(function(res) {
          wx.setStorageSync("bstoken", res.data.data.token);
        });
        debugger
        editAddress(data).then(res=>{
          console.log(res.data)
          if(res.data.flag == 1100){
            wx.showToast({ title: `修改成功`, icon: 'none', mask: true });
            goBack();
            // navigate('/pages/contactWay/main')

          }
        })
      },
      callchange(e){
        this.index = e.mp.detail.value
        // this.call = this.callarray[e.mp.detail.value];
        this.sex = parseInt(e.mp.detail.value)+1;
      },
      bindRegionChange(e){
        this.region[0] = this.multiArray[0][e.mp.detail.value[0]];
        this.region[1] = this.multiArray[1][e.mp.detail.value[1]];
        this.region[2] = this.multiArray[2][e.mp.detail.value[2]];
        this.$forceUpdate();
      },
      MultiPickerColumnChange(e) {
        this.multiIndex[e.mp.detail.column] = e.mp.detail.value;
        switch (e.mp.detail.column) {
          case 0:
            this.multiArray[1] = [];
            this.multiArray[2] = [];
            for (
              let i = 0;
              i < this.allmultiarray[e.mp.detail.value].sub.length;
              i++
            ) {
              this.multiArray[1][i] = this.allmultiarray[e.mp.detail.value].sub[
                i
                ].name;
            }
            for (
              let j = 0;
              j < this.allmultiarray[e.mp.detail.value].sub[0].sub.length;
              j++
            ) {
              this.multiArray[2][j] = this.allmultiarray[
                e.mp.detail.value
                ].sub[0].sub[j].name;
            }
            console.log(e.mp.detail.value)
            this.multiIndex[1] = 0;
            this.multiIndex[2] = 0;
            this.region[0] = this.multiArray[0][e.mp.detail.value];
            this.region[1] = this.multiArray[1][0];
            this.region[2] = this.multiArray[2][0];
            this.$forceUpdate();
            break;
          case 1:
            this.multiArray[2] = [];
            for (
              let i = 0;
              i <
              this.allmultiarray[this.multiIndex[0]].sub[e.mp.detail.value].sub
                .length;
              i++
            ) {
              this.multiArray[2][i] = this.allmultiarray[this.multiIndex[0]].sub[
                e.mp.detail.value
                ].sub[i].name;
            }
            this.multiIndex[2] = 0;
            this.region[0] = this.multiArray[0][this.multiIndex[0]];
            this.region[1] = this.multiArray[1][e.mp.detail.value];
            this.region[2] = this.multiArray[2][0];
            this.$forceUpdate();
            break;
          case 2:
            this.region[0] = this.multiArray[0][this.multiIndex[0]];
            this.region[1] = this.multiArray[1][this.multiIndex[1]];
            this.region[2] = this.multiArray[2][e.mp.detail.value];
            this.$forceUpdate();
            break;
        }
      }
    }
  };
</script>

<style lang="less">
  @import "../../utils/flex.less";
  page{
    background: #fff;
  }
  .newContact{
    .gray{
      background: #f6f6f6;
      height: 10px;
    }
    .form{
      input{
        color:rgba(60, 70, 75, 1);
        flex: 1;
      }
      .panel{
        background: #fff;
        position: relative;
        height: 44px;
        font-size: 14px;
        margin-left: 15px;
        .display_flex;
        .align-items_center;
        label{
          width: 78px;
          font-size: 14px;
          color: rgba(60, 70, 75, 1);
        }
        .getcode{
          position: absolute;
          right: 20px;
          font-size: 14px;
          color: rgba(65,170,170,1);
          z-index: 12;
        }
      }
      .codepanel{
        border-top:1px solid #E2E3E4 ;
      }
      .callpanel{
        margin-left: 15px;
        height: 44px;
        padding-right: 15px;
        background: #fff;
        border-bottom: 1px solid #E2E3E4;
        p{
          .display_flex;
          .justify-content_space_flex-justify;
          font-size: 14px;
          line-height: 44px;
          label{
            display: inline-block;
            color: rgba(60, 70, 75, 1);
            width: 78px;
          }
          .panel_name{
            color: rgba(184, 195, 202, 1);
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
      }
      .regionpanel{
        margin-left: 15px;
        height: 44px;
        padding-right: 15px;
        background: #fff;
        border-bottom: 1px solid #E2E3E4;
        p{
          .display_flex;
          .justify-content_space_flex-justify;
          font-size: 14px;
          line-height: 44px;
          label{
            display: inline-block;
            color: rgba(60, 70, 75, 1);
            width: 78px;
          }
          .panel_name{
            color: rgba(184, 195, 202, 1);
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
      }
      .addresspanel{
        border-bottom: 1px solid #E2E3E4;
      }
      .surname{
        border-bottom: 1px solid #E2E3E4;
      }
      .name{
        border:0;
      }
    }

    .submit{
      position: fixed;
      bottom: 17px;
      left: 50%;
      transform: translate(-50%, 0);
      width:160px;
      height:44px;
      background:rgba(65,170,170,1);
      border-radius:22px;
      text-align: center;
      line-height: 44px;
      color: #fff;
      font-size: 16px;
      -moz-box-shadow:2px 2px 10px  rgba(65,170,170,.7);/*firefox*/
      -webkit-box-shadow:2px 2px 10px  rgba(65,170,170,.7);/*webkit*/
      box-shadow:2px 2px 10px  rgba(65,170,170,.7);/*opera或ie9*/
    }
  }

</style>
