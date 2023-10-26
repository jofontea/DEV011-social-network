
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider } from "../config-firebase";
import { navigateTo } from "../main";

//LOGIN USUARIOS YA REGISTRADOS
export const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("usuario registrado", user);
      navigateTo("/");
      return (user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      if (error.code === "auth/invalid-login-credentials") {
        alert("Datos incorrectos, verifica nuevamente");
      }
    });
};

// INGRESO POR GOOGLE
export const loginGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      navigateTo("/");
      return user
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode);
      console.log(error);
      return error
    });
};
// REGISTRO
export const RegisterFirebase = (email, password) => {
  if (password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return;
  }
  // Verificar si el correo ya está registrado
  fetchSignInMethodsForEmail(auth, email)
    .then((signInMethods) => {
      if (signInMethods.length === 0) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuario registrado:", user);
          })
          .catch((error) => {
            console.error("Error de Autenticación de Firebase:", error);
            if (error.code === "auth/email-already-in-use") {
              alert("El correo electrónico ya está en uso. Intenta con otro correo o inicia sesión.");
            }
            else if (error.code === "auth/invalid-email") {
              alert("El correo electrónico es invalido. Intenta nuevamente con otro correo.");
            }
          });
      } else {
        alert("El correo electrónico ya está registrado. Intenta iniciar sesión en su lugar.");
      }
    })
    .catch((error) => {
      console.error("Error al verificar el correo electrónico:", error);
    });
};
