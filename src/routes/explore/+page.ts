// src/routes/explore/+page.ts

import { redirect } from '@sveltejs/kit';
import session from '$lib/session';


export const load = async () => {
  session.subscribe((value) => {
    console.log("Check:" + value.user?.email);
    if (value.user?.email === undefined || value.user?.email === null) {
      throw redirect(302, '/login');
    }
  })
  
    return {};
};