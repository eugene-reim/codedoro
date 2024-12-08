<script lang="ts">
    import { tasks } from '../stores/task.ts';
    import { fly, fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { onMount } from 'svelte';
    import { t } from 'svelte-i18n';
    function removeTask(taskId: string) {
        tasks.remove(Number(taskId));
    }

    onMount(() => {
        // Removed event listener removal for undefined handleKeydown function
    });
</script>

<div 
    in:fly={{ x: 100, y: 0, duration: 400, delay: 0, opacity: 0.2, easing: quintOut }}
    out:fly={{ x: -100, y: 0, duration: 400, opacity: 0.2, easing: quintOut }}
    class="h-full w-full">
    <div class="p-4 flex-1 overflow-y-auto">
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-[--text-primary]">{$t('TasksListScreen_Title')}</h1>
        </div>
        
        <div class="space-y-4">
            {#if $tasks.length === 0}
                <p class="text-[--text-secondary] text-center py-8">{$t('TasksListScreen_NoTasksLabel')}</p>
            {:else}
                {#each $tasks as task (task.id)}
                    <div 
                        class="bg-[--bg-secondary] rounded-lg p-4 flex flex-col gap-3"
                        in:fly={{ y: 20, duration: 200, delay: 100 }}
                        out:fade={{ duration: 200 }}
                    >
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-[--text-primary] font-medium text-lg">{task.name}</h3>
                                <p class="text-[--text-secondary] text-sm mt-1">
                                    {#if task.isCurrent}
                                        {$t('TasksListScreen_CurrentTaskLabel')}
                                    {:else if task.isComplete}
                                        {$t('TasksListScreen_CompletedTaskLabel')}
                                    {:else}
                                        {$t('TasksListScreen_PendingTaskLabel')}
                                    {/if}
                                </p>
                            </div>
                            <div class="flex space-x-2">
                                {#if !task.isComplete}
                                    <button 
                                        class="text-[--text-secondary] hover:text-[--accent] transition-colors"
                                        on:click={() => tasks.setCurrent(task.id)}
                                        aria-label={task.isCurrent ? $t('TasksListScreen_CurrentTaskLabel') : $t('TasksListScreen_SetAsCurrentTaskLabel')}
                                    >
                                        {#if task.isCurrent}
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v.01M12 8v.01M12 12v.01M12 16v.01M12 20v.01" />
                                            </svg>
                                        {:else}
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4z" />
                                            </svg>
                                        {/if}
                                    </button>
                                {/if}
                                <button 
                                    class="text-[--text-secondary] hover:text-[--warning] transition-colors"
                                    on:click={() => removeTask(String(task.id))}
                                    aria-label="Delete task"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <div class="bg-[--bg-primary] rounded p-2">
                                <p class="text-[--text-secondary]">{$t('TasksListScreen_ListItemSessionsLabel')}</p>
                                <p class="text-[--text-primary] font-medium">{task.sessionsPassed} / {task.sessionsAmount}</p>
                            </div>
                            <div class="bg-[--bg-primary] rounded p-2">
                                <p class="text-[--text-secondary]">{$t('TasksListScreen_ListItemSessionLengthLabel')}</p>
                                <p class="text-[--text-primary] font-medium">{task.sessionTime} {$t('TasksListScreen_ListItemMinutesLabel')}</p>
                            </div>
                            <div class="bg-[--bg-primary] rounded p-2">
                                <p class="text-[--text-secondary]">{$t('TasksListScreen_ListItemBreakLengthLabel')}</p>
                                <p class="text-[--text-primary] font-medium">{task.breakTime} {$t('TasksListScreen_ListItemMinutesLabel')}</p>
                            </div>
                            <div class="bg-[--bg-primary] rounded p-2">
                                <p class="text-[--text-secondary]">{$t('TasksListScreen_ListItemLongBreakLabel')}</p>
                                <p class="text-[--text-primary] font-medium">{task.longBreakTime} {$t('TasksListScreen_ListItemMinutesLabel')}</p>
                            </div>
                        </div>
                        <div class="w-full bg-[--bg-primary] rounded-full h-2 mt-1">
                            <div 
                                class="bg-[--warning] h-2 rounded-full transition-all duration-300" 
                                style="width: {(task.sessionsPassed / task.sessionsAmount) * 100}%"
                            ></div>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>
