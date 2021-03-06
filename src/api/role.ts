import {http} from '@/plugins'
import Role from '@/models/Role'
import AclObject from '@/models/AclObject'

export function loadRoles () {
  return http.get<Array<Role>>('/roles')
}

export function addRole (role: Role) {
  return http.post<Role>('/roles/', role)
}

export function deleteRole (roleCode: string) {
  return http.delete(`/roles/${roleCode}`)
}

export function putRole (role: Role) {
  return http.put<Role>(`/roles/${role.roleCode}`, role)
}

export function loadPidsByRoleCode (roleCode: string) {
  return http.get<Array<string>>('/acl_entries', {params: {roleCode}})
}

export function loadAclObjects () {
  return http.get<Array<AclObject>>('/acl_objects')
}

export function addAclObject (roleCode: string, pid: string) {
  return http.post<AclObject>(`/acl_entries/${roleCode}/${pid}`)
}

export function delAclObject (roleCode: string, pid: string) {
  return http.delete(`/acl_entries/${roleCode}/${pid}`)
}
