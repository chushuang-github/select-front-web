// vite提供了loadEnv，可以加载不同环境下面的环境变量
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取各种环境下对应的变量 (有哪些变量，可以去环境变量的文件里面查看)
  // loadEnv(当前所处的开发环境, 环境文件的父级路径)
  // process.cwd()：就是项目根目录的路径
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      // svg图片
      createSvgIconsPlugin({
        // svg图标放在src/assets/icons文件夹下面 (配置完之后，使用svg图片会自动去这个文件目录下面寻找)
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format (svg图片复用symbolId配置)
        // <use xlink:href="#icon-copyright"></use>，配置xlink:href复用的symbolId的名字格式
        symbolId: 'icon-[dir]-[name]',
      }),
      // mock数据
      viteMockServe({
        // 保证开发阶段可以使用mock接口
        localEnabled: command === 'serve',
      }),
    ],
    resolve: {
      // 路径别名
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    // scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "./src/styles/variable.scss";`,
        },
      },
    },
    // 代理
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
