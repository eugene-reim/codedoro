import { writable } from "svelte/store";

function createTaskStore() {
    const { subscribe, set, update } = writable(
        JSON.parse(typeof window !== 'undefined' ? localStorage.getItem("tasks") : '[]') || []
    );

    return {
        subscribe,
        add: (task) => {
            update(tasks => {
                // If task has an id, it's an update
                if (task.id) {
                    return tasks.map(t => t.id === task.id ? task : t);
                }
                
                // Set all existing tasks to not current if the new task is current
                const updatedTasks = task.isCurrent 
                    ? tasks.map(t => ({...t, isCurrent: false}))
                    : [...tasks];
                
                return [...updatedTasks, { ...task, id: task.id || Date.now(), completed: false }];
            });
        },
        remove: (id) => {
            update(tasks => tasks.filter(task => task.id !== id));
        },
        toggleComplete: (id) => {
            update(tasks => tasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            ));
        },
        setCurrent: (id) => {
            update(tasks => tasks.map(task => ({...task, isCurrent: task.id === id})));
        },
        updateSessions: (id) => {
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

export { tasks };

/* Task Example
{
    id: number,           // Unique identifier
    name: string,         // Task name for sessions
    sessionTime: number,  // Duration of each work session in minutes
    breakTime: number,    // Duration of short breaks in minutes
    longBreakTime: number,// Duration of long breaks in minutes
    sessionsAmount: number,// Total number of sessions planned
    sessionsPassed: number,// Number of completed sessions
    isCurrent: boolean,   // Whether this is the current active task
    isComplete: boolean,  // Whether all sessions are complete
    completed: boolean    // Whether the task is marked as complete
}
*/