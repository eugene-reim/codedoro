import { writable } from "svelte/store";

export const isOpen = writable(false);

export function open() {
    isOpen.set(true);
}

export function close() {
    isOpen.set(false);
}
