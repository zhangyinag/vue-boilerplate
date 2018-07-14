import {RouteConfig} from 'vue-router/types/router'
import Home from '@/views/Home.vue'
import Error from '@/views/error/index.vue'
import Login from '@/views/login/index.vue'
import Dashboard from '@/views/dashboard/index.vue'
import User from '@/views/user/index.vue'

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {pid: 'home'},
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {pid: 'home.dashboard'}
      },
      {
        path: 'user',
        name: 'user',
        component: User,
        meta: {pid: 'home.user'}
      }
    ]
  },
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
