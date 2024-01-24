import {defineConfig} from 'vitest/config';
import vuePlugin from '@vitejs/plugin-vue';
import {stringPlugin} from 'vite-string-plugin';

export default defineConfig({
  test: {
    include: ['src/**/*.test.js'],
    setupFiles: ['./src/js/test/setup.js'],
    environment: 'jsdom',
    testTimeout: 20000,
    open: false,
    allowOnly: true,
    passWithNoTests: true,
    globals: true,
    watch: false,
  },
  plugins: [
    stringPlugin(),
    vuePlugin(),
  ],
});
