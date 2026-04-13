import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl(), 
    VitePWA({
      devOptions: {
        enabled: true, // ativa o SW em dev para testes
      },
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Fit Manager',
        short_name: 'Fit',
        description: 'Gerencie suas atividades físicas de forma eficiente',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',       // sem barra do navegador
        start_url: '/home', // abre direto na área do aluno
        //scope: '/aluno/',             // PWA limitado às rotas do aluno
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        // cacheia rotas de aluno + assets estáticos
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/dashboard/, /^\/alunos/, /^\/cadastro/], // instrutor nunca cai no SW
      },
    }),
  ],
  server: {
    host: true,        // continua acessível pelo IP na rede       // ativa HTTPS para testes de PWA
  },
})
