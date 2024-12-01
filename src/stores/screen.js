import { writable } from 'svelte/store';

export const currentScreen = writable('main'); // 'main' or 'tasks'
