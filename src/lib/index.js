// aqui exportaras las funciones que necesites

import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { db, collection, addDoc } from '../firestore';
import { auth, provider } from '../config-firebase';
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
