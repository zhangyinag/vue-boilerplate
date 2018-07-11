import Cookie, {remove} from 'js-cookie'

export let enabled: boolean = true
export const tokenKey: string = 'X-Token'

export function getToken (): string| null {
  if (!enabled) return ''
  return Cookie.get(tokenKey)
}

export function setToken (token: string| null): void {
  if (!enabled) return
  if (!token) removeToken()
  else Cookie.set(tokenKey, token)
}

export function removeToken () {
  if (!enabled) return
  return Cookie.remove(tokenKey)
}
