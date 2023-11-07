// aqui exportaras las funciones que necesites

import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { db, collection, addDoc } from '../firestore';
import { auth, provider } from '../config-firebase';
import { navigateTo } from '../main';

export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};

// LOGIN USUARIOS YA REGISTRADOS
export const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('usuario registrado', user);
      navigateTo('/wall');
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      if (error.code === 'auth/invalid-login-credentials') {
        alert('Datos incorrectos, verifica nuevamente');
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
      navigateTo('/wall');
    })
    .catch((error) => {
      console.log(error);
      alert('Datos incorrectos, verifica nuevamente.');
    });
};

export const registerFirebase = (email, password) => {
  if (password.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres.');
    return;
  }
  // Verificar si el correo ya está registrado
  fetchSignInMethodsForEmail(auth, email)
    .then((signInMethods) => {
      if (signInMethods.length === 0) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            // Enviar correo de confirmación
            sendEmailVerification(user)
              .then(() => {
                console.log('Correo de confirmación enviado.');
              })
              .catch((error) => {
                console.error(
                  'Error al enviar el correo de confirmación:',
                  error,
                );
              });

            console.log('Usuario registrado:', user);
            navigateTo('/login');
          })
          .catch((error) => {
            console.error('Error de Autenticación de Firebase:', error);
            if (
              error.code === 'auth/email-already-in-use'
              || error.code === 'auth/invalid-email'
            ) {
              alert(
                'El correo electrónico ya está en uso o es inválido. Intenta con otro correo.',
              );
            }
          });
      } else {
        alert(
          'El correo electrónico ya está registrado. Intenta iniciar sesión en su lugar.',
        );
      }
    })
    .catch((error) => {
      console.error('Error al verificar el correo electrónico:', error);
    });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.emailVerified) {
        // Usuario autenticado y correo electrónico verificado
        navigateTo('/wall'); // Redirigir al muro de la app
      } else {
        // Usuario autenticado, pero correo no verificado
        navigateTo('/login'); // Redirigir de nuevo a la página de inicio de sesión
      }
    }
  });
};
export const createPost = (comment) => {
  addDoc(collection(db, 'posts'), {
    comment,
  });
};

/* export const querySnapshot = getDocs(collection(db, "posts"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});
*/
