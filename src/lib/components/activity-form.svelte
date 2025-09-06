<script lang="ts">
	let activityName = $state('');
	let activityStart = $state(0);
	let activityGoal = $state(0);
	let activityGoalDate = $state('');
	let activityStep = $state(0);
	let activityMeasure = $state('units');
	let {
		addActivity
	}: {
		addActivity: (
			activityName: string,
			activityStart: number,
			activityGoal: number,
			activityGoalDate: string,
			activityStep: number,
			activityMeasure: string
		) => void;
	} = $props();

	function formSubmitted(e: SubmitEvent) {
		e.preventDefault();
		addActivity(
			activityName,
			activityStart,
			activityGoal,
			activityGoalDate,
			activityStep,
			activityMeasure
		);
		activityName = '';
		activityStart = 0;
		activityGoal = 0;
		activityGoalDate = '';
		activityStep = 0;
		activityMeasure = 'units';
	}

	const today = new Date().toISOString().split('T')[0];
</script>

<form onsubmit={formSubmitted}>
	<div class="container mx-auto px-5 py-5 bg-slate-500 rounded-lg">
		<div class="flex items-center">
			<label class="text-left ml-15 w-90 text-white" for="activityName">Name :</label>
			<input
				class="rounded-sm bg-gray-200 w-250 border-white"
				id="activityName"
				name="activityName"
				bind:value={activityName}
			/>
		</div>
		<br />
		<div class="flex items-center">
			<label class="text-left ml-15 w-90 text-white" for="activityStart">Where are you now? :</label
			>
			<input
				class="rounded-sm bg-gray-200 w-250 border-white"
				id="activityStart"
				type="number"
				name="start"
				bind:value={activityStart}
			/>
		</div>
		<br />
		<div class="flex items-center">
			<label class="text-left ml-15 w-90 text-white" for="activityGoal"
				>Where do you want to be? :</label
			>
			<input
				class="rounded-sm bg-gray-200 w-250 border-white"
				id="activityGoal"
				type="number"
				name="goal"
				bind:value={activityGoal}
			/>
		</div>
		<br />

		<div class="flex items-center">
			<label class="text-left ml-15 w-90 text-white" for="activityGoalDate"
				>When do you want to get there? :</label
			>
			<input
				class="rounded-sm bg-gray-200 w-250 border-white"
				id="activityGoalDate"
				type="date"
				name="when"
				bind:value={activityGoalDate}
				min={today}
			/>
		</div>
		<br />

		<div class="flex items-center">
			<label class="text-left align-middle ml-15 w-90 text-white" for="activityStep">Step :</label>
			<input
				class="rounded-sm bg-gray-200 w-250 border-white"
				id="activityStep"
				type="number"
				name="step"
				bind:value={activityStep}
			/>
		</div>
		<br />

		<div class="flex items-center">
			<label class="text-left ml-15 w-90 text-white" for="activityMeasure">Measure :</label>
			<input
				class="rounded-sm bg-gray-200 w-250 border-white"
				id="activityMeasure"
				name="measure"
				bind:value={activityMeasure}
			/>
		</div>
		<br />
		<button
			dir="ltr"
			class="flex ml-339 px-4 py-2 bg-slate-500 border border-white text-white rounded-md"
			>add</button
		>
	</div>
</form>
