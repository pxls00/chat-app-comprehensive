import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue"
import path from "path";

export default defineConfig({
  plugins: [vue()],
  environment: 'happy-dom',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
})