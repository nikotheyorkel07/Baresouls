import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/Components': path.resolve(__dirname, './Components'),
      '@/Pages': path.resolve(__dirname, './Pages'),
      '@/Entities': path.resolve(__dirname, './Entities'),
      '@/src': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});