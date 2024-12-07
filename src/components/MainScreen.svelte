<script>
    import { timer } from '../stores/timer.ts';
    import { formatTime } from '../utils/formatTime.ts';
    import { fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    
    export let currentTask;
    
    function handleReset() {
        timer.reset();
    }
    
    function handlePlayPause() {
        if ($timer.isRunning) {
            timer.pause();
        } else {
            timer.start();
        }
    }
    
    function handleSkip() {
        timer.skip();
    }

    $: totalTime = currentTask ? (
        $timer.timerType === 'session' 
            ? currentTask.sessionTime * 60 
            : $timer.timerType === 'break' 
                ? currentTask.breakTime * 60 
                : currentTask.longBreakTime * 60
    ) : 1;

    $: progress = 1 - ($timer.timeLeft / totalTime);
    $: strokeDashoffset = 754 * progress;
</script>

<div 
    in:fly={{ x: -100, y: 0, duration: 400, delay: 0, opacity: 0.2, easing: quintOut }}
    out:fly={{ x: 100, y: 0, duration: 400, opacity: 0.2, easing: quintOut }}
    class="absolute inset-0 flex flex-col">
    <div class="content flex-1 flex flex-col justify-center">
        <div class="task-title pt-5 md:pt-10 text-center h-1/5">
            <h1 class="header text-gray-400 font-semibold text-sm">CURRENT TASK</h1>
            <p class="task text-white text-xl font-bold">
                {#if currentTask}
                    {currentTask.name}
                {:else}
                    Press + to create a new task
                {/if}
            </p>
        </div>
        <div class="countdown h-2/5 flex justify-center items-center">
            <div class="countdown-content absolute place-self-center self-center text-center">
                <p class="countdown-text text-white text-5xl font-bold pb-3">
                    {#if currentTask}
                        {formatTime($timer.timeLeft)}
                    {:else}
                        00:00
                    {/if}
                </p>
                <p class="sessions leading-10 text-gray-400">
                    {#if currentTask}
                        {#if $timer.timerType === 'session'}
                            {currentTask.sessionsPassed} of {currentTask.sessionsAmount} sessions
                        {:else if $timer.timerType === 'break'}
                            Short Break
                        {:else}
                            Long Break
                        {/if}
                    {:else}
                        0 of 0 sessions
                    {/if}
                </p>
            </div>
            <svg class="progress-ring text-gray-500" width="260" height="260">
                <circle 
                    class="animate-pulse" 
                    stroke="currentColor" 
                    stroke-width="7" 
                    fill="transparent" 
                    r="120" 
                    cx="130" 
                    cy="130" 
                />
                <circle 
                    class="progress-ring__circle {$timer.timerType === 'session' ? 'text-yellow-300' : 'text-green-400'} transform -rotate-90 origin-center duration-700" 
                    stroke="currentColor" 
                    stroke-linecap="round" 
                    stroke-width="9" 
                    fill="transparent" 
                    r="120" 
                    cx="130" 
                    cy="130"
                    style="stroke-dasharray: 754; stroke-dashoffset: {strokeDashoffset}"
                />
            </svg>
        </div>
        <div class="countdown-footer h-2/5 flex flex-col justify-center gap-14">
            <p class="session-status text-white text-center self-top">
                {#if currentTask}
                    {#if $timer.timerType === 'session'}
                        {$timer.isRunning ? 'Focus time!' : 'Ready to start'}
                    {:else if $timer.timerType === 'break'}
                        Break time!
                    {:else if $timer.timerType === 'longBreak'}
                        Long break time!
                    {/if}
                {:else}
                    Create Task to start
                {/if}
            </p>
            <div class="countdown-controls flex justify-between items-center pl-10 pr-10">
                <button 
                    class="reset-btn text-gray-500 hover:text-white transition-colors" 
                    aria-label="Restart session"
                    on:click={handleReset}
                    disabled={!currentTask}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                    </svg>
                </button>
                <button 
                    class="play-pause-btn text-white {$timer.isRunning ? 'bg-red-500' : ($timer.timerType === 'session' ? 'bg-yellow-300' : 'bg-green-400')} rounded-full p-2 transform duration-700 hover:scale-105" 
                    aria-label={$timer.isRunning ? "Pause session" : "Start session"}
                    on:click={handlePlayPause}
                    disabled={!currentTask}
                >
                    {#if $timer.isRunning}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                    {/if}
                </button>
                <button 
                    class="skip-btn text-gray-500 hover:text-white transition-colors" 
                    aria-label="Skip session"
                    on:click={handleSkip}
                    disabled={!currentTask}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    .progress-ring__circle {
        transition: stroke-dashoffset 0.35s;
    }
</style>
