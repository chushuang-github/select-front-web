import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/token'
// 引入路由 (常量路由)
import { constantRoute } from '@/router/routes'
import type { loginFormData } from '@/api/user/type'
import type { UserState } from './type/type'

const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      token: getToken(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  actions: {
    // 登录
    async userLogin(data: loginFormData) {
      const result = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token as string
        setToken(result.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 获取用户信息
    async userInfo() {
      const result = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
      }
    },
    // 退出登录
    userLogout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      removeToken()
    },
  },
  getters: {},
})

export default useUserStore
