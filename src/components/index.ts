// 自定义插件 (统一注册全局组件)
import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'

const components: { [name: string]: Component } = { SvgIcon }

export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}
