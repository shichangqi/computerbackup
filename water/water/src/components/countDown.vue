<template lang="html">
  <div class="countDown">
    <block v-if="!string">
      <span>{{hour}}</span> : <span>{{minute}}</span> : <span>{{second}}</span>
    </block>
    <block v-else>
      {{hour}}:{{minute}}:{{second}}
    </block>
  </div>
</template>

<script>
let cls
export default {
  props: {
    date: Number,
    string: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      count: 0,
      hour: '00',
      minute: '00',
      second: '00'
    }
  },
  mounted () {
    const now = new Date().getTime()
    if (this.date > now) {
      this.count = Math.floor((this.date - now) / 1000)
      this.countDown()
    }
  },
  watch: {
    count (val) {
      const d = Math.floor(val / 60 / 60 / 24)
      const h = Math.floor(val / 60 / 60 % 24)
      const m = Math.floor(val / 60 % 60)
      const s = Math.floor(val % 60)
      const hour = d * 24 + h
      this.hour = hour < 10 ? '0' + hour : hour
      this.minute = m < 10 ? '0' + m : m
      this.second = s < 10 ? '0' + s : s
    }
  },
  methods: {
    countDown () {
      let self = this
      if (this.count > 0) {
        this.count--

        cls = setTimeout(self.countDown, 1000)
      } else {
        clearTimeout(cls)
        this.hour = '00'
        this.minute = '00'
        this.second = '00'
      }
    }
  }
}
</script>

<style lang="less">
.countDown {
  display: inline-flex;
  align-items: center;
  span {
    display: inline-block;
    margin: 0 4px;
    padding: 0 2px;
    text-align: center;
    // width:20px;
    height:20px;
    font-size:14px;
    color: #FFFFFF;
    background:rgba(51,51,51,1);
    border-radius:2px;
  }
}
</style>
