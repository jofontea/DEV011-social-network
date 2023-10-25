
import {signInWithPopup} from "firebase/auth"
import { auth, provider } from "../config-firebase";


// GOOGLE
export const loginGoogle = () => {
 signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    return user
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode);
    console.log(error);
    return error
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


