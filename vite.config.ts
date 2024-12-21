import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';


const host = process.env.TAURI_DEV_HOST;
export default defineConfig({
  plugins: [
    svelte({
      preprocess: preprocess({
        postcss: true,
        defaults: {
          style: 'postcss'
        }
      }),
      compilerOptions: {
        dev: true
      }
    })
  ],
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1420
        }
      : undefined,
    watch: {
      ignored: ['**/src-tauri/**']
    },
  },
  optimizeDeps: {
    exclude: ['@sveltejs/vite-plugin-svelte']
  },
  assetsInclude: ['**/*.svg'],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]'
      }
    }
  }
});
