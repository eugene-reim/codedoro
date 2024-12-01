import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/vite-plugin-svelte').Config} */
const config = {
  kit: {
    adapter: adapter()
  },
  preprocess: [
    preprocess({
      postcss: true,
      preserve: ['ld+json'],
    }),
  ],
  compilerOptions: {
    dev: true
  }
};

export default config;