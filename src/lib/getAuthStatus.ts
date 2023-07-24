import session from "../lib/session";

  let isLoggedIn = false;

  const unsubscribe = session.subscribe((value) => {
    isLoggedIn = !!value.user;
  });

  export { isLoggedIn };