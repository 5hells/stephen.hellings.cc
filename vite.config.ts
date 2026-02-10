import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'
import solid from 'vite-plugin-solid'
import sass from 'sass'

// https://vite.dev/config/
export default defineConfig({
  plugins: [deno(), solid()],
  css: {
    preprocessorOptions: {
      scss: {
      },
    },
  },
})
