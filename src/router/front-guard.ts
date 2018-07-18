import {NavigationGuard} from 'vue-router/types/router'
import {auth} from '@/plugins'
import {loadAcl, loadUser} from '@/api/auth'
import NP from 'nprogress'

const whiteList = ['/login', '/error'] // ant style wildcat

export const frontGuard: NavigationGuard = function (to, from, next) {
  NP.start()
  if (onWhiteList(to.path)) {
    next()
    return
  }
  init().then(() => {
    if (checkPermission(to.meta && to.meta.pid)) next()
    else {
      if (!auth.isAuthenticated) {
        auth.targetUrl = to.fullPath
        if (from.path.startsWith('/login')) throw Error('already at login page')
        else next({path: '/login'})
      } else {
        next({path: '/error/403'})
      }
    }
  }).catch(() => {
    next(false)
    NP.done()
  })
}

function init (): Promise<any> {
  try {
    if (auth.isAuthenticated) return Promise.resolve()
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

function checkPermission (pid: string): boolean {
  if (!pid) return true
  return auth.checkPermission(pid)
}

function onWhiteList (path: string) {
  const convertRegEx = (expr: string) => {
    return new RegExp('^' +
      (expr || '')
        .replace(/\*\*/g, '#__#')
        .replace(/\*/g, '[^/]*')
        .replace(/#__#/g, '.*') +
      '$')
  }
  return whiteList.some(v => convertRegEx(v).test(path))
}
