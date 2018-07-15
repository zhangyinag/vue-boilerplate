import {http} from '@/plugins'

export declare interface User {
  username: string
  roles: Array<string>
  cname?: string
  email?: string
  birthDate?: string
  address?: string
}

export function loadUsers () {
  return http.get<Array<User>>('/users')
}

export function deleteUser (username: string) {
  return http.delete(`/users/${username}`)
}

export function putUser (user: User) {
  return http.put<User>(`/users/${user.username}`, user)
}