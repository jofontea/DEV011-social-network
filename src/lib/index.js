/// CONFIGURACION FIREBASE

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbMAlU7tKoqM8G0vzW63Je5YM-gqIA-MI",
  authDomain: "fit-sync-8974c.firebaseapp.com",
  projectId: "fit-sync-8974c",
  storageBucket: "fit-sync-8974c.appspot.com",
  messagingSenderId: "1069101892727",
  appId: "1:1069101892727:web:070ac7c457c1e444e83272",
  measurementId: "G-T7HF2BQQSR"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth();//app
const provider = new GoogleAuthProvider();
// aqui exportaras las funciones que necesites
// GOOGLE

export const loginGoogle = () => {
  const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    //const credential = GoogleAuthProvider.credentialFromResult(result);
    //const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
   // console.error(errorCode)
  });
};

// export const loginFirebase = (email,password) => {

//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       console.log('Usuario registrado:', user);
//     })
//     .catch((error) => {
//       console.error('Error al registrar usuario:', error);
//     });
// };


