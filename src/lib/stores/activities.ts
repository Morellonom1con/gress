import { writable } from "svelte/store";

export type Activity = {
	id: string;
	title: string;
	start: number;
	goal: number;
	goalDate: string;
	step: number;
	measure: string;
	logsID: string[];
	lastLog: string;
};

export const activities = writable<Activity[]>([]);
