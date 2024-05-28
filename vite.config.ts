import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import meta from './package.json' assert { type: 'json' };
import yaml from 'js-yaml';
import fs from 'fs';

const config = yaml.load(fs.readFileSync('./config.yml').toString()) as any;

console.log('Building with config:', config);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: config.base_url,
  define: {
    _VERSION_: JSON.stringify(meta.version),
    _BASE_URL_: JSON.stringify(config.base_url),
  },
});
