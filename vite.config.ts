import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import meta from './package.json' assert { type: 'json' };
import yaml from 'js-yaml';

const config = yaml.load('./config.yml') as any;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    _VERSION_: JSON.stringify(meta.version),
    _BASE_URL_: config.base_url,
  },
});
