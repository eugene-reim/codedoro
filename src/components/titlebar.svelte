<script>
    import { open, close } from '../stores/modal.js';

    function closeWindow(){
        close();
    }
</script>
<nav class="titlebar flex w-full bg-gray-700 p-3 justify-between text-white items-center">
    <button class="exit-btn cursor-pointer" aria-label="Exit app" on:click="{closeWindow}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 pointer-events-none select-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    </button>
    <h1 class="title font-bold text-xl pointer-events-none select-none">
        Codedoro
    </h1>
    <button class="new-btn cursor-pointer" on:click={open} aria-label="Create task">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 pointer-events-none select-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
    </button>
</nav>