<script lang="javascript">
    import "../app.css";
    import { onMount } from 'svelte';
    import { registerSW } from '$lib/pwa';
    import NavBar from "../components/navbar.svelte";
    import TitleBar from "../components/titlebar.svelte";

    onMount(() => {
      registerSW();
    });
</script>

<section class="main-screen h-full w-full flex flex-col bg-gray-800 md:max-h-[700px]">
    <TitleBar />
    <slot />
    <NavBar />
</section>
