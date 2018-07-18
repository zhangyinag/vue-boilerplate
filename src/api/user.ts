import {http} from '@/plugins'
import User from '@/models/User'

export function loadUsers (params?: {username: string}) {
  return http.get<Array<User>>('/users', {params: params})
}

export function deleteUser (username: string) {
  return http.delete(`/users/${username}`)
}

export function putUser (user: User) {
  return http.put<User>(`/users/${user.username}`, user)
}

export function queryUsersLikeUsername (username?: string) {
  return http.get<User>(`/users/like/username`, {params: {username}})
}
