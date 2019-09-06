<template>
    <div>
      <web-view :src="'https://www.bosch-home.cn/productlist/'+vib"></web-view>
    </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        vib:''
      }
    },
    onLoad(option){
      this.vib = option.vib;
    }
  };
</script>

<style scoped>

</style>
