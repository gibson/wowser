import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  logLevel: 'info',
  plugins: [ react(), glsl(), nodePolyfills() ],
})

