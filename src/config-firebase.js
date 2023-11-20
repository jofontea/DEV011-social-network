// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAbMAlU7tKoqM8G0vzW63Je5YM-gqIA-MI',
  authDomain: 'fit-sync-8974c.firebaseapp.com',
  projectId: 'fit-sync-8974c',
  storageBucket: 'fit-sync-8974c.appspot.com',
  messagingSenderId: '1069101892727',
  appId: '1:1069101892727:web:070ac7c457c1e444e83272',
  measurementId: 'G-T7HF2BQQSR',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);// app
export const provider = new GoogleAuthProvider();

export const firebaseApp = app;
export const firebaseAuth = auth;
export const firebaseProvider = provider;
