import request from '@/utils/request'
import type { UserResponseData, User } from './type'

// 项目用户相关的请求地址
enum API {
  ALLUSER_URL = '/admin/acl/user/', // 用户列表
  ADDUSER_URL = '/admin/acl/user/save', // 添加
  UPDATEUSER_URL = '/admin/acl/user/update', // 更新
}

// 用户列表
export const reqUserInfo = (page: number, limit: number) => {
  return request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}`,
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
