import Vue from 'vue'
import App from './App.vue'

import MathEditor from '../lib/index'

Vue.use(MathEditor)

new Vue({
  el: '#app',
  render: h => h(App)
})
