import type { Fetched } from './interfaces';

export function load({ params }): Fetched {
	return {
		slug: params.slug
	};
}
