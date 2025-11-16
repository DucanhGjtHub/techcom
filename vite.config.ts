import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// 1. THÊM DÒNG NÀY ĐỂ IMPORT PLUGIN
import legacy from '@vitejs/plugin-legacy';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    
    // === CẤU HÌNH GITHUB PAGES ===
    base: '/techcom/',
    build: {
      outDir: 'docs'
    },
    // =============================

    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    
    plugins: [
      react(),
      
      // 2. THÊM PLUGIN VÀO ĐÂY ĐỂ HỖ TRỢ TRÌNH DUYỆT CŨ/DI ĐỘNG
      legacy({
        targets: ['defaults', 'not IE 11']
      })
    ],

    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});