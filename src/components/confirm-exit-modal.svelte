<script lang="ts">
    import { fade } from 'svelte/transition';
    
    export let onConfirm: () => void;
    export let onCancel: () => void;

    function confirmExit() {
        onConfirm();
    }

    function cancelExit() {
        onCancel();
    }
    
    export let show: boolean = false;
</script>

{#if show}
<div class="fixed inset-0 z-50" transition:fade={{duration: 200}}>
    <button class="absolute inset-0 bg-black/50" on:click={cancelExit} aria-label="Close modal"></button>
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-gray-800 rounded-xl p-6 shadow-xl"
         in:fade={{duration: 200, delay: 100}} 
         out:fade={{duration: 150}}>
        <h2 class="text-xl font-bold text-white mb-4">Exit Confirmation</h2>
        <p class="text-gray-300 mb-6">Are you sure you want to exit the application?</p>
        <div class="flex justify-end gap-3">
            <button 
                class="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                on:click={cancelExit}>
                Cancel
            </button>
            <button 
                class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                on:click={confirmExit}>
                Exit
            </button>
        </div>
    </div>
</div>
{/if}
