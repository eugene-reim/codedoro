<script>
    import { run } from 'svelte/legacy';

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
    import { applyTheme } from './stores/theme';
    import { onMount } from 'svelte';
    import { init, register, getLocaleFromNavigator, locale } from 'svelte-i18n';
    // Register your translations
    register('English', () => import('./locales/en.json'));
    register('Russian', () => import('./locales/ru.json'));

    // Retrieve the saved language from localStorage
    const savedLanguage = localStorage.getItem('language') || getLocaleFromNavigator() || 'English';

    // Initialize with the default language
    init({
        fallbackLocale: 'English',
        initialLocale: savedLanguage
    });
    locale.set(savedLanguage);
    onMount(() => {
        applyTheme();
    });
    let previousScreen = $state('main');
    const screenOrder = ['main', 'tasks', 'stats', 'settings'];
    
    run(() => {
        if ($currentScreen !== previousScreen) {
            const prevIndex = screenOrder.indexOf(previousScreen);
            const currentIndex = screenOrder.indexOf($currentScreen);
            slideDirection = currentIndex > prevIndex ? 1 : -1;
            previousScreen = $currentScreen;
        }
    });

    let slideDirection = $state(1);

    
    let currentTask = $derived($tasks.find(task => task.isCurrent) || null);

    run(() => {
        if (currentTask) {
            if ($timer.timeLeft === 0 && !$timer.isRunning && $timer.timerType === 'session') {
                timer.reset();
            }
        }
    });
</script>

<div class="min-h-screen flex justify-center">
    <div class="w-full max-w-[420px] h-screen overflow-hidden flex flex-col relative bg-[--bg-primary] md:rounded-xl">
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