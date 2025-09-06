<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import ActivityForm from '../lib/components/activity-form.svelte';
	import { activities } from '$lib/stores/activities';
	import { Plus, X } from 'lucide-svelte';
	function addActivity(
		activityName: string,
		activityStart: number,
		activityGoal: number,
		activityGoalDate: string,
		activityStep: number,
		activityMeasure: string
	) {
		activities.update((acts) => [
			...acts,
			{
				id: crypto.randomUUID(),
				title: activityName,
				start: activityStart,
				goal: activityGoal,
				goalDate: activityGoalDate,
				step: activityStep,
				measure: activityMeasure,
				logsID: [],
				lastLog: ''
			}
		]);
	}
	let showForm = $state(false);
	function toggleForm() {
		showForm = !showForm;
	}
</script>

<br />

<br />
<div class="text-center text-white"><h1>Your Activities</h1></div>
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
		<ActivityForm {addActivity} />
	</div>
{/if}

<br />
<div class="container mx-auto grid grid-cols-3 gap-x-4 bg-stone-900 px-5 py-5 rounded-sm">
	<div class="text-stone-400 font-bold px-2 mb-2">Name</div>
	<div class="text-stone-400 font-bold px-2 mb-2">Expected Step</div>
	<div class="text-stone-400 font-bold px-2 mb-2">Last Log</div>
	{#each $activities as activity (activity.id)}
		<div class="text-white bg-slate-500 space-y-2 px-2 py-3">
			<a href={'/activities/' + activity.id} class="underline hover:text-blue-300">
				{activity.title}
			</a>
		</div>
		<div class="text-stone-950 bg-stone-400 space-y-2 px-2 py-3">
			{activity.lastLog}
		</div>
		<div class="text-stone-950 bg-stone-400 space-y-2 px-2 py-3">
			{activity.id}
		</div>
	{/each}
</div>
