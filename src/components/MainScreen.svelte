<script lang="ts">
    import { timer } from '../stores/timer.ts';
    import { formatTime } from '../utils/formatTime.ts';
    import { t } from 'svelte-i18n';
    
    let { currentTask } = $props();
    
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

    let totalTime = $derived(currentTask ? (
        $timer.timerType === 'session' 
            ? currentTask.sessionTime * 60 
            : $timer.timerType === 'break' 
                ? currentTask.breakTime * 60 
                : currentTask.longBreakTime * 60
    ) : 1);

    let progress = $derived(1 - ($timer.timeLeft / totalTime));
    let strokeDashoffset = $derived(754 * progress);


</script>

<div class="absolute inset-0 flex flex-col">
    <div class="content flex-1 flex flex-col justify-center">
        <div class="task-title pt-5 md:pt-10 text-center h-1/5">
            <h1 class="header text-[--text-secondary] font-semibold text-sm">{$t('MainScreen_CurrentTaskLabel')}</h1>
            <p class="task text-[--text-primary] text-xl font-bold">
                {#if currentTask}
                    {currentTask.name}
                {:else}
                    {$t('MainScreen_CreateTaskLabel')}
                {/if}
            </p>
        </div>
        <div class="countdown h-2/5 flex justify-center items-center">
            <div class="countdown-content absolute place-self-center self-center text-center">
                <p class="countdown-text text-[--text-primary] text-5xl font-bold pb-3">
                    {#if currentTask}
                        {formatTime($timer.timeLeft)}
                    {:else}
                        00:00
                    {/if}
                </p>
                <p class="sessions leading-10 text-[--text-secondary]">
                    {#if currentTask}
                        {currentTask.sessionsPassed} {$t('MainScreen_SessionOfLabel')} {currentTask.sessionsAmount} {$t('MainScreen_SessionsLabel')}
                    {:else}
                        {$t('MainScreen_SessionsDummyLabel')}
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
                    class="transition-all {$timer.isRunning ? 'text-red-500' : $timer.timerType === 'break' || $timer.timerType === 'longBreak' ? 'text-green-400' : 'text-yellow-400'} transform -rotate-90 origin-center duration-700" 
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
            <p class="session-status text-[--text-primary] text-center self-top">
                {#if currentTask}
                    {#if $timer.timerType === 'session'}
                        {$timer.isRunning ? $t('MainScreen_SessionIsRunningLabel') : $t('MainScreen_SessionIsPausedLabel')}
                    {:else if $timer.timerType === 'break'}
                        {$t('MainScreen_BreakIsRunningLabel')}
                    {:else if $timer.timerType === 'longBreak'}
                        {$t('MainScreen_LongBreakIsRunningLabel')}
                    {/if}
                {:else}
                    {$t('MainScreen_CreateTaskToStartLabel')}
                {/if}
            </p>
            <div class="countdown-controls flex justify-between items-center pl-10 pr-10">
                <button 
                    class="reset-btn text-gray-500 hover:text-white transition-colors" 
                    aria-label="Restart session"
                    disabled={!currentTask}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                    </svg>
                </button>
                <button 
                    class=" transition-all play-pause-btn text-white {$timer.isRunning ? 'bg-red-500' : $timer.timerType === 'break' || $timer.timerType === 'longBreak' ? 'bg-green-400' : 'bg-yellow-400'} rounded-full p-2 transform duration-700 hover:scale-105" 
                    aria-label={$timer.isRunning ? "Pause session" : "Start session"}
                    onclick={handlePlayPause}
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
