import path from 'path'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

const projectDir = path.dirname(new URL(import.meta.url).pathname)

export default defineConfig({
  server: {
    port: 8080,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(projectDir, 'src'),
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js',
      },
    ],
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2
          }
        }
      }
    })
  ]
})