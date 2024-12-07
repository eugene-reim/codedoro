import { writable, type Writable } from "svelte/store";

export const isOpen: Writable<boolean> = writable(false);

export function open(): void {
    isOpen.set(true);
}

export function close(): void {
    isOpen.set(false);
}
