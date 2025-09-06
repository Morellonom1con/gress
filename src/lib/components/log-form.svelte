<script lang="ts">
	let logProgress = $state(0);
	let logTitle = $state('');
	let logComment = $state('');
	let logDatetime = $state('');

	let {
		addLog
	}: {
		addLog: (
			logProgress: number,
			logTitle: string,
			logComment: string,
			logDatetime: string
		) => void;
	} = $props();

	function logFormSubmitted(e: SubmitEvent) {
		e.preventDefault();
		addLog(logProgress, logTitle, logComment, logDatetime);

		logProgress = 0;
		logTitle = '';
		logComment = '';
		logDatetime = '';
	}
</script>

<form onsubmit={logFormSubmitted}>
	<div class="container mx-auto grid grid-cols-2 gap-x-4 px-5 py-5 bg-blue-200 rounded-lg">
		<label> Progress : </label>
		<input type="number" name="progress" bind:value={logProgress} />

		<label> Title : </label>
		<input name="title" bind:value={logTitle} />

		<label> Entry : </label>
		<textarea name="entry" bind:value={logComment} class="col-span-2"></textarea>

		<label> Date : </label>
		<input type="datetime-local" name="datetime" bind:value={logDatetime} />
	</div>
	<button class="mt-2 px-4 py-2 bg-blue-800 text-white rounded-md">Add Log</button>
</form>
