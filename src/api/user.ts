import {http} from '@/plugins'

export declare interface User {
  username: string,
  roles: Array<string>
}

export function loadUsers () {
  return http.get<Array<User>>('/users')
}