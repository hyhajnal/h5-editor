import Vue from 'vue'
import Router from 'vue-router'
import Edit from '@/pages/edit'
import Home from '@/pages/home'
import Preview from '@/pages/preview'
import PageDetail from '@/pages/pageDetail'
import ProjectDetail from '@/pages/projectDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/preview',
      name: 'Preview',
      component: Preview
    },
    {
      path: '/page',
      name: 'PageDetail',
      component: PageDetail
    }, {
      path: '/project',
      name: 'ProjectDetail',
      component: ProjectDetail
    }
  ]
})
