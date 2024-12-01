import { writable } from 'svelte/store';

interface Task {
    id: string;
    title: string;
    completed: boolean;
    timestamp: number;
}

function createTasksStore() {
    const { subscribe, update, set } = writable<Task[]>([]);

    return {
        subscribe,
        add: (task: Task) => {
            update(tasks => [...tasks, task]);
        },
        remove: (id: string) => {
            update(tasks => tasks.filter(task => task.id !== id));
        },
        toggleComplete: (id: string) => {
            update(tasks => tasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            ));
        },
        clear: () => {
            set([]);
        }
    };
}

export const tasks = createTasksStore();
