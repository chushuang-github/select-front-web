import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import { setToken, getToken } from '@/utils/token'
import type { loginFormData } from '@/api/user/type'
import type { UserState } from './type'

let useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      token: getToken(),
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
  },
  getters: {},
})

export default useUserStore
