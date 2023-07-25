import { checkAuthStatus } from '$lib/authStore';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const user = await checkAuthStatus();
	if (user !== undefined) {
		// If the user is not authenticated, redirect to the login page
		throw redirect(308, '/about');
	}

	return {
		props: {} // Return a plain object at the top level
	};
};
