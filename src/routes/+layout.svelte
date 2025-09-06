<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import '@fontsource/poppins';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="bg-stone-950 min-h-screen">
	{@render children?.()}
</div>

<style>
	:global(div) {
		font-family: 'Poppins', sans-serif;
	}
</style>
