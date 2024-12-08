import { writable } from 'svelte/store';

export const theme = writable({
  darkMode: false
});

// Initialize dark mode from local storage
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode !== null) {
  theme.update(value => ({ ...value, darkMode: JSON.parse(savedDarkMode) }));
}

// Function to toggle dark mode
export function toggleDarkMode() {
  theme.update(value => {
    const newValue = !value.darkMode;
    localStorage.setItem('darkMode', JSON.stringify(newValue));
    return { ...value, darkMode: newValue };
  });
  return applyTheme();
}

// Function to apply the theme
export function applyTheme() {
  theme.subscribe(value => {
    if (value.darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  });
}

// Function to get current theme
export function getCurrentTheme() {
  let currentTheme: boolean = false;

  const unsubscribe = theme.subscribe(value => {
    currentTheme = value.darkMode;
  });

  unsubscribe();

  return currentTheme;
}
