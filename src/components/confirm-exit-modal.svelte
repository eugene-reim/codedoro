<script lang="ts">
    import { fade } from 'svelte/transition';
    import {t} from 'svelte-i18n';
    import {invoke} from '@tauri-apps/api/core';

    function confirmExit() {
        if ('__TAURI_INTERNALS__' in window) {
            // Check if running in Tauri instance
             return invoke('close_app');
        }else if (window.matchMedia('(display-mode: standalone)').matches || ('standalone' in window.navigator)) {
            // Check if running as PWA
            window.close();
        } else {
            // Running in browser tab
            window.close();
            // Fallback if window.close() doesn't work (most browsers)
            window.location.href = "about:blank";
        }
    }

    function cancelExit() {
        show = false
    }
    
    interface Props {
        show?: boolean;
    }

    let { show = $bindable(false) }: Props = $props();
</script>

{#if show}
<div class="fixed inset-0 z-50" transition:fade={{duration: 200}}>
    <button class="absolute inset-0 bg-black/50" onclick={cancelExit} aria-label="Close modal"></button>
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-[--bg-primary] rounded-xl p-6 shadow-xl"
         in:fade={{duration: 200, delay: 100}} 
         out:fade={{duration: 150}}>
        <h2 class="text-xl font-bold text-[--text-primary] mb-4">{$t('ConfirmExitModal_Title')}</h2>
        <p class="text-[--text-secondary] mb-6">{$t('ConfirmExitModal_Message')}</p>
        <div class="flex justify-end gap-3">
            <button 
                class="px-4 py-2 rounded-lg bg-[--bg-secondary] text-[--text-secondary] hover:bg-[--bg-secondary] hover:opacity-50 transition-colors"
                onclick={cancelExit}>
                {$t('ConfirmExitModal_CancelButton')}
            </button>
            <button 
                class="px-4 py-2 rounded-lg bg-[--warning] text-[--text-primary] hover:bg-[--warning] hover:opacity-50 transition-colors"
                onclick={confirmExit}>
                {$t('ConfirmExitModal_ExitButton')}
            </button>
        </div>
    </div>
</div>
{/if}
