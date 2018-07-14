import {frontGuard} from './front-guard'
import {postGuard} from './post-guard'
import {routes} from './routes'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: routes
})
router.beforeEach(frontGuard)
router.afterEach(postGuard)
export default router
