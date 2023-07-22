// src/routes/result/+page.ts

import { redirect } from '@sveltejs/kit';
import session from '$lib/session';
import { derived } from 'svelte/store';

const isLoggedIn = derived(session, ($sessionStore) => !!$sessionStore.user);


export const load = async () => {
  if (!isLoggedIn) {
    throw redirect(302, '/login');
  }
  
    return {};
};