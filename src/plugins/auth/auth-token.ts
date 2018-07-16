
import Cookie from 'js-cookie'

export let enabled: boolean = true
export const tokenKey: string = 'X-Token'

export function getToken (): string| null {
  if (!enabled) return null
  return Cookie.get(tokenKey)
}

export function setToken (token: string| null): void {
  if (!enabled) return
  if (!token) Cookie.remove(tokenKey)
  else Cookie.set(tokenKey, token)
}
