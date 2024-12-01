<script>
    import { tasks } from '../stores/task.js';
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    function removeTask(taskId) {
        tasks.remove(taskId);
    }

    onMount(() => {
        // Removed event listener removal for undefined handleKeydown function
    });
</script>

<div class="absolute inset-0 flex flex-col" transition:fly={{ x: 300, duration: 300 }}>
    <div class="p-4 flex-1 overflow-y-auto">
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-white">Tasks</h1>
        </div>
        
        <div class="space-y-4">
            {#if $tasks.length === 0}
                <p class="text-gray-400 text-center py-8">No tasks added yet</p>
            {:else}
                {#each $tasks as task (task.id)}
                    <div 
                        class="bg-gray-700 rounded-lg p-4 flex flex-col gap-3"
                        transition:fly={{ y: 20, duration: 200 }}
                    >
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-white font-medium text-lg">{task.name}</h3>
                                <p class="text-gray-400 text-sm mt-1">
                                    {#if task.isCurrent}
                                        Current Task
                                    {:else if task.isComplete}
                                        Completed
                                    {:else}
                                        Pending
                                    {/if}
                                </p>
                            </div>
                            <div class="flex space-x-2">
                                {#if !task.isComplete}
                                    <button 
                                        class="text-gray-400 hover:text-yellow-300 transition-colors"
                                        on:click={() => tasks.setCurrent(task.id)}
                                        aria-label={task.isCurrent ? "Current task" : "Set as current task"}
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
                                    class="text-gray-400 hover:text-red-500 transition-colors"
                                    on:click={() => removeTask(task.id)}
                                    aria-label="Delete task"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <div class="bg-gray-800 rounded p-2">
                                <p class="text-gray-400">Sessions</p>
                                <p class="text-white font-medium">{task.sessionsPassed} / {task.sessionsAmount}</p>
                            </div>
                            <div class="bg-gray-800 rounded p-2">
                                <p class="text-gray-400">Session Length</p>
                                <p class="text-white font-medium">{task.sessionTime} min</p>
                            </div>
                            <div class="bg-gray-800 rounded p-2">
                                <p class="text-gray-400">Break Length</p>
                                <p class="text-white font-medium">{task.breakTime} min</p>
                            </div>
                            <div class="bg-gray-800 rounded p-2">
                                <p class="text-gray-400">Long Break</p>
                                <p class="text-white font-medium">{task.longBreakTime} min</p>
                            </div>
                        </div>
                        <div class="w-full bg-gray-800 rounded-full h-2 mt-1">
                            <div 
                                class="bg-yellow-300 h-2 rounded-full transition-all duration-300" 
                                style="width: {(task.sessionsPassed / task.sessionsAmount) * 100}%"
                            ></div>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>
