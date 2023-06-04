import type { RouteRecordRaw } from 'vue-router'
export interface UserState {
  token: string
  menuRoutes: RouteRecordRaw[]
}

export interface SettingState {
  fold: boolean
  refresh: boolean
}
