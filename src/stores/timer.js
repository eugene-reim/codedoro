import { writable, get } from 'svelte/store';
import { tasks } from './task.js';

const SESSIONS_BEFORE_LONG_BREAK = 4;

function createTimerStore() {
    let audio;
    if (typeof window !== 'undefined') {
        audio = new Audio('/notification.mp3');
    }

    const { subscribe, set, update } = writable({
        isRunning: false,
        timeLeft: 0,
        timerType: 'session',
        completedSessions: 0
    });

    let intervalId = null;

    function playSound() {
        if (audio) {
            audio.currentTime = 0;
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Sound played successfully
                    })
                    .catch(err => {
                        console.log('Sound playback failed:', err);
                    });
            }
        }
    }

    function updateTaskSessions() {
        tasks.update($tasks => {
            const currentTask = $tasks.find(t => t.isCurrent);
            if (currentTask) {
                return $tasks.map(task => 
                    task.isCurrent 
                        ? { ...task, sessionsPassed: task.sessionsPassed + 1 }
                        : task
                );
            }
            return $tasks;
        });
    }

    function startCountdown() {
        if (intervalId) return;

        console.log('[Timer] Starting countdown with state:', get({ subscribe }));

        intervalId = setInterval(() => {
            update(state => {
                if (state.timeLeft <= 1) {
                    clearInterval(intervalId);
                    intervalId = null;
                    playSound();

                    console.log('[Timer] Phase ended:', {
                        type: state.timerType,
                        completedSessions: state.completedSessions,
                        isRunning: state.isRunning
                    });

                    const currentTask = get(tasks).find(t => t.isCurrent);
                    if (!currentTask) return state;

                    let nextState;
                    if (state.timerType === 'session') {
                        const newCompletedSessions = state.completedSessions + 1;
                        updateTaskSessions();
                        
                        // Check if this was the last session
                        if (newCompletedSessions === currentTask.sessionsAmount) {
                            // Mark task as complete and pause timer
                            tasks.update($tasks => $tasks.map(task => 
                                task.isCurrent 
                                    ? { ...task, isComplete: true, isCurrent: false }
                                    : task
                            ));
                            
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
            const newState = {
                isRunning: false,
                timeLeft: currentTask.sessionTime * 60,
                timerType: 'session',
                completedSessions: 0
            };
            console.log('Timer reset to:', newState);
            set(newState);
        }
    };
}

export const timer = createTimerStore();
