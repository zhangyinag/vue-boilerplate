import {NavigationGuard} from 'vue-router/types/router'
import {auth} from '@/plugins'
import {loadAcl, loadUser} from '@/api/auth'
import NP from 'nprogress'

const whiteList = ['/login', '/error']

export const frontGuard: NavigationGuard = function (to, from, next) {
  NP.start()
  if (onWhiteList(to.path)) {
    next()
    return 
  }
  init().then(() => {
    if (authenticate(to.meta && to.meta.pid)) next()
    else next({path: '/error/403'})
  }).catch(err => {
    next(false)
    NP.done()
  })
  
}

function init(): Promise<any> {
  try {
    let user = auth.user
    if (user) return Promise.resolve()
    return Promise.all([loadUser(), loadAcl()])
      .then(([user, acl]) => {
          auth.user = user
          auth.acl = acl
        }
      )
  } catch (e) {
    console.error(e)
    return Promise.reject(e)
  }
}

function authenticate (pid: string): boolean {
  if (!pid) return true
  return auth.authenticate(pid)
}

function onWhiteList (path: string) {
  return whiteList.some(v => path.startsWith(v))
}