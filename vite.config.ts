import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // svg图标放在src/assets/icons文件夹下面 (配置完之后，使用svg图片会自动去这个文件目录下面寻找)
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format (svg图片复用symbolId配置)
        // <use xlink:href="#icon-copyright"></use>，配置xlink:href复用的symbolId的名字格式
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        // 保证开发阶段可以使用mock接口
        // @ts-ignore
        localEnabled: command === "serve",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
      },
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
  };
});
