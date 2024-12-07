import { writable, type Writable } from 'svelte/store';

type Screen = 'main' | 'tasks' | 'stats' | 'settings';

export const currentScreen: Writable<Screen> = writable('main');
