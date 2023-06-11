// 统一管理咱们项目用户相关的接口
import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from './type'

// 项目用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login', // 登录
  USERINFO_URL = '/admin/acl/index/info', // 获取用户信息
  LOGOUT_RUL = '/admin/acl/index/logout', // 退出登录
}

// 登录
export const reqLogin = (data: loginFormData) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data)
}

// 获取用户信息
export const reqUserInfo = () => {
  return request.get<any, userInfoResponseData>(API.USERINFO_URL)
}

// 退出登录
export const reqLogout = () => {
  return request.post<any, any>(API.LOGOUT_RUL)
}
