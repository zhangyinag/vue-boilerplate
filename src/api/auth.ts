import {http} from '@/plugins'
import User from '@/models/User'

export function login (username: string, password: string) {
  return http.post<string>('/login', {username, password})
}

export function logout () {
  return http.post('/logout')
}

export function loadUser () {
  return http.get<User>('/auth')
}

export function loadAcl () {
  return http.get<Array<string>>('/auth/acl')
}
