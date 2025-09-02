<script lang="ts">
	import { slide } from 'svelte/transition';
	import ActivityForm from './components/activity-form.svelte';
	type logEntry = {
		id: string;
		progress: number;
		entry: string;
		date: Date;
	};

	type Activity = {
		id: string;
		title: string;
		start: number;
		goal: number;
		goalDate: Date;
		step: number;
		measure: string;
		logs: logEntry[];
	};
	let activities = $state<Activity[]>([]);
	function addActivity(
		activityName: string,
		activityStart: number,
		activityGoal: number,
		activityGoalDate: Date,
		activityStep: number,
		activityMeasure: string
	) {
		activities.push({
			id: crypto.randomUUID(),
			title: activityName,
			start: activityStart,
			goal: activityGoal,
			goalDate: activityGoalDate,
			step: activityStep,
			measure: activityMeasure,
			logs: []
		});
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
	{#each activities as activity (activity.id)}
		<div class="text-white bg-gray-500 space-y-2 px-2">
			{activity.title}
		</div>
		<div class="text-white bg-gray-500 space-y-2 px-2">
			{activity.lastLog}
		</div>
		<div class="text-white bg-gray-500 space-y-2 px-2">
			{activity.id}
		</div>
	{/each}
</div>
