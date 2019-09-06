<template>
    <div class="termsOfUse">
      <!--<wxParse :content="content"  />-->
      <web-view src="https://cseshop.wechat.bshg.com.cn/h5-bsh/order/termsOfUse"></web-view>

    </div>
</template>

<script>
  import wxParse from 'mpvue-wxparse'
  export default {
    data(){
      return{
        content:'<p>22</p>'
      }
    },
    components:{
      wxParse
    }
  };
</script>

<style scoped>
  /*@import url("~mpvue-wxparse/src/wxParse.css");*/
</style>
