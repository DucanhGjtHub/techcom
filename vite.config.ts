import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    
    // === CẤU HÌNH THÊM CHO GITHUB PAGES ===
    // 1. Đặt đường dẫn cơ sở theo tên repository
    base: '/techcom/',
    
    // 2. Đặt tên thư mục build là 'docs'
    build: {
      outDir: 'docs'
    },
    // =====================================

    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
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