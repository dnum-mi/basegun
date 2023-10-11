import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import UnoCSS from 'unocss/vite'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

const path = require('path')
const apiHost = process.env.API_HOST || 'http://basegun-backend:5000'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS({
      transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
      ],
    }),
    vue(),
    VitePWA({
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      base: '/',
      srcDir: 'src',
      manifest: {
        name: 'Basegun - beta',
        short_name: 'Basegun',
        description: 'Identification des armes à feu',
        theme_color: 'var(--blue-france-sun-113-625)',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    proxy: {
      '^/api': {
        target: `${apiHost}`,
        changeOrigin: true
      },
    },
  },
})
