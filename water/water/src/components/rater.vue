<template lang="html">
  <div class="star-evaluation">
    <span v-for="(item, index) in score" :key="index" class="star-item" @click="stars(index)">
      <img src="/static/images/star_on.png" alt="">
    </span>
    <span v-for="(opt, i) in (5 - score)" :key="i+score+1" class="star-item" @click="stars(i + score)">
      <img mode="aspectFit" src="/static/images/star_off.png" alt="">
    </span>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    propScore: {
      type: Number,
      default: 0
    },
    rate: Function
  },
  methods: {
    stars (index) {
      // 点击当前星星索引值+1
      this.rate(this.id, index + 1)
    }
  },
  computed: {
    //  计算显示星星
    score () {
      return this.propScore > 5 ? 5 : this.propScore
    }
  }
}
</script>

<style lang="less">
.star-item {
  display: inline-block;
  background-repeat: no-repeat;
  width: 22px;
  height: 22px;
  margin-right: 10px;
  background-size: 100%;
  img {
    display: block;
    width: 22px;
    height: 22px;
  }
}
</style>
