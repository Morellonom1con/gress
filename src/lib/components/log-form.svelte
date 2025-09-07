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
	<div class="container mx-auto px-5 py-5 bg-slate-500 rounded-lg">
		<div class="flex items-center">
			<label class="text-left ml-15 w-90 text-white" for="logProgress">Progress :</label>
			<input
				id="logProgress"
				type="number"
				name="progress"
				class="rounded-sm bg-gray-200 w-250 border-white"
				bind:value={logProgress}
			/>
		</div>
		<br />

		<div class="flex items-center">
			<label class="text-left ml-15 w-90 text-white" for="logTitle">Title :</label>
			<input
				id="logTitle"
				name="title"
				class="rounded-sm bg-gray-200 w-250 border-white"
				bind:value={logTitle}
			/>
		</div>
		<br />

		<div class="flex items-start">
			<label class="text-left ml-15 w-90 text-white" for="logComment">Entry :</label>
			<textarea
				id="logComment"
				name="entry"
				class="rounded-sm bg-gray-200 w-250 border-white"
				rows="4"
				bind:value={logComment}
			></textarea>
		</div>
		<br />

		<div class="flex items-center">
			<label class="text-left ml-15 w-90 text-white" for="logDatetime">Date :</label>
			<input
				id="logDatetime"
				type="datetime-local"
				name="datetime"
				class="rounded-sm bg-gray-200 w-250 border-white"
				bind:value={logDatetime}
			/>
		</div>
	</div>

	<button
		type="submit"
		dir="ltr"
		class="flex ml-339 px-4 py-2 bg-slate-500 border border-white text-white rounded-md"
	>
		Add Log
	</button>
</form>
