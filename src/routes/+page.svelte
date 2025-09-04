<script lang="ts">
	import { slide } from 'svelte/transition';
	import ActivityForm from '../lib/components/activity-form.svelte';
	import { activities } from '$lib/stores/activities';
	function addActivity(
		activityName: string,
		activityStart: number,
		activityGoal: number,
		activityGoalDate: Date,
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
				logs: [],
				lastLog: new Date()
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
<div style="text-align: center;"><h1>Your Activities</h1></div>
<br />
<button class="flex mx-auto px-2 py-1 bg-gray-700 rounded-2xl" onclick={toggleForm}
	>{showForm ? 'x' : '+'}</button
>
<br />
{#if showForm}
	<div class="text-center" transition:slide>
		<ActivityForm {addActivity} />
	</div>
{/if}

<br />
<div class="container mx-auto grid grid-cols-3 gap-x-4">
	<div class="text-gray-700 font-bold px-2">Name</div>
	<div class="text-gray-700 font-bold px-2">Expected Step</div>
	<div class="text-gray-700 font-bold px-2">Last Log</div>
	{#each $activities as activity (activity.id)}
		<div class="text-white bg-gray-500 space-y-2 px-2">
			<a href={'/activities/' + activity.id} class="underline hover:text-blue-300">
				{activity.title}
			</a>
		</div>
		<div class="text-white bg-gray-500 space-y-2 px-2">
			{activity.lastLog.toLocaleDateString()}
		</div>
		<div class="text-white bg-gray-500 space-y-2 px-2">
			{activity.id}
		</div>
	{/each}
</div>
