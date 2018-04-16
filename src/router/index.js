import Vue from 'vue'
import Router from 'vue-router'
import Edit from '@/pages/edit'
import Home from '@/pages/home'
import Preview from '@/pages/preview'
import PageDetail from '@/pages/pageDetail'
import ProjectDetail from '@/pages/projectDetail'
import Mobile from '@/modules/preview-area'
import Me from '@/pages/me'
import Login from '@/pages/login'

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
      path: '/mobile',
      name: 'Mobile',
      component: Mobile
    },
    {
      path: '/page',
      name: 'PageDetail',
      component: PageDetail
    },
    {
      path: '/project',
      name: 'ProjectDetail',
      component: ProjectDetail
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
