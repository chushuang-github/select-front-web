export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 角色列表
export interface RoleData {
  id?: number | string
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}
export interface RoleResponseData extends ResponseData {
  data: {
    records: RoleData[]
    total: number
    size: number
    current: number
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

// 分配权限
export interface MenuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  select: boolean
  children?: MenuData[]
}
export interface MenuResponseData extends ResponseData {
  data: MenuData[]
}
