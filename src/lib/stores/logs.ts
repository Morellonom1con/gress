import { writable } from "svelte/store";

export type logEntry = {
	id: string;
	progress: number;
	title: string;
	comment: string;
	datetime: string;
};
export const logs = writable<logEntry[]>([]);
