<script lang="javascript">
    import "../app.css";
    import NavBar from "../components/navbar.svelte";
</script>

<section class="main-screen h-full w-full flex flex-col">
    <slot />
    <NavBar />
</section>

<style lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
