import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/*.png'],
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
            src: './icons/X-icon.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: './icons/X-icon.png',
            sizes: '256x256',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
