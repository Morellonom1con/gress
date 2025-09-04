import { writable } from "svelte/store";
export type logEntry = {
	id: string;
	progress: number;
	entry: string;
	date: Date;
};

export type Activity = {
	id: string;
	title: string;
	start: number;
	goal: number;
	goalDate: Date;
	step: number;
	measure: string;
	logs: logEntry[];
	lastLog: Date;
};

export const activities = writable<Activity[]>([]);
