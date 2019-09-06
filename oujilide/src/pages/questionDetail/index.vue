<template>
    <div class="updateMail" v-if="content">
        <div class="updateMail-bg">
            <img src="/static/images/bg.png" alt="">
        </div>
        <div class="updateMail-detail"><wxParse :content="content"/></div>
    </div>
</template>
<script>
import { problemManagement } from '@/api/api'
import wxParse from 'mpvue-wxparse'
export default {
  components: {
    wxParse
  },
    data(){
        return {
            content: null
        }
    },
    onShow(){
        this.getAnswer()
    },
    methods: {
        /**
         * 获取答案
         */
        async getAnswer(){
            let id = this.$mp.query.id
            const { data } = await problemManagement({id: id})
            if(data.code == 0){
                this.content = data.data.problemManagement.answer
            } 
        }
    }
}
</script>

<style lang="less">
@import url("~mpvue-wxparse/src/wxParse.css");
page {
    width: 100%;
    height: 100%;
}
.updateMail {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    &-bg {
        width: 100%;
        height: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        image {
            width: 100%;
            height: 100%;
        }
    }
    &-detail {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        image {
            width: 100%;
        }
    }
}
</style>

