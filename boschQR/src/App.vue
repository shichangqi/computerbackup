<script>
  // import wx from 'wx'
  import store from './store/store'
  import { mapGetters, mapActions } from 'vuex'
  let initPath
  let scene
  export default {
    computed: {
    },
  }
</script>

<style lang="less">
page{
  background: #F4F4F4;
}
::-webkit-scrollbar{
  width: 0;
  height: 0;
  color: transparent;
}
.wxcontent{
.p{
  padding: 0 15px!important;
}
}
  .iframe{
    width: 100%!important;
  }
  ul,ol,li{
    list-style: none;
  }
</style>
