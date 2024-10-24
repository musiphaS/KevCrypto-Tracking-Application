import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@fortawesome/free-solid-svg-icons': '@fortawesome/free-solid-svg-icons/index',
    }
  },
  optimizeDeps: {
    include: ['axios']
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios']
        }
      }
    }
  }
});