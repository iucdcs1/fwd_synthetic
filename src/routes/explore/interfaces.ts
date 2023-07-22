import type { TableData } from '$lib/interface';

export interface FetchError {
	err: string;
	detail: string;
}

export interface FetchResult {
	dbLink: string;
	tables: TableData[];
}
