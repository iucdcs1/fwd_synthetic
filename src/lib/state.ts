// persistent application state

import { writable, type Writable } from 'svelte/store';
import type { AppState } from './interface';

function combineObjects(initial: object, update: object): object {
	// resulting object contains only the fields of the object [initial]
	// overlapping fields are assigned from the object [update] to the result

	const result = { ...initial };

	for (const key of Object.keys(update)) {
		if (key in result) {
			// i know what im doing
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(result as any)[key] = (initial as any)[key];
		}
	}

	return result;
}

// Function to create a persistent store
const createPersistentStore = <T extends object>(key: string, initialValue: T): Writable<T> => {
	const isBrowser = typeof window !== 'undefined';

	// Initialize the store with the initial value
	const initial = isBrowser
		? combineObjects(initialValue, JSON.parse(localStorage.getItem(key) || '{}'))
		: initialValue;

	const typedInitial = initial as T;

	const store = writable(typedInitial);

	// Subscribe to the store and update localStorage on changes (client-side only)
	if (isBrowser) {
		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
};

// Create and export the AppState store
export const appState = createPersistentStore<AppState>('appState', {
	dbLink: '',
	tables: [],
	selected_table: ''
});
