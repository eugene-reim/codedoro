<script>
    import CreateTask from './components/create-task-modal.svelte'
    import Navbar from './components/navbar.svelte'
    import Titlebar from './components/titlebar.svelte'
    import MainScreen from './components/MainScreen.svelte'
    import TasksList from './components/TasksList.svelte'
    import StatsScreen from './components/StatsScreen.svelte'
    import SettingsScreen from './components/SettingsScreen.svelte'
    import { tasks } from './stores/task.ts'
    import { timer } from './stores/timer.ts'
    import { currentScreen } from './stores/screen.ts'
    import { fly } from 'svelte/transition'

    let previousScreen = 'main';
    const screenOrder = ['main', 'tasks', 'stats', 'settings'];
    
    $: {
        if ($currentScreen !== previousScreen) {
            const prevIndex = screenOrder.indexOf(previousScreen);
            const currentIndex = screenOrder.indexOf($currentScreen);
            slideDirection = currentIndex > prevIndex ? 1 : -1;
            previousScreen = $currentScreen;
        }
    }

    let slideDirection = 1;

    
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
            {#key $currentScreen}
            <div class="absolute inset-0" 
                in:fly={{duration: 200, x: 400 * slideDirection}} 
                out:fly={{duration: 200, x: -400 * slideDirection}}>
                {#if $currentScreen === 'main'}
                    <div class="h-full">
                        <MainScreen {currentTask} />
                    </div>
                {/if}
                
                {#if $currentScreen === 'tasks'}
                    <div class="h-full">
                        <TasksList />
                    </div>
                {/if}

                {#if $currentScreen === 'stats'}
                    <div class="h-full">
                        <StatsScreen />
                    </div>
                {/if}

                {#if $currentScreen === 'settings'}
                    <div class="h-full">
                        <SettingsScreen />
                    </div>
                {/if}
            </div>
            {/key}
        </div>
        <Navbar />
    </div>
</div>