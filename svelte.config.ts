import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  // Enable runtime checks when not in production
  compilerOptions: {
    dev: process.env.NODE_ENV !== 'production'
  },
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  preprocess: vitePreprocess()
};
