/// <reference types="vitest"/>

import {resolve} from 'node:path';
import {defineConfig} from 'vite';
import pkg from './package.json';

import types from 'vite-plugin-dts';
import paths from 'vite-tsconfig-paths';

const files = {
  es: `${pkg.name}.mjs`,
  cjs: `${pkg.name}.cjs`,
  iife: `${pkg.name}.iife.js`,
};

export default defineConfig({
  plugins: [
    types(),
    paths(),
  ],
  build: {
    lib: {
      formats: Object.keys(files) as Array<keyof typeof files>,
      entry: resolve(__dirname, pkg.source),
      name: pkg.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(''),
      fileName: format => files[format],
    },
    rollupOptions: {
      input: [pkg.source],
    }
  },
});
