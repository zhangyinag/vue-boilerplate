import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Error from './views/error/index.vue'
import Login from './views/login/index.vue'
import Dashboard from './views/dashboard/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/error:/code',
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
})
