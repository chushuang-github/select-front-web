import { defineStore } from 'pinia'
import type { SettingState } from './type/type'

const useLayoutSettingStore = defineStore('settingStore', {
  state: (): SettingState => {
    return {
      fold: false, // 控制菜单折叠开始收起
      refresh: false, // 刷新
    }
  },
})

export default useLayoutSettingStore
