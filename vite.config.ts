import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png' ,'icons/*.png'],
      manifest: {
        name: 'Tic Tac Toe',
        short_name: 'Jogo da velha',
        description: 'Instalador do jogo tic tac toe',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: "./public/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: 'any'
          },
          {
            src: "./public/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: 'any'
          },
          {
            src: './public/icons/icon-44x44.png',
            sizes: '44x44',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: './public/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: './public/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: './public/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      }
    })
  ],
})
