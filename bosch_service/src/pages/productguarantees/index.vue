<template>
    <div class="privacyProvisions">
      <!--<wxParse :content="content"  />-->
      <web-view src="https://www.bosch-home.cn/specials/service-policy/warranty-repair#tab-navigation"></web-view>
    </div>
</template>

<script>
  import wxParse from 'mpvue-wxparse'
  export default {
    data(){
      return{
        content:'<p>11</p>'
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
