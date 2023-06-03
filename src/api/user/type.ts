// 登录接口需要携带的参数的ts类型
export interface loginFormData {
  username: string
  password: string
}

// 登录接口返回的响应类型
interface dataType {
  token?: string
  message?: string
}
export interface loginResponseData {
  code: number
  data: dataType
}

// 服务器返回用户信息类型
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface user {
  checkUser: userInfo
}
export interface userInfoResponseData {
  code: number
  data: user
}
