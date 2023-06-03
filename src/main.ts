import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// @ts-ignore 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
// svg插件需要的配置代码
import 'virtual:svg-icons-register'
import App from '@/App.vue'
import globalComponent from '@/components'
// 路由
import router from '@/router'
// 仓库
import pinia from '@/store'
import '@/styles/index.scss'

const app = createApp(App)

// 注册ElementPlus，并且使用国际化语言为中文
app.use(ElementPlus, {
  locale: zhCn,
})
// 自定义全局组件
app.use(globalComponent)
// 注册路由
app.use(router)
// 注册仓库
app.use(pinia)
app.mount('#app')
