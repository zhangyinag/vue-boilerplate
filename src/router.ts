import Vue from 'vue'
import Router from 'vue-router'
import {routes, frontGuard, postGuard} from '@/router/index'

Vue.use(Router)
const router = new Router({
  routes: routes
})
router.beforeEach(frontGuard)
router.afterEach(postGuard)
export default router

