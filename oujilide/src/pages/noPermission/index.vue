<template>
    <div class="noPermission">
        <p class="noPermission-in">您还没有权限访问该小程序！</p>
    </div>
</template>
<script>
export default {
  data(){
      return {
          content: '',  //富文本详情
      }
  },
  methods: {
  }
}
</script>
<style lang="less">
.noPermission {
    width: 100%;
    height: auto;
    padding-top: 200rpx;
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
    box-sizing: border-box;
    &-in {
        width: 100%;
        text-align: center;
        margin-bottom: 100rpx;
    }
}
</style>

