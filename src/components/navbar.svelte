<script>
    import { currentScreen } from '../stores/screen.js';
    import { fly } from 'svelte/transition';

    $: showTasks = $currentScreen === 'tasks';
    $: showMain = $currentScreen === 'main';
</script>

<nav class="navbar bg-gray-700 p-3 pb-2 flex justify-between items-center text-gray-400">
    <button 
        class="timer-btn relative" 
        class:active={showMain}
        on:click={() => currentScreen.set('main')}
        aria-label="Open timer screen"
    >
        {#if showMain}
            <div class="absolute inset-0 bg-blue-400 opacity-10 rounded-lg transition-all duration-300" 
                 in:fly={{ y: 20, duration: 200 }}></div>
        {/if}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
        </svg>
    </button>
    <button 
        class="tasks-btn relative" 
        class:active={showTasks}
        on:click={() => currentScreen.set('tasks')}
        aria-label="Open tasks screen"
    >
        {#if showTasks}
            <div class="absolute inset-0 bg-blue-400 opacity-10 rounded-lg transition-all duration-300"
                 in:fly={{ y: 20, duration: 200 }}></div>
        {/if}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
    </button>
    <button class="stats-btn relative" aria-label="Open stats screen">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
    </button>
    <button class="settings-btn relative" aria-label="Open settings screen">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
      </svg>
    </button>
</nav>

<style>
    .active {
        @apply text-blue-400;
    }

    .timer-btn, .tasks-btn, .stats-btn, .settings-btn {
        @apply p-2 relative;
    }

    .timer-btn:hover, .tasks-btn:hover, .stats-btn:hover, .settings-btn:hover {
        @apply text-blue-400;
    }
</style>