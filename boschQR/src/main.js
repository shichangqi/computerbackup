import Vue from 'vue'
import store from '@/store/store'
import App from './App'

const app = new Vue({
  store,
  ...App,
  mpType: 'app'

})
app.$mount()
