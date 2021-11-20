<script context="module">
    import {
        isOpen
    } from '../stores/modal';
    export function open() {
        isOpen.set(true);
        setTimeout(() => {
            const modalContainer = document.querySelector('.modal')
            const modalContent = document.querySelector('.modal .content')
            modalContainer.classList.remove('opacity-0')
            modalContainer.classList.add('opacity-1')

            modalContent.classList.remove('scale-90')
            modalContent.classList.add('scale-100')
        }, 10)
    }

    export function close() {
        const modalContainer = document.querySelector('.modal')
        const modalContent = document.querySelector('.modal .content')
        modalContainer.classList.remove('opacity-1')
        modalContainer.classList.add('opacity-0')

        modalContent.classList.remove('scale-100')
        modalContent.classList.add('scale-90')

        setTimeout(() => {
            isOpen.set(false)
        }, 100)
    }
</script>



<script>
// @ts-nocheck

    import {
        tasks
    } from '../stores/task';
    let modalData = {
        name: '',
        sessionTime: 25,
        breakTime: 5,
        longBreakTime: 15,
        sessionsAmount: 4,
        sessionsPassed: 0,
        isCurrent: true,
        isComplete: false
    }
    function submit() {
        tasks.update(tasks => [...tasks, modalData])
        close()
    }
</script>
{#if $isOpen}
<section class="modal absolute h-screen w-screen flex flex-col bg-black bg-opacity-50 z-10 duration-100 opacity-0">
    <div class="content h-full flex flex-col justify-center mr-2 ml-2 duration-75 transform scale-90">
        <div class="settings-group w-full rounded-xl overflow-hidden bg-gray-700">
            <div class="group-title text-white font-bold text-center pt-6 text-xl">Task Settings</div>
            <div class="group-list flex flex-col p-4">
                <input class="task-name bg-transparent text-white focus:border-gray-500 border-opacity-50 border-gray-500 border-b-2 outline-none w-full p-2 pl-0 pb-3" type="text" placeholder="Task name" bind:value="{modalData.name}">
                <div class="session-duration flex p-3 pl-0 pr-0 border-opacity-50 border-gray-500 border-b-2" onclick="document.querySelector('.session-duration input').focus(); document.querySelector('.session-duration input').setSelectionRange(-1, -1);">
                    <p class='text-gray-400 w-full pointer-events-none select-none'>Focus time</p>
                    <input class="bg-transparent text-gray-400 outline-none w-14 text-right" type="text" maxlength="2" bind:value="{modalData.sessionTime}">
                    <p class='text-gray-400 pl-1 pointer-events-none select-none'>min</p>
                </div>
                <div class="break-duration flex p-3 pl-0 pr-0 border-opacity-50 border-gray-500 border-b-2" onclick="document.querySelector('.break-duration input').focus(); document.querySelector('.break-duration input').setSelectionRange(-1, -1);">
                    <p class='text-gray-400 w-full pointer-events-none select-none'>Short break</p>
                    <input class="bg-transparent text-gray-400 outline-none w-14 text-right" type="text" maxlength="2" bind:value="{modalData.breakTime}">
                    <p class='text-gray-400 pl-1 pointer-events-none select-none'>min</p>
                </div>
                <div class="long-break-duration flex p-3 pl-0 pr-0 border-opacity-50 border-gray-500 border-b-2" onclick="document.querySelector('.long-break-duration input').focus(); document.querySelector('.long-break-duration input').setSelectionRange(-1, -1);">
                    <p class='text-gray-400 w-full pointer-events-none select-none'>Long break</p>
                    <input class="bg-transparent text-gray-400 outline-none w-14 text-right" type="text" maxlength="2" bind:value="{modalData.longBreakTime}">
                    <p class='text-gray-400 pl-1 pointer-events-none select-none'>min</p>
                </div>
                <div class="sessions-amount flex p-3 pl-0 pr-0" onclick="document.querySelector('.sessions-amount input').focus(); document.querySelector('.sessions-amount input').setSelectionRange(-1, -1);">
                    <p class='text-gray-400 w-full pointer-events-none select-none'>Working sessions</p>
                    <input class="bg-transparent text-gray-400 outline-none w-14 text-right" type="text" maxlength="2" bind:value="{modalData.sessionsAmount}">
                    <p class='text-gray-400 pl-1 pointer-events-none select-none'>times</p>
                </div>

                <div class="buttons flex justify-around gap-4 pt-10">
                    <button class="create bg-blue-500 text-white font-semibold py-2 px-4  rounded w-full" on:click={submit}>
                        Create
                    </button>
                    <button class="cancel bg-red-500 text-white font-semibold py-2 px-4 rounded w-full" on:click={close}>
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    </div>
</section>
{/if}