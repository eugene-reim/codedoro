<script>
    import { isOpen, close } from '../stores/modal.js';
    import { tasks } from '../stores/task.js';
    
    let taskName = '';
    let sessionTime = 25;
    let breakTime = 5;
    let longBreakTime = 15;
    let sessionsAmount = 4;

    function handleSubmit() {
        if (!taskName) return;

        const newTask = {
            name: taskName,
            sessionTime: parseInt(sessionTime),
            breakTime: parseInt(breakTime),
            longBreakTime: parseInt(longBreakTime),
            sessionsAmount: parseInt(sessionsAmount),
            sessionsPassed: 0,
            isCurrent: true,
            isComplete: false
        };

        tasks.update(currentTasks => {
            // Set all tasks to not current
            const updatedTasks = currentTasks.map(task => ({...task, isCurrent: false}));
            // Add new task
            return [...updatedTasks, newTask];
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
<section class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
    <div class="content bg-gray-700 rounded-xl w-full max-w-md mx-4 p-6">
        <div class="text-white font-bold text-center text-xl mb-6">Task Settings</div>
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div class="space-y-2">
                <label for="taskName" class="block text-gray-400">Task Name</label>
                <input 
                    type="text" 
                    id="taskName"
                    bind:value={taskName}
                    class="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    required
                />
            </div>
            
            <div class="space-y-2">
                <label for="sessionTime" class="block text-gray-400">Session Time (minutes)</label>
                <input 
                    type="number" 
                    id="sessionTime"
                    bind:value={sessionTime}
                    min="1"
                    class="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    required
                />
            </div>
            
            <div class="space-y-2">
                <label for="breakTime" class="block text-gray-400">Break Time (minutes)</label>
                <input 
                    type="number" 
                    id="breakTime"
                    bind:value={breakTime}
                    min="1"
                    class="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    required
                />
            </div>
            
            <div class="space-y-2">
                <label for="longBreakTime" class="block text-gray-400">Long Break Time (minutes)</label>
                <input 
                    type="number" 
                    id="longBreakTime"
                    bind:value={longBreakTime}
                    min="1"
                    class="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    required
                />
            </div>
            
            <div class="space-y-2">
                <label for="sessionsAmount" class="block text-gray-400">Number of Sessions</label>
                <input 
                    type="number" 
                    id="sessionsAmount"
                    bind:value={sessionsAmount}
                    min="1"
                    class="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    required
                />
            </div>
            
            <div class="flex justify-end space-x-4 mt-6">
                <button 
                    type="button"
                    on:click={close}
                    class="px-4 py-2 text-gray-400 hover:text-white focus:outline-none"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    class="px-4 py-2 bg-yellow-300 text-gray-800 rounded hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    Create Task
                </button>
            </div>
        </form>
    </div>
</section>
{/if}