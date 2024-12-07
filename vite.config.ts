import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';

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
