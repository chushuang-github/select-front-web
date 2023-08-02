export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 用户列表
export interface User {
  id?: number | string
  createTime?: string
  updateTime?: string
  name: string
  username: string
  password: string
  phone?: null
  roleName?: string
}
export interface UserResponseData extends ResponseData {
  data: {
    searchCount: boolean
    size: number
    total: number
    pages: number
    current: number
    records: User[]
  }
}
