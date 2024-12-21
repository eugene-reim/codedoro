import './app.css';
import './styles/theme.css';
import App from './App.svelte';
import { mount } from "svelte";

const app = mount(App, {
  target: document.getElementById('app') as HTMLElement
});

export default app;
