import {Route} from 'vue-router'
import NP from 'nprogress'

export const postGuard = function (to: Route, from: Route): any {
  NP.done()
}
