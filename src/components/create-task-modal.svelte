<script lang="ts">
    import { fade } from 'svelte/transition';
    import { TaskModal } from '../stores/modal.svelte.ts';
    import { tasks } from '../stores/task.ts';
    import { t } from 'svelte-i18n';
    let taskName = $state('');
    let sessionTime = $state(25);
    let breakTime = $state(5);
    let longBreakTime = $state(15);
    let sessionsAmount = $state(4);

    function handleSubmit(event: SubmitEvent) {
        if (!taskName) return;
        //prevent page refresh when onSubmit event is triggered
        event.preventDefault()
        // Add the new task and set is as current task
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
        
        TaskModal.close();
    }
</script>

{#if TaskModal.get()}
<section class="modal fixed inset-0 flex items-center justify-center z-50" transition:fade={{duration: 200}}>
    <button class="absolute inset-0 bg-black/50" onclick={TaskModal.close} aria-label="Close modal"></button>
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-[--bg-primary] rounded-xl p-6 shadow-xl"
        in:fade={{duration: 200, delay: 100}} 
        out:fade={{duration: 150}}>
        <div class="text-[--text-primary] font-bold text-center text-xl mb-6">{$t('CreateTaskModal_Title')}</div>
        <form onsubmit={handleSubmit} class="space-y-4">
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
                    onclick={TaskModal.close}
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