import store from '@/store'
import {User} from '@/api/auth'

export function setAcl (acl: Array<string>) {
  const map = new Map()
  acl.forEach(v => {
    map.set(v, true)
  })
  store.commit('app/setAcl', map)
}

export function getAcl (pid?: string) {
  const acl = (<any>store.state).app.acl
  return pid ? acl.get(pid) : Array.of(acl.keys())
}

export function setUser (user: User| null): void {
  store.commit('app/setUser', user)
}

export function getUser (): User| null {
  return (<any>store.state).app.user
}

export function getUsername (): string | null {
  const user = getUser()
  return user && user.username
}

export function setTargetUrl (url: string| null): void {
  store.commit('app/setTargetUrl', url)
}

export function authenticate (pid: string): boolean {
  if (!pid) return false
  return getAcl(pid)
}

export function getTargetUrl (): string| null {
  return (<any>store.state).app.targetUrl
}

export function clear (): void {
  setTargetUrl(null)
  setUser(null)
  setAcl([])
}

export const auth = {
  set targetUrl (url: string| null) {
    setTargetUrl(url)
  },
  get targetUrl (): string| null {
    return getTargetUrl()
  },
  set user (user: User| null) {
    setUser(user)
  },
  get user (): User| null {
    return getUser()
  },
  set acl (acl: Array<string>) {
    setAcl(acl)
  },
  get acl (): Array<string> {
    return getAcl()
  },
  authenticate: authenticate,
  clear: clear
}

export default function install (Vue: any, options: any) {
  Vue.prototype.$auth = auth
}