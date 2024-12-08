<script>
    import { fade } from 'svelte/transition';
    import { isOpen, close } from '../stores/modal.ts';
    import { tasks } from '../stores/task.ts';
    import { t } from 'svelte-i18n';
    let taskName = '';
    let sessionTime = 25;
    let breakTime = 5;
    let longBreakTime = 15;
    let sessionsAmount = 4;

    function handleSubmit() {
        if (!taskName) return;

        // Add the new task with isCurrent set to true
        tasks.add({
            name: taskName,
            sessionTime: sessionTime,
            breakTime: breakTime,
            longBreakTime: longBreakTime,
            sessionsAmount: sessionsAmount,
            sessionsPassed: 0,
            isCurrent: true,
            isComplete: false
        });
        
        // Reset form
        taskName = '';
        sessionTime = 25;
        breakTime = 5;
        longBreakTime = 15;
        sessionsAmount = 4;
        
        close();
    }
</script>

{#if $isOpen}
<section class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10" transition:fade={{duration: 200}}>
    <div class="content bg-[--bg-primary] rounded-xl w-full max-w-md mx-4 p-6">
        <div class="text-[--text-primary] font-bold text-center text-xl mb-6">{$t('CreateTaskModal_Title')}</div>
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div class="space-y-2">
                <label for="taskName" class="block text-[--text-secondary]">{$t('CreateTaskModal_TaskNameLabel')}</label>
                <input 
                    type="text" 
                    id="taskName"
                    bind:value={taskName}
                    class="w-full px-3 py-2 bg-[--bg-secondary] text-[--text-primary] rounded focus:outline-none focus:ring-2 focus:ring-[--accent]"
                    required
                    placeholder={$t('CreateTaskModal_TaskNamePlaceholder')}
                    autocomplete="off"
                />
            </div>
            
            <div class="space-y-2">
                <label for="sessionTime" class="block text-[--text-secondary]">{$t('CreateTaskModal_SessionTimeLabel')}</label>
                <input 
                    type="number" 
                    id="sessionTime"
                    bind:value={sessionTime}
                    min="1"
                    class="w-full px-3 py-2 bg-[--bg-secondary] text-[--text-primary] rounded focus:outline-none focus:ring-2 focus:ring-[--accent]"
                    required
                />
            </div>
            
            <div class="space-y-2">
                <label for="breakTime" class="block text-[--text-secondary]">{$t('CreateTaskModal_BreakTimeLabel')}</label>
                <input 
                    type="number" 
                    id="breakTime"
                    bind:value={breakTime}
                    min="1"
                    class="w-full px-3 py-2 bg-[--bg-secondary] text-[--text-primary] rounded focus:outline-none focus:ring-2 focus:ring-[--accent]"
                    required
                />
            </div>
            
            <div class="space-y-2">
                <label for="longBreakTime" class="block text-[--text-secondary]">{$t('CreateTaskModal_LongBreakTimeLabel')}</label>
                <input 
                    type="number" 
                    id="longBreakTime"
                    bind:value={longBreakTime}
                    min="1"
                    class="w-full px-3 py-2 bg-[--bg-secondary] text-[--text-primary] rounded focus:outline-none focus:ring-2 focus:ring-[--accent]"
                    required
                />
            </div>
            
            <div class="space-y-2">
                <label for="sessionsAmount" class="block text-[--text-secondary]">{$t('CreateTaskModal_SessionsAmountLabel')}</label>
                <input 
                    type="number" 
                    id="sessionsAmount"
                    bind:value={sessionsAmount}
                    min="1"
                    class="w-full px-3 py-2 bg-[--bg-secondary] text-[--text-primary] rounded focus:outline-none focus:ring-2 focus:ring-[--accent]"
                    required
                />
            </div>
            
            <div class="flex justify-end space-x-4 mt-6">
                <button 
                    type="button"
                    on:click={close}
                    class="px-4 py-2 text-[--text-secondary] hover:text-[--text-secondary] hover:opacity-70 focus:outline-none"
                >
                    {$t('CreateTaskModal_CancelButton')}
                </button>
                <button 
                    type="submit"
                    class="px-4 py-2 bg-[--accent] text-[--text-primary] rounded hover:bg-[--accent] hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[--accent] font-semibold"
                >
                    {$t('CreateTaskModal_CreateButton')}
                </button>
            </div>
        </form>
    </div>
</section>
{/if}