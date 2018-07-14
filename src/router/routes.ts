import {RouteConfig} from 'vue-router/types/router'
import Home from '@/views/Home.vue'
import Error from '@/views/error/index.vue'
import Login from '@/views/login/index.vue'
import Dashboard from '@/views/dashboard/index.vue'
import User from '@/views/system/user/index.vue'
import Authority from '@/views/system/authority/index.vue'

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {pid: 'home', cname: '首页'},
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {pid: 'home.dashboard', cname: '仪表盘'}
      },
      {
        path: 'system/user',
        name: 'system.user',
        component: User,
        meta: {pid: 'home.system.user', cname: '用户管理'}
      },
      {
        path: 'system/authority',
        name: 'system.authority',
        component: Authority,
        meta: {pid: 'home.system.authority', cname: '权限管理'}
      }
    ]
  },
  // DON'T CHANGE BELOW
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/error/:code',
    name: 'error',
    component: Error
  },
  {
    path: '',
    redirect: '/'
  },
  {
    path: '*',
    redirect: '/error/404'
  }
]
