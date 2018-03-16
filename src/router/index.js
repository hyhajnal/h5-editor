import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Preview from '@/pages/preview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/preview',
      name: 'Preview',
      component: Preview
    }
  ]
})
