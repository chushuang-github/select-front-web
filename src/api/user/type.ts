// 登录接口需要携带的参数的ts类型
export interface loginFormData {
  username: string
  password: string
}

// 定义全部接口返回数据都拥有的类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 登录接口返回的数据类型
export interface loginResponseData extends ResponseData {
  data: string
}

// 获取用户信息返回的数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
