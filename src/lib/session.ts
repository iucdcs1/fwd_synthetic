import { writable } from 'svelte/store';
import { firebaseAuth } from './firebase';
import type { AuthUser } from './types';
  
  // Create a writable Svelte store to hold the user's authentication state
  const sessionStore = writable<{ user: AuthUser | null; loading: boolean }>({
    user: null,
    loading: true,
  });
  
  // Subscribe to Firebase Auth changes and update the store accordingly
  firebaseAuth.onAuthStateChanged((user) => {
    // If user is not null, create a custom User object with necessary properties
    const customUser: AuthUser | null = user
      ? {
          uid: user.uid,
          email: user.email ?? null, // Ensure 'email' is either a string or null
          // Add any other properties you require
        }
      : null;
  
    sessionStore.set({ user: customUser, loading: false });
  });
  
  export default sessionStore;