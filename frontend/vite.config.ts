import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      containers: '/src/containers',
      utils: '/src/utils',
      assets: '/src/assets',
    },
  },
});
