import request from '@/utils/request'
import type { RoleData, RoleResponseData, MenuResponseData } from './type'

// 项目用户相关的请求地址
enum API {
  ROLELIST_URL = '/admin/acl/role/', // 角色列表
  ADDROLE_URL = '/admin/acl/role/save', // 新增角色
  UPDATEROLE_URL = '/admin/acl/role/update', // 编辑角色
  MENU_URL = '/admin/acl/permission/toAssign/', // 菜单
  PERMISSION_URL = '/admin/acl/permission/doAssign?', // 分配权限
  DELECTROLE_URL = '/admin/acl/role/remove/', // 删除角色
}

// 角色列表
export const reqRoleList = (page: number, limit: number, roleName: string) => {
  return request.get<any, RoleResponseData>(
    API.ROLELIST_URL + `${page}/${limit}?roleName=${roleName}`,
  )
}

// 新增、编辑角色
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}

// 根据角色获取菜单
export const reqMenu = (roleId: number) => {
  return request.get<any, MenuResponseData>(API.MENU_URL + roleId)
}

// 分配权限
export const reqPermission = (roleId: number, permissionId: number[]) => {
  return request.post<any, any>(
    API.PERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )
}

// 删除
export const reqRemoveRole = (roleId: number) => {
  return request.delete<any, any>(API.DELECTROLE_URL + roleId)
}
