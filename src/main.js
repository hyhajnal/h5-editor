// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../styles/element-variables.scss'
import store from '../src/store'
import clickoutside from './directive'
import axios from './request'
import Vant from 'vant'
import 'vant/lib/index.css'
import VueHighlightJS from 'vue-highlightjs'

Vue.use(Vant)
Vue.use(VueHighlightJS)

Vue.prototype.axios = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.directive('clickoutside', clickoutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
