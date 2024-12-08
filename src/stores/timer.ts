import { writable, get, type Writable } from 'svelte/store';
import { tasks } from './task';
import type { Task } from './task';

const SESSIONS_BEFORE_LONG_BREAK = 4;

interface TimerState {
    isRunning: boolean;
    timeLeft: number;
    timerType: 'session' | 'break' | 'longBreak';
    completedSessions: number;
}

interface TimerStore {
    subscribe: Writable<TimerState>['subscribe'];
    start: () => void;
    pause: () => void;
    reset: () => void;
    stopTimer: () => void;
    skip: () => void;
}

function createTimerStore(): TimerStore {
    let audio: HTMLAudioElement | undefined;
    if (typeof window !== 'undefined') {
        audio = new Audio('/notification.mp3');
    }

    const { subscribe, set, update } = writable<TimerState>({
        isRunning: false,
        timeLeft: 0,
        timerType: 'session',
        completedSessions: 0
    });

    let intervalId: NodeJS.Timeout | null = null;

    function playSound(): void {
        if (audio) {
            audio.currentTime = 0;
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('Sound played successfully');
                    })
                    .catch((err: Error) => {
                        console.log('Sound playback failed:', err);
                    });
            }
        }
    }

    function updateTaskSessions(): void {
        const currentTasks = get(tasks);
        const currentTask = currentTasks.find(t => t.isCurrent);
        if (currentTask) {
            tasks.updateSessions(currentTask.id);
        }
    }

    function stopTimer(): void {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function skip(): void {
        stopTimer();
        update(state => {
            const currentTask = get(tasks)[0];
            if (!currentTask) return state;

            let newState = { ...state };
            
            if (state.timerType === 'session') {
                newState.completedSessions += 1;
                if (newState.completedSessions % SESSIONS_BEFORE_LONG_BREAK === 0) {
                    newState.timerType = 'longBreak';
                    newState.timeLeft = currentTask.longBreakTime * 60;
                } else {
                    newState.timerType = 'break';
                    newState.timeLeft = currentTask.breakTime * 60;
                }
            } else {
                newState.timerType = 'session';
                newState.timeLeft = currentTask.sessionTime * 60;
            }
            
            newState.isRunning = false;
            return newState;
        });
    }

    // Subscribe to tasks store to handle task switching
    tasks.subscribe(($tasks: Task[]) => {
        const currentTask = $tasks.find(t => t.isCurrent);
        if (currentTask) {
            // Stop timer and reset when switching tasks
            stopTimer();
            set({
                isRunning: false,
                timeLeft: currentTask.sessionTime * 60,
                timerType: 'session',
                completedSessions: 0
            });
        }
    });

    function startCountdown(): void {
        if (intervalId) return;

        console.log('[Timer] Starting countdown with state:', get({ subscribe }));

        intervalId = setInterval(() => {
            update(state => {
                if (state.timeLeft <= 1) {
                    if (intervalId) {
                        clearInterval(intervalId);
                        intervalId = null;
                    }
                    playSound();

                    console.log('[Timer] Phase ended:', {
                        type: state.timerType,
                        completedSessions: state.completedSessions,
                        isRunning: state.isRunning
                    });

                    const currentTask = get(tasks).find(t => t.isCurrent);
                    if (!currentTask) return state;

                    let nextState: TimerState;
                    if (state.timerType === 'session') {
                        const newCompletedSessions = state.completedSessions + 1;
                        updateTaskSessions();
                        
                        // Check if this was the last session
                        if (newCompletedSessions === currentTask.sessionsAmount) {
                            // Mark task as complete and pause timer
                            if (currentTask) {
                                tasks.toggleComplete(currentTask.id);
                                tasks.setCurrent(0); // Using 0 or -1 to indicate no current task
                            }
                            
                            nextState = {
                                isRunning: false,
                                timerType: 'session',
                                timeLeft: 0,
                                completedSessions: newCompletedSessions
                            };
                        } else {
                            // Continue with normal break logic
                            const isLongBreak = newCompletedSessions % SESSIONS_BEFORE_LONG_BREAK === 0;
                            const breakDuration = isLongBreak ? currentTask.longBreakTime : currentTask.breakTime;
                            
                            nextState = {
                                isRunning: true,
                                timerType: isLongBreak ? 'longBreak' : 'break',
                                timeLeft: breakDuration * 60,
                                completedSessions: newCompletedSessions
                            };
                        }
                    } else {
                        if (state.completedSessions < currentTask.sessionsAmount) {
                            nextState = {
                                isRunning: true,
                                timerType: 'session',
                                timeLeft: currentTask.sessionTime * 60,
                                completedSessions: state.completedSessions
                            };
                        } else {
                            nextState = {
                                isRunning: false,
                                timeLeft: 0,
                                timerType: 'session',
                                completedSessions: 0
                            };
                        }
                    }

                    console.log('[Timer] Transitioning to:', {
                        from: state.timerType,
                        to: nextState.timerType,
                        nextTimeLeft: nextState.timeLeft,
                        nextIsRunning: nextState.isRunning
                    });

                    set(nextState);

                    if (nextState.isRunning) {
                        setTimeout(startCountdown, 0);
                    }

                    return nextState;
                }
                return { ...state, timeLeft: state.timeLeft - 1 };
            });
        }, 1000);
    }

    return {
        subscribe,
        start: () => {
            const currentTask = get(tasks).find(t => t.isCurrent);
            if (!currentTask) {
                console.log('Cannot start: No current task');
                return;
            }

            update(state => {
                console.log('Start requested. Current state:', state);
                if (!state.isRunning) {
                    if (state.timeLeft === 0) {
                        console.log('Starting new session with time:', currentTask.sessionTime * 60);
                        state = { ...state, timeLeft: currentTask.sessionTime * 60 };
                    }
                    startCountdown();
                    return { ...state, isRunning: true };
                }
                return state;
            });
        },
        pause: () => {
            console.log('Pausing timer');
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            update(state => {
                console.log('Timer paused. State:', { ...state, isRunning: false });
                return { ...state, isRunning: false };
            });
        },
        reset: () => {
            const currentTask = get(tasks).find(t => t.isCurrent);
            if (!currentTask) {
                console.log('Cannot reset: No current task');
                return;
            }

            console.log('Resetting timer');
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            const newState: TimerState = {
                isRunning: false,
                timeLeft: currentTask.sessionTime * 60,
                timerType: 'session',
                completedSessions: 0
            };
            console.log('Timer reset to:', newState);
            set(newState);
        },
        stopTimer,
        skip
    };
}

export const timer = createTimerStore();
