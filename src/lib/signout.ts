import { goto } from '$app/navigation';
import { firebaseAuth } from './firebase';
import sessionStore from './session';

export function logout() {
  firebaseAuth.signOut().then(() => {
    sessionStore.set({ user: null, loading: false });
  });
  goto("../login");
  window.location.reload();
}