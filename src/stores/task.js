import { writable } from "svelte/store";

export const tasks = writable(JSON.parse(typeof window !== 'undefined'?localStorage.getItem("tasks"):'[]') || []);

tasks.subscribe(value => {
  typeof window !== 'undefined'?localStorage.setItem("tasks", JSON.stringify(value)):null;
});

/* Task Example
{
'name': 'Design Codedoro App',
'sessionTime': 25,
'breakTime': 5,
'longBreakTime': 10,
'sessionsAmount': 4,
'sessionsPassed': 0,
'isCurrent': true,
'isComplete': false
}

name [string] - Task name for sessions
sessionTime [int] - Session duration in minutes
breakTime [int] - Duration of a short break in minutes
longBreakTime [int] - Duration of a long break in minutes
sessionsAmount [int] - Amount of sessions to complete the task
sessionsPassed [int] - Amount of sessions that currently passed
isCurrent [bool] - Determines whether the task is current
isComplete [bool] - Determines whether the task is complete
*/