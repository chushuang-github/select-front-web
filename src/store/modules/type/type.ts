import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'

export interface UserState {
  token: string
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

export interface SettingState {
  fold: boolean
  refresh: boolean
}

export interface CategoryState {
  c1Arr: CategoryObj[]
  c1Id: number | string
  c2Arr: CategoryObj[]
  c2Id: number | string
  c3Arr: CategoryObj[]
  c3Id: number | string
}
