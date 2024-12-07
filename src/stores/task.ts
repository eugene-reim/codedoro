import { writable, type Writable } from "svelte/store";

interface Task {
    id: number;
    name: string;
    sessionTime: number;
    breakTime: number;
    longBreakTime: number;
    sessionsAmount: number;
    sessionsPassed: number;
    isCurrent: boolean;
    isComplete: boolean;
    completed: boolean;
}

interface TaskStore {
    subscribe: Writable<Task[]>['subscribe'];
    add: (task: Partial<Task>) => void;
    remove: (id: number) => void;
    toggleComplete: (id: number) => void;
    setCurrent: (id: number) => void;
    updateSessions: (id: number) => void;
}

function createTaskStore(): TaskStore {
    const { subscribe, set, update } = writable<Task[]>(
        JSON.parse(typeof window !== 'undefined' ? localStorage.getItem("tasks") || '[]' : '[]')
    );

    return {
        subscribe,
        add: (task: Partial<Task>) => {
            update(tasks => {
                // If task has an id, it's an update
                if (task.id) {
                    return tasks.map(t => t.id === task.id ? { ...t, ...task } : t);
                }
                
                // Set all existing tasks to not current if the new task is current
                const updatedTasks = task.isCurrent 
                    ? tasks.map(t => ({...t, isCurrent: false}))
                    : [...tasks];
                
                return [...updatedTasks, { 
                    ...task, 
                    id: task.id || Date.now(),
                    completed: false,
                    sessionsPassed: 0,
                    isComplete: false
                } as Task];
            });
        },
        remove: (id: number) => {
            update(tasks => tasks.filter(task => task.id !== id));
        },
        toggleComplete: (id: number) => {
            update(tasks => tasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            ));
        },
        setCurrent: (id: number) => {
            update(tasks => tasks.map(task => ({...task, isCurrent: task.id === id})));
        },
        updateSessions: (id: number) => {
            update(tasks => tasks.map(task => 
                task.id === id 
                    ? { ...task, sessionsPassed: task.sessionsPassed + 1 }
                    : task
            ));
        }
    };
}

const tasks = createTaskStore();

// Subscribe to changes and save to localStorage
if (typeof window !== 'undefined') {
    tasks.subscribe(tasks => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
}

export { tasks, type Task };
