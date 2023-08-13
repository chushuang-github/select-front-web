export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 菜单
export interface MenuData {
  id?: number
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

// 添加、编辑参数类型
export interface MenuParams {
  id?: number | string
  name: string
  code: string
  level: number | string
  pid: number | string
}
