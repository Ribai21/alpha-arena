import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any path aliases your project uses
      '@': path.resolve(__dirname, './src'),
    },
  },
  // If you're using environment variables
  envPrefix: 'REACT_APP_',
});