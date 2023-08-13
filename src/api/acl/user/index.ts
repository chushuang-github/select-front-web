import request from '@/utils/request'
import type {
  UserResponseData,
  User,
  AllRoleResponseData,
  SetRoleData,
} from './type'

// 项目用户相关的请求地址
enum API {
  ALLUSER_URL = '/admin/acl/user/', // 用户列表
  ADDUSER_URL = '/admin/acl/user/save', // 添加
  UPDATEUSER_URL = '/admin/acl/user/update', // 更新
  ALLROLE_URL = '/admin/acl/user/toAssign/', // 获取全部职位，和当前账号拥有的职位
  SETROLE_URL = '/admin/acl/user/doAssignRole', // 给已有的用户分配角色
  DELETEUSER_URL = '/admin/acl/user/remove/', // 单个删除
  ELETEALLUSER_URL = '/admin/acl/user/batchRemove', // 批量删除
}

// 用户列表
export const reqUserInfo = (page: number, limit: number, username: string) => {
  return request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}?username=${username}`,
  )
}

// 添加
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}

// 获取全部职位，和当前账号拥有的职位
export const reqAllRole = (userId: number) => {
  return request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)
}

// 分配角色
export const reqSetUserRole = (data: SetRoleData) => {
  return request.post<any, any>(API.SETROLE_URL, data)
}

// 单个删除
export const reqRemoveUser = (id: number) => {
  return request.delete<any, any>(API.DELETEUSER_URL + id)
}

// 批量删除
export const reqRemoveAllUser = (idList: number[]) => {
  return request.delete<any, any>(API.ELETEALLUSER_URL, { data: idList })
}
