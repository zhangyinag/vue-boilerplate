import http from '@/http/index'

export declare interface User {
  username: string,
  roles: Array<string>
}

export function login (username: string, password: string) {
  return http.post<string>('/login', {username, password})
}

export function logout () {
  return http.post('/logout')
}

export function loadUser () {
  return http.get<User>('/user')
}

export function loadAcl () {
  return http.get<Array<string>>('/user/acl')
}