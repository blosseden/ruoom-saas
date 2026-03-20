import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@features': resolve(__dirname, 'src/features'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@lib': resolve(__dirname, 'src/lib'),
      '@mocks': resolve(__dirname, 'src/mocks'),
      '@recoil': resolve(__dirname, 'src/recoil'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@types': resolve(__dirname, 'src/types'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
