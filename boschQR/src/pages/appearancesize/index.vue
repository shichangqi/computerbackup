<template>
    <div>
      <div class="panel" v-for="(i,index) in info" :key="index">
        <span>{{i.key}}</span>
        <span>{{i.values[0]}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        info:[]
      }
    },
    onLoad(option){
      this.info = JSON.parse(option.weight)
    }
  };
</script>

<style scoped lang="less">
  @import "../../utils/flex.less";
  .panel{
    .display_flex;
    .justify-content_space_flex-justify;
    .align-items_center;
    padding: 0 15px;
    font-size: 14px;
    height: 44px;
    background: #fff;
    border-bottom: 1px solid rgba(226, 227, 228, 1);
  }
</style>
