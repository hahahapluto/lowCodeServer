import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { visualizer } from "rollup-plugin-visualizer";
import {autoComplete,Plugin as importToCDN} from 'vite-plugin-cdn-import'
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    vueJsx(),
    // visualizer({
    //   open: true, //在默认用户代理中打开生成的文件
    //   gzipSize: true, // 分析图生成的文件名
    //   brotliSize: true, // 收集 brotli 大小并将其显示
    //   filename: "stats.html", // 分析图生成的文件名
    // }),
    // 第三方库CDN引入
    importToCDN({
      prodUrl: "https://unpkg.com/{name}@{path}",
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: '3.3.4'
        },
        {
          name: 'vue-demi', // vue版本选好 不然会报错
          var: 'VueDemi',
          path: '0.14.5'
        },
        {
          name: "element-plus",
          var: "ElementPlus",
          path: "2.3.6",
          css: "2.3.6/dist/index.css",
        },
        {
          name: "@element-plus/icons-vue",
          var: "ElementPlusIconsVue", // 根据main.js中定义的来
          path: "2.1.0",
        }
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  
});
