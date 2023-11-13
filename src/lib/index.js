import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { db, collection, addDoc } from '../firestore';
import { auth, provider } from '../config-firebase';

export function initializeAuth(setupPost, navigateTo) {
  const authentication = getAuth();

  onAuthStateChanged(authentication, async (user) => {
    if (user) {
      // Usuario autenticado, puedes acceder a la colección de 'posts'
      console.log('User authenticated:', authentication.currentUser.uid, 'email:', user.email);

      // Llamar a la función setupPost para configurar la aplicación después de la autenticación
      setupPost();

      // Lógica de redirección o cualquier otra cosa que necesites hacer después de la autenticación
      return '/wall';
    }
    // Usuario no autenticado
    console.log('User not authenticated.');

    return '/login'; // Redirigir a la página de inicio de sesión, por ejemplo
  }).then((redirectPath) => {
    navigateTo(redirectPath);
  });
}

// LOGIN USUARIOS YA REGISTRADOS
export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

// INGRESO POR GOOGLE
export const loginGoogle = () => signInWithPopup(auth, provider);

// eslint-disable-next-line max-len
export const registerFirebase = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const validateUserExist = (email) => fetchSignInMethodsForEmail(auth, email);

export const createPost = (comment) => {
  addDoc(collection(db, 'posts'), {
    comment,
  });
};

// cerrar sesión

export const logoutUser = () => signOut(auth);
