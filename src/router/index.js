import Vue from 'vue'
import Router from 'vue-router'
import Edit from '@/pages/home'
import Preview from '@/pages/preview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/preview',
      name: 'Preview',
      component: Preview
    }
  ]
})
