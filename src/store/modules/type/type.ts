import type { RouteRecordRaw } from 'vue-router'
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
