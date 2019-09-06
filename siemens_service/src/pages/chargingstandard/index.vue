<template>
    <div class="privacyProvisions">
      <web-view src="https://www.siemens-home.bsh-group.cn/customer-service/warranty/manufacturer-warranty#tab-navigation"></web-view>

    </div>
</template>

<script>
  import wxParse from 'mpvue-wxparse'
  export default {
    data(){
      return{
        content:'<p>12</p>'
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
