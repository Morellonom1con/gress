<script lang="ts">
	let { data }: PageProps = $props();
	const { activity } = data;

	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import LogForm from '$lib/components/log-form.svelte';
	import { Plus, X } from 'lucide-svelte';
	import { logs } from '$lib/stores/logs';
	import type { PageProps } from './$types';
	import { activities } from '$lib/stores/activities';
	function addLog(logProgress: number, logTitle: string, logComment: string, logDatetime: string) {
		logs.update((logs) => [
			...logs,
			{
				id: crypto.randomUUID(),
				title: logTitle,
				comment: logComment,
				datetime: logDatetime,
				progress: logProgress
			}
		]);
		const id = crypto.randomUUID();
		activities.update((acts) =>
			acts.map((a) =>
				a.id === activity.id
					? {
							...a,
							logsID: [...a.logsID, id],
							lastLog: logDatetime
						}
					: a
			)
		);
	}
	let showForm = $state(false);
	function toggleForm() {
		showForm = !showForm;
	}

	let canvas: HTMLCanvasElement;

	onMount(() => {
		new Chart(canvas, {
			type: 'line',
			data: {
				labels: ['Start', 'Goal'], // placeholder, replace with activity.logs.map(log => log.datetime)
				datasets: [
					{
						label: activity.title,
						data: [activity.start, activity.goal], // replace with activity.logs.map(log => log.progress)
						borderColor: 'rgb(75, 192, 192)',
						tension: 0.3
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						labels: { color: 'white' }
					}
				},
				scales: {
					x: { ticks: { color: 'white' } },
					y: { ticks: { color: 'white' } }
				}
			}
		});
	});
</script>

<br />
<br />
<div class="container mx-auto px-5 py-5 rounded-lg bg-stone-300">
	<h1 class="text-2xl font-bold text-center text-stone-950">
		{activity.title}
	</h1>
	<br />
	<div class="flex items-center">
		<div>Start :</div>
		<div>{activity.start}</div>
	</div>
	<div class="flex items-center">
		<div>Goal :</div>
		<div>{activity.goal}</div>
	</div>
	<div class="flex items-center">
		<div>Goal Date :</div>
		<div>{new Date(activity.goalDate).toDateString()}</div>
	</div>
	<div class="flex items-center">
		<div>Last Log :</div>
		<div>{new Date(activity.lastLog).toLocaleString()}</div>
	</div>
</div>
<br />
<br />
<div class="w-full h-100 bg-slate-500 rounded-xl mp-4 shadow-lg">
	<canvas bind:this={canvas}></canvas>
</div>

<button
	class="flex items-center justify-center mx-auto bg-slate-500 rounded-full w-10 h-10 text-white"
	onclick={toggleForm}
>
	{#if showForm}
		<span transition:fade>
			<X class="w-5 h-5" />
		</span>
	{:else}
		<span transition:fade>
			<Plus class="w-5 h-5" />
		</span>
	{/if}
</button>
<br />
{#if showForm}
	<div class="text-center" transition:slide>
		<LogForm {addLog} />
	</div>
{/if}

<br />
<div class="container mx-auto grid grid-cols-4 gap-x-4 bg-stone-900 px-5 py-5 rounded-sm">
	<div class="text-stone-400 font-bold px-2 mb-2">Title</div>
	<div class="text-stone-400 font-bold px-2 mb-2">Progress</div>
	<div class="text-stone-400 font-bold px-2 mb-2">Entry</div>
	<div class="text-stone-400 font-bold px-2 mb-2">Date</div>

	{#each $logs.filter((log) => activity.logsID.includes(log.id)) as log (log.id)}
		<div class="text-white bg-slate-500 px-2 py-3">
			{log.title}
		</div>
		<div class="text-white bg-slate-600 px-2 py-3">
			{log.progress}
			{activity.measure}
		</div>
		<div class="text-white bg-slate-700 px-2 py-3">
			{log.comment}
		</div>
		<div class="text-white bg-slate-800 px-2 py-3">
			{new Date(log.datetime).toLocaleString()}
		</div>
	{/each}
</div>
