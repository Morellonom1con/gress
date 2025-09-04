<script lang="ts">
	export let data;
	const { activity } = data;
</script>

<h1>{activity.title}</h1>
<p><strong>Start:</strong> {activity.start}</p>
<p><strong>Goal:</strong> {activity.goal}</p>
<p><strong>Goal Date:</strong> {activity.goalDate.toString()}</p>
<p><strong>Step:</strong> {activity.step}</p>
<p><strong>Measure:</strong> {activity.measure}</p>
<p><strong>Last Log:</strong> {activity.lastLog.toString()}</p>
