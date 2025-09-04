<script lang="ts">
	let activityName = $state('');
	let activityStart = $state(0);
	let activityGoal = $state(0);
	let activityGoalDate = $state(new Date());
	let activityStep = $state(0);
	let activityMeasure = $state('units');
	let {
		addActivity
	}: {
		addActivity: (
			activityName: string,
			activityStart: number,
			activityGoal: number,
			activityGoalDate: Date,
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
		activityGoalDate = new Date();
		activityStep = 0;
		activityMeasure = 'units';
	}
</script>

<form onsubmit={formSubmitted}>
	<div class="container mx-auto grid grid-cols-2 gap-x-4 px-5 py-5 bg-gray-200 rounded-lg">
		<label> Name : </label>
		<input name="activityName" bind:value={activityName} />
		<label> Where are you now? : </label>
		<input type="number" name="start" bind:value={activityStart} />
		<label> Where do you want to be? : </label>
		<input type="number" name="goal" bind:value={activityGoal} />
		<label> When do you want to get there? : </label>
		<input type="date" name="when" bind:value={activityGoalDate} />
		<label> Step </label>
		<input type="number" name="step" bind:value={activityStep} />
		<label> Measure </label>
		<input name="measure" bind:value={activityMeasure} />
	</div>
	<button class="px-4 py-2 bg-gray-800 text-white rounded-md">add</button>
</form>
