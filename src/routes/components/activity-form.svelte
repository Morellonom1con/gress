<script lang="ts">
	let activityName = $state('');
	let activityStart = $state('');
	let activityGoal = $state('');
	let activityGoalDate = $state('');
	let activityStep = $state('');
	let activityMeasure = $state('');
	let {
		addActivity
	}: {
		addActivity: (activityName: string) => void;
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
		activityStart = '';
		activityGoal = '';
		activityGoalDate = '';
		activityStep = '';
		activityMeasure = '';
	}
</script>

<form onsubmit={formSubmitted}>
	<label>
		Name :
		<input name="activityName" bind:value={activityName} />
	</label>
	<label>
		Where are you now? :
		<input name="start" bind:value={activityStart} />
	</label>
	<label>
		Where do you want to be? :
		<input name="goal" bind:value={activityGoal} />
	</label>
	<label>
		When do you want to get there? :
		<input name="when" bind:value={activityGoalDate} />
	</label>
	<label>
		Step
		<input name="step" bind:value={activityStep} />
	</label>
	<label>
		Measure
		<input name="measure" bind:value={activityMeasure} />
	</label>

	<button class="px-4 py-2 bg-gray-800 text-white rounded-md">+</button>
</form>
