import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:"./",
  resolve:{
    alias:{
      '@':'./src'
    }
  },
  server:{
    hmr:true,//设置别名后，热更新容易失效 强制开启
  }
})
