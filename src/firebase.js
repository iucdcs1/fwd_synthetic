// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTbsWCWqRUbh7dTnCgvwhHHOOJ82g0KvY",
  authDomain: "fwd-synthetic.firebaseapp.com",
  projectId: "fwd-synthetic",
  storageBucket: "fwd-synthetic.appspot.com",
  messagingSenderId: "958431492978",
  appId: "1:958431492978:web:b5ad982839b612db4a3beb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

/**
 * @type {import("firebase/auth").Auth}
 */
const auth = getAuth(firebaseApp);

export { auth, createUserWithEmailAndPassword };