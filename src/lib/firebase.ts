import { initializeApp, getApps } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAKNk94FUICyHlzltlfy_7XotBCtMZL1VY',
	authDomain: 'fwdsynth.firebaseapp.com',
	projectId: 'fwdsynth',
	storageBucket: 'fwdsynth.appspot.com',
	messagingSenderId: '706469767600',
	appId: '1:706469767600:web:ae4465cdd8af4527548e75'
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
}

// Auth
const firebaseAuth = getAuth(firebaseApp);

setPersistence(firebaseAuth, browserLocalPersistence);

export { firebaseApp, firebaseAuth };
