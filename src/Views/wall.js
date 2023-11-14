import {
  collection, getDocs, addDoc, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firestore';
import { logoutUser } from '../lib/index.js';

let divWall;
let publishButton;

function createInput() {
  const postInput = document.createElement('input');
  postInput.setAttribute('type', 'text');
  postInput.setAttribute('id', 'comment-input');
  postInput.setAttribute('placeholder', 'Escribe tu publicación');
  postInput.setAttribute('autofocus', 'autofocus');
  return postInput;
}

async function loadComments(container, inputContainer) {
  console.log('Antes de cargar comentarios');
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    if (querySnapshot.size === 0) {
      console.log('No hay comentarios disponibles.');
      return;
    }

    const comments = querySnapshot.docs.map((doc) => {
      const commentData = doc.data();
      const commentText = commentData.comment;

      return commentText.trim() !== '' ? { id: doc.id, text: commentText, timestamp: commentData.timestamp } : null;
    }).filter(Boolean);

    comments.sort((a, b) => b.timestamp - a.timestamp);

    container.innerHTML = '';

    comments.forEach(({ id, text }) => {
      const commentElement = document.createElement('div');
      commentElement.textContent = `ID: ${id}, Comentario: ${text}`;
      commentElement.classList.add('comments');

      container.appendChild(commentElement);
    });

    console.log('Comentarios cargados correctamente');

    inputContainer.innerHTML = '';
    inputContainer.appendChild(createInput());
  } catch (error) {
    console.error('Error al cargar comentarios:', error);
  }
}

export async function wall(navigateTo) {
  if (divWall) {
    divWall.innerHTML = '';
  } else {
    divWall = document.createElement('div');
    divWall.classList.add('div-w');
  }

  const headerWall = document.createElement('header');
  headerWall.classList.add('header-w');

  const titleWall = document.createElement('h1');
  titleWall.classList.add('title-w');
  titleWall.textContent = 'Fit Sync';

  const logoHeader = document.createElement('img');
  logoHeader.classList.add('logo-header-w');
  logoHeader.setAttribute('src', 'IMAGENES/logo-fit.png');

  const logOut = document.createElement('button');
  logOut.classList.add('logOut');
  logOut.textContent = 'Cerrar sesión';
  logOut.addEventListener('click', async () => {
    // eslint-disable-next-line no-restricted-globals
    const alertlogOut = confirm('¿Está seguro que desea salir de su cuenta?');
    if (alertlogOut === true) {
      await logoutUser();
      navigateTo('/');
    } else {
      alert('Operación cancelada');
    }
  });

  const inputContainer = document.createElement('div');
  inputContainer.setAttribute('id', 'comment-input-container');
  inputContainer.appendChild(createInput());

  // Asegurarnos de que el ID del botón de publicar sea único
  if (!publishButton) {
    publishButton = document.createElement('button');
    publishButton.id = 'publish-button';
    publishButton.textContent = 'Publicar';
  }

  const postsContainer = document.createElement('div');
  postsContainer.setAttribute('id', 'comment-div');

  headerWall.append(titleWall, logoHeader, logOut);
  divWall.append(headerWall, inputContainer, publishButton, postsContainer);

  await loadComments(postsContainer, inputContainer);

  publishButton.addEventListener('click', async (e) => {
    console.log('Clic en el botón de publicar');
    e.preventDefault();

    const commentInput = inputContainer.querySelector('#comment-input');
    const comment = commentInput ? commentInput.value.trim() : '';

    if (comment === '') {
      alert('Comentario vacío, por favor ingresa texto.');
      return;
    }

    await addDoc(collection(db, 'posts'), {
      comment,
      timestamp: serverTimestamp(),
    });

    await loadComments(postsContainer, inputContainer);
  });

  return divWall;
}
