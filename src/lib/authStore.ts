// $lib/authStore.ts

import { writable, get } from 'svelte/store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface AuthUser {
	uid: string;
	email: string;
}

// Check if the user is authenticated using a session cookie
const checkAuthStatus = async (): Promise<AuthUser | undefined> => {
	const firebaseAuth = getAuth();
	return new Promise((resolve) => {
		onAuthStateChanged(firebaseAuth, (user) => {
			if (user) {
				const authUser: AuthUser = {
					uid: user.uid,
					email: user.email || ''
				};
				resolve(authUser);
			} else {
				resolve(undefined);
			}
		});
	});
};

// Create a writable store for authUser
const authUser = writable<AuthUser | undefined>(undefined);

// Subscribe to the authUser store and update it with the session cookie status
(async () => {
	const user = await checkAuthStatus();
	authUser.set(user);
})();

export { authUser, checkAuthStatus };
