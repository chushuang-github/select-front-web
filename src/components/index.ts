// 自定义插件 (统一注册全局组件)
import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
// element-plus提供的所有图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App, Component } from 'vue'

const components: { [name: string]: Component } = { SvgIcon, Category }

export default {
  install(app: App) {
    // 将自己的组件注册全局组件
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
    // 将element-plus提供的所有icon注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
