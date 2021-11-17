<svelte:head>
    <title>Codedoro - Timer</title>
</svelte:head>

<script>
    import CreateTask from '../components/create-task-modal.svelte'
</script>
<CreateTask />
<div class="content h-full flex flex-col justify-center">
    <div class="task-title pt-5 md:pt-10 text-center h-1/5">
        <h1 class="header text-gray-400 font-semibold text-sm">CURRENT TASK</h1>
        <p class="task text-white text-xl font-bold">
            Press + to create a new task
        </p>
    </div>
    <div class="countdown h-2/5 flex justify-center items-center">
        <div class="countdown-content absolute place-self-center self-center text-center">
            <p class="countdown-text text-white text-5xl font-bold pb-3">
                00:00
            </p>
            <p class="sessions leading-10 text-gray-400">0 of 0 sessions</p>
        </div>
        <svg class="progress-ring text-gray-500" width="260" height="260">
            <circle class="animate-pulse" stroke="currentColor" stroke-width="7" fill="transparent" r="120" cx="130" cy="130" />
            <circle class="progress-ring__circle text-yellow-300 transform -rotate-90 translate-y-full duration-700" stroke="currentColor" stroke-linecap="round" stroke-width="9" fill="transparent" r="120" cx="130" cy="130" />
        </svg>
    </div>
    <div class="countdown-footer h-2/5 flex flex-col justify-center gap-14">
        <p class="session-status text-white text-center self-top">
            Create Task to start
        </p>
        <div class="countdown-controls flex justify-between items-center pl-10 pr-10">
            <button class="reset-btn text-gray-500" aria-label="Restart session">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
            </button>
            <button class="pause-btn text-white bg-yellow-300 rounded-full p-2 transform duration-700" aria-label="Pause session">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 pointer-events-none select-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <button class="stop-btn text-gray-500" aria-label="Cancel session">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
            </button>
        </div>
    </div>
</div>