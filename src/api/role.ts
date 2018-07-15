import {http} from '@/plugins'

export declare interface Role {
  roleCode: string,
  roleName: string
}

export declare interface AclObject {
  pid: string
  name: string,
  description?: string| null,
  configurable?: boolean,
  parentPid?: string| null
}

export function loadRoles () {
  return http.get<Array<Role>>('/roles')
}

export function loadPidsByRoleCode (roleCode: string) {
  return http.get<Array<string>>('/acl_entries', {params: {roleCode}})
}

export function loadAclObjects () {
  return http.get<Array<AclObject>>('/acl_objects')
}
