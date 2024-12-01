<script>
    import CreateTask from './components/create-task-modal.svelte'
    import Navbar from './components/navbar.svelte'
    import Titlebar from './components/titlebar.svelte'
    import MainScreen from './components/MainScreen.svelte'
    import TasksList from './components/TasksList.svelte'
    import { tasks } from './stores/task.js'
    import { timer } from './stores/timer.js'
    import { currentScreen } from './stores/screen.js'

    $: currentTask = $tasks.find(task => task.isCurrent) || null;

    $: {
        if (currentTask) {
            if ($timer.timeLeft === 0 && !$timer.isRunning && $timer.timerType === 'session') {
                timer.reset();
            }
        }
    }
</script>

<div class="min-h-screen flex justify-center">
    <div class="w-full max-w-[420px] h-screen overflow-hidden flex flex-col relative bg-gray-800 md:rounded-xl">
        <Titlebar />
        <CreateTask />
        <div class="flex-1 relative overflow-hidden">
            {#if $currentScreen === 'main'}
                <MainScreen {currentTask} />
            {:else if $currentScreen === 'tasks'}
                <TasksList />
            {/if}
        </div>
        <Navbar />
    </div>
</div>