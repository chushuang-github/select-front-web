import { defineStore } from 'pinia'
import type { SettingState } from './type/type'

let useLayoutSettingStore = defineStore('settingStore', {
  state: (): SettingState => {
    return {
      fold: false, // 控制菜单折叠开始收起
    }
  },
})

export default useLayoutSettingStore
