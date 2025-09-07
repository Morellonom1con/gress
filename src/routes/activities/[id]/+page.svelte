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

	const currentActivity = $derived($activities.find((a) => a.id === activity.id) || activity);

	function addLog(logProgress: number, logTitle: string, logComment: string, logDatetime: string) {
		const ID = crypto.randomUUID();
		logs.update((logs) => [
			...logs,
			{
				id: ID,
				title: logTitle,
				comment: logComment,
				datetime: logDatetime,
				progress: logProgress
			}
		]);
		activities.update((acts) =>
			acts.map((a) =>
				a.id === activity.id
					? {
							...a,
							logsID: [...a.logsID, ID],
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
		const ctx = canvas.getContext('2d');

		new Chart(ctx!, {
			type: 'scatter',
			data: {
				// Scatter dataset for logs
				datasets: [
					{
						label: 'Logs',
						data: $logs
							.filter((log) => activity.logsID.includes(log.id))
							.map((log) => ({
								x: new Date(log.datetime),
								y: log.progress
							})),
						backgroundColor: 'rgb(75, 192, 192)'
					},
					{
						label: 'Goal Line',
						type: 'line',
						data: [
							{ x: new Date(), y: activity.start }, // start now
							{ x: new Date(activity.goalDate), y: activity.goal }
						],
						borderColor: 'rgb(255, 99, 132)',
						borderDash: [5, 5], // dotted
						fill: false,
						showLine: true,
						pointRadius: 0 // hide points for the line
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
					x: {
						type: 'time',
						time: {
							unit: 'day'
						},
						ticks: { color: 'white' }
					},
					y: {
						ticks: { color: 'white' }
					}
				}
			}
		});
	});
</script>

<br />
<br />
<div class="container mx-auto px-5 py-5 rounded-lg bg-stone-300">
	<h1 class="text-2xl font-bold text-center text-stone-950">
		{currentActivity.title}
	</h1>
	<br />
	<div class="flex items-center">
		<div>Start :</div>
		<div>{currentActivity.start}</div>
	</div>
	<div class="flex items-center">
		<div>Goal :</div>
		<div>{currentActivity.goal}</div>
	</div>
	<div class="flex items-center">
		<div>Goal Date :</div>
		<div>{new Date(currentActivity.goalDate).toDateString()}</div>
	</div>
	<div class="flex items-center">
		<div>Last Log :</div>
		<div>{new Date(currentActivity.lastLog).toLocaleString()}</div>
	</div>
</div>
<br />
<br />
<div
	class="container mx-auto flex justify-center h-100 bg-slate-500 rounded-xl mp-4 shadow-lg py-10"
>
	<canvas bind:this={canvas}></canvas>
</div>

<br />

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
<div class="container mx-auto bg-stone-900 px-5 py-5 rounded-sm">
	{#each $logs.filter((log) => currentActivity.logsID.includes(log.id)) as log (log.id)}
		<div class="container bg-slate-500 rounded-sm">
			<div class="flex justify-between text-white px-4 py-3">
				<span class="font-bold text-2xl">{log.title}</span>
				<span>{new Date(log.datetime).toLocaleString()} </span>
				<span
					>{log.progress}
					{currentActivity.measure}
				</span>
			</div>
			<div class="text-white px-4 py-3">
				{log.comment}
			</div>
		</div>
		<hr />
	{/each}
</div>
<br />
<br />
<br />
