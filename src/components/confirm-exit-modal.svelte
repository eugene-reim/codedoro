<script lang="ts">
    import { fade } from 'svelte/transition';
    import {t} from 'svelte-i18n';
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
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-[--bg-primary] rounded-xl p-6 shadow-xl"
         in:fade={{duration: 200, delay: 100}} 
         out:fade={{duration: 150}}>
        <h2 class="text-xl font-bold text-[--text-primary] mb-4">{$t('ConfirmExitModal_Title')}</h2>
        <p class="text-[--text-secondary] mb-6">{$t('ConfirmExitModal_Message')}</p>
        <div class="flex justify-end gap-3">
            <button 
                class="px-4 py-2 rounded-lg bg-[--bg-secondary] text-[--text-secondary] hover:bg-[--bg-secondary] hover:opacity-50 transition-colors"
                on:click={cancelExit}>
                {$t('ConfirmExitModal_CancelButton')}
            </button>
            <button 
                class="px-4 py-2 rounded-lg bg-[--warning] text-[--text-primary] hover:bg-[--warning] hover:opacity-50 transition-colors"
                on:click={confirmExit}>
                {$t('ConfirmExitModal_ExitButton')}
            </button>
        </div>
    </div>
</div>
{/if}
