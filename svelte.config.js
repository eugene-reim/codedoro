import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-static';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    target: "#svelte",
    adapter: adapter({
      pages: 'public',
      assets: 'public',
      fallback: null
    }),
  },
  
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;