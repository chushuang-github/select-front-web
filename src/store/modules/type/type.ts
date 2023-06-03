import type { RouteRecordRaw } from 'vue-router'
export interface UserState {
  token: string
  menuRoutes: RouteRecordRaw[]
}
