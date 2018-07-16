import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import { message, confirm } from './ui'
import router from '@/router'
import {TransError, transform} from './transformer'
import {auth} from '@/plugins'

let lastUrl: string| null = null

export function req (config: AxiosRequestConfig): any {
  // add timestamp, prevent IE cache
  if (config.method === 'get') config.url = timestampUrl(config.url || '')
  // token auth
  if (auth.tokenEnabled) {
    config.headers[auth.tokenKey] = auth.token
  }
  return config
  function timestampUrl (url: string) {
    if (url.indexOf('?') === -1) return url + '?_t=' + Date.now()
    return url + '&_t=' + Date.now()
  }
}

export function reqErr (err: any): any {
  return Promise.reject(err) // do nothing
}

export function res (response: AxiosResponse): any {
  if (response.status === 200) {
    return transform(response).catch((e: TransError) => {
      if (e.status === 401) {
        handleTokenExpired()
      }
      message(e.message)
      return Promise.reject(e.payload)
    })
  } else {
    message(response.statusText)
    return Promise.reject(response.statusText)
  }
}

export function resErr (err: AxiosError): any {
  let res = err && err.response
  if (!res) {
    message(err && err.message)
  } else if (res.status === 401) {
    handleTokenExpired()
  } else {
    message(res.statusText || 'Unknown Error')
  }
  return Promise.reject(err)
}

let handling = false
function handleTokenExpired () {
  if (handling) return
  handling = true
  let path = getPath()
  let user = auth.user
  if (path.startsWith('/login')) {
    handling = false
    return
  }
  if (!user) {
    toLogin()
    return
  }
  confirm('登录失效', '是否选择重新登录').then(() => {
    toLogin()
  }).catch(() => {
    handling = false
  })

  function completeFn () {
    handling = false
  }

  function getPath () {
    return window.location.hash.substr(1)
  }

  function toLogin () {
    auth.targetUrl = path
    router.push('/login', completeFn, completeFn)
  }
}
