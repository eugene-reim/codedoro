<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    import {slide, fade} from 'svelte/transition';
    export let options: string[] = [];
    export let selected: string = '';
    const dispatch = createEventDispatcher();
    
    $:isOpen = false; // State to track dropdown visibility

    function selectOption(option: string) {
        selected = option;
        dispatch('change', selected);
        isOpen = false; // Close the dropdown after selection
    }

    function toggleDropdown() {
        isOpen = !isOpen; // Toggle the dropdown visibility
    }

    function handleClickOutside(event: MouseEvent) {
        const dropdown = document.getElementById('dropdown'); // Get the dropdown element
        if (dropdown && !dropdown.contains(event.target as Node)) {
            isOpen = false; // Close the dropdown if clicked outside
        }
    }

    onMount(() => {
        document.addEventListener('mousedown', handleClickOutside); // Add event listener
    });

    onDestroy(() => {
        document.removeEventListener('mousedown', handleClickOutside); // Clean up event listener
        return; // Add return statement to ensure proper closure
    });
</script>

<div class="relative inline-block text-left">
    <div>
        <button type="button" on:click={toggleDropdown} class="{isOpen ? 'rounded-t-md' : 'rounded-md'} transition-all duration-200 inline-flex items-center justify-between w-full shadow-sm px-2 py-2 bg-[--bg-primary] text-sm font-medium text-[--text-primary]" aria-haspopup="true" aria-expanded={isOpen}>
            {selected || 'Select Language'}
            <svg class="h-5 w-5 pl-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    </div>

    {#if isOpen}
    <div id="dropdown" class="absolute z-10 w-full rounded-b-md bg-[--bg-primary] shadow-lg" transition:slide={{duration: 100}}>
        <div class="py-1 divide-y" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {#each options.filter(opt => opt !== selected) as option}
                <button on:click={() => selectOption(option)} class="block w-full text-left px-2 py-1 text-sm text-[--text-secondary]">
                    {option}
                </button>
            {/each}
        </div>
    </div>
    {/if}
</div>
