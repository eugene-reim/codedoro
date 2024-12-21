<script lang="ts">
    import {toggleDarkMode, theme } from '../stores/theme';
    import { slide } from 'svelte/transition';
    import { t, locale } from 'svelte-i18n';
    import CustomSelect from "./CustomSelect.svelte"; // Import the custom select component
    

    let isAccordionOpen = $state(false);
    function toggleAccordion() {
        isAccordionOpen = !isAccordionOpen;
    }
    let selectedLanguage = $state(localStorage.getItem('language') || 'English'); // Retrieve from localStorage

    function changeLanguage(event: { detail: string; }) {
        selectedLanguage = event.detail; // Get the selected language from the event
        locale.set(selectedLanguage);
        localStorage.setItem('language', selectedLanguage); // Save to localStorage
    }

    const languageOptions = ['English', 'Russian'];
</script>

<div class="h-full p-4">
    <h2 class="text-2xl font-bold text-[--text-primary] mb-4">{$t('SettingsScreen_Title')}</h2>
    
    <div class="flex bg-[--bg-secondary] rounded-lg p-4 mb-2 items-center justify-between">
        <div class="flex flex-col">
            <label for="dark-mode" class="mr-2 text-md font-medium text-[--text-primary]">{$t('SettingsScreen_DarkModeTitle')}</label>
            <label for="dark-mode" class="mr-2 text-sm font-medium text-[--text-secondary]">
                {#if $theme.darkMode}
                    {$t('SettingsScreen_DarkModeDescriptionOn')}
                {:else}
                    {$t('SettingsScreen_DarkModeDescriptionOff')}
                {/if}
            </label>         
        </div>
        <div class="relative inline-block w-12 align-middle select-none">
            <input 
                type="checkbox" 
                id="dark-mode" 
                checked={$theme.darkMode}
                onclick={toggleDarkMode}
                class="absolute w-6 h-6 transition duration-200 ease-in-out transform translate-x-0 bg-white border-1 border-gray-300 rounded-full appearance-none cursor-pointer peer checked:translate-x-full"
            />
            <label 
                for="dark-mode" 
                class="block w-12 h-6 overflow-hidden rounded-full cursor-pointer bg-[--bg-secondary-alt] peer-checked:bg-[--accent] transition-colors duration-200"
            ></label>
        </div>
    </div>

    <div class="bg-[--bg-secondary] rounded-lg p-4 mb-4 shadow-md">
        <div class="flex justify-between items-center">
            <label for="language" class="mr-2 text-md font-medium text-[--text-primary]">{$t('SettingsScreen_AppLanguageTitle')}</label>
            <CustomSelect options={languageOptions} bind:selected={selectedLanguage} on:change={changeLanguage} />
        </div>
    </div>

    <div class="bg-[--bg-secondary] rounded-lg p-4 mb-4">
        <button class="w-full text-left font-medium text-[--text-primary] flex items-center" onclick={toggleAccordion}>
            <svg class="mr-2 transform transition-transform size-4 duration-300 {isAccordionOpen ? 'rotate-90' : ''}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <span>{$t('SettingsScreen_AboutTitle')}</span>
        </button>
        {#if isAccordionOpen}
        <div class="mt-2 text-[--text-secondary]" transition:slide>
            {@html $t('SettingsScreen_AboutDescription')}
        </div>
        {/if}
    </div>
    <div class="bg-[--bg-secondary] rounded-lg p-4 mb-4">
        <p class="text-[--text-secondary] font-semibold">{$t('SettingsScreen_MoreFeaturesComingSoon')}</p>
    </div>
</div>
