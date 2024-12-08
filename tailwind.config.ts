import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx,json}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
