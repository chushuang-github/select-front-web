import request from '@/utils/request'
import type { MenuResponseData, MenuParams } from './type'

enum API {
  PERMISSION_URL = '/admin/acl/permission', // 菜单
  ADDMENU_URL = '/admin/acl/permission/save', // 新增
  UPDATEMENU_URL = '/admin/acl/permission/update', // 编辑
  DELETEMENU_URL = '/admin/acl/permission/remove/', // 删除
}

// 菜单
export const reqMenu = () => {
  return request.get<any, MenuResponseData>(API.PERMISSION_URL)
}

// 新增、编辑
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEMENU_URL, data)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data)
  }
}

// 删除
export const reqRemoveMenu = (id: number) => {
  return request.delete<any, any>(API.DELETEMENU_URL + id)
}
