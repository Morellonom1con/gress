import type { PageLoad } from './$types';
import { get } from 'svelte/store';
import { activities, type Activity } from '$lib/stores/activities'; // wherever you keep them

export const load: PageLoad = async ({ params }) => {
	const activityList = get(activities);
	const activity = activityList.find((a: Activity) => a.id === params.id);

	if (!activity) {
		throw new Error(`Activity with id ${params.id} not found`);
	}

	return { activity };
};
