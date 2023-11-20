import {
  getDocs, addDoc, serverTimestamp, deleteDoc, doc, updateDoc, getDoc, setDoc, collection,
} from 'firebase/firestore';
import { db } from '../firestore.js';
import { logoutUser } from '../lib/index.js';
import { auth } from '../config-firebase.js';

// Constantes
const COMMENT_INPUT_ID = 'comment-input';
const COMMENT_CONTAINER_ID = 'comment-input-container';
const PUBLISH_BUTTON_ID = 'publish-button';
const POSTS_COLLECTION_NAME = 'posts';
const LIKES_COLLECTION_NAME = 'likes';

// Función para crear un input
export function createInput() {
  const postInput = document.createElement('input');
  postInput.type = 'text';
  postInput.id = COMMENT_INPUT_ID;
  postInput.placeholder = 'Escribe tu publicación';
  postInput.autofocus = true;
  return postInput;
}

// Función para cargar comentarios
export async function loadComments(container, inputContainer) {
  try {
    const querySnapshot = await getDocs(collection(db, POSTS_COLLECTION_NAME));

    if (querySnapshot.size === 0) {
      console.log('No hay comentarios disponibles.');
      return;
    }

    const comments = querySnapshot.docs
      .map((document) => {
        const commentData = document.data();
        const commentText = commentData.comment;
        const postId = document.id;

        return commentText.trim() !== '' ? { postId, text: commentText, timestamp: commentData.timestamp } : null;
      })
      .filter(Boolean);

    comments.sort((a, b) => b.timestamp - a.timestamp);

    container.innerHTML = '';

    // eslint-disable-next-line max-len, no-use-before-define
    const renderPromises = comments.map(({ postId, text }) => renderComment({ postId, text }, container, inputContainer));

    await Promise.all(renderPromises);

    inputContainer.innerHTML = '';
    inputContainer.appendChild(createInput());
  } catch (error) {
    console.error('Error al cargar comentarios:', error);
  }
}

// Función para crear un botón
export function createButton(className, innerHTML, clickHandler) {
  const button = document.createElement('button');
  button.classList.add(className);
  button.innerHTML = innerHTML;
  button.addEventListener('click', clickHandler);
  return button;
}

// Función para obtener la cantidad de likes
export async function getLikeCount(postId) {
  const likesCollectionRef = collection(db, POSTS_COLLECTION_NAME, postId, LIKES_COLLECTION_NAME);
  const likesSnapshot = await getDocs(likesCollectionRef);
  return likesSnapshot.size.toString();
}

// Función para manejar el clic en el botón de publicar
export async function handlePublishButtonClick(postsContainer, inputContainer) {
  try {
    const commentInput = inputContainer.querySelector(`#${COMMENT_INPUT_ID}`);
    const comment = commentInput ? commentInput.value.trim() : '';
    const errorMessageElement = document.querySelector('#error-message');

    if (comment === '') {
      if (!errorMessageElement) {
        console.error('Error: errorMessageElement is null or undefined');
        return;
      }

      errorMessageElement.textContent = 'Comentario vacío, por favor ingresa texto.';
      return;
    }

    // Limpiar el mensaje de error si no hay problemas
    if (errorMessageElement) {
      errorMessageElement.textContent = '';
    }

    await addDoc(collection(db, POSTS_COLLECTION_NAME), {
      comment,
      timestamp: serverTimestamp(),
    });

    await loadComments(postsContainer, inputContainer);
  } catch (error) {
    console.error('Error publishing comment:', error);
  }
}

// Función para renderizar un comentario
export async function renderComment({ postId, text }, container, inputContainer) {
  const postElement = document.createElement('div');
  postElement.classList.add('post');

  const commentElement = document.createElement('div');
  commentElement.textContent = `ID: ${postId}, Comentario: ${text}`;
  commentElement.classList.add('comments');

  const containerIcons = document.createElement('div');
  containerIcons.classList.add('container-icons');

  const editButton = createButton('edit-button', '<i class="fas fa-edit"></i>', async () => {
    const newText = prompt('Edita tu comentario:', text);
    if (newText !== null) {
      try {
        const commentRef = doc(db, POSTS_COLLECTION_NAME, postId);
        await updateDoc(commentRef, { comment: newText });
        await loadComments(container, inputContainer);
      } catch (error) {
        console.error('Error al editar el comentario:', error);
      }
    }
  });

  const deleteButton = createButton('delete', '<i class="fas fa-trash"></i>', async () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm('¿Estás seguro de eliminar el comentario?');
    if (confirmDelete) {
      try {
        const commentRef = doc(db, POSTS_COLLECTION_NAME, postId);
        await deleteDoc(commentRef);
        await loadComments(container, inputContainer);
      } catch (error) {
        console.error('Error al eliminar el comentario:', error);
      }
    }
  });

  const likeCountSpan = document.createElement('span');
  likeCountSpan.classList.add('like-count');
  likeCountSpan.setAttribute('data-post-id', postId);
  likeCountSpan.textContent = await getLikeCount(postId);

  const likeButton = createButton('like-button', '<i class="fa-sharp fa-solid fa-heart-circle-check"></i>', async () => {
    try {
      const userId = auth.currentUser.uid;

      const likeRef = doc(db, POSTS_COLLECTION_NAME, postId, LIKES_COLLECTION_NAME, `${userId}`);
      const likeSnapshot = await getDoc(likeRef);

      if (likeSnapshot.exists()) {
        likeButton.classList.remove('liked');
        await deleteDoc(likeRef);
      } else {
        likeButton.classList.add('liked');
        await setDoc(likeRef, { userId });
      }

      likeCountSpan.textContent = await getLikeCount(postId);
    } catch (error) {
      console.error('Error al dar/quitar like al comentario:', error);
    }
  });

  containerIcons.append(editButton, deleteButton, likeButton, likeCountSpan);

  postElement.appendChild(likeCountSpan);

  postElement.appendChild(commentElement);
  postElement.appendChild(containerIcons);

  container.appendChild(postElement);
}

// Función principal para la página de comentarios
export async function wall(navigateTo) {
  let divWall = document.querySelector('.div-w');
  const postsContainerId = 'posts-container';

  if (!divWall) {
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
  logoHeader.src = 'IMAGENES/logo-fit.png';

  const logOut = createButton('logOut', '<i class="fa-solid fa-right-to-bracket"></i>', async () => {
    // eslint-disable-next-line no-restricted-globals
    const alertlogOut = confirm('¿Está seguro que desea salir de su cuenta?');
    if (alertlogOut === true) {
      await logoutUser();
      navigateTo('/');
    } else {
      alert('Operación cancelada');
    }
  });

  const errorMessageElement = document.createElement('div');
  errorMessageElement.id = 'error-message'; // Asegúrate de que este id sea único en tu HTML
  errorMessageElement.classList.add('error-message'); // Puedes agregar estilos según sea necesario

  const inputContainer = document.createElement('div');
  inputContainer.id = COMMENT_CONTAINER_ID;
  inputContainer.appendChild(errorMessageElement); // Agregar el elemento de mensaje de error
  inputContainer.appendChild(createInput());

  const postsContainer = document.createElement('div');
  postsContainer.id = postsContainerId;

  const publishButton = createButton(PUBLISH_BUTTON_ID, 'Publicar', async (e) => {
    console.log('Clic en el botón de publicar');
    e.preventDefault();
    await handlePublishButtonClick(postsContainer, inputContainer);
  });

  headerWall.append(titleWall, logoHeader, logOut);
  divWall.append(headerWall, inputContainer, publishButton, postsContainer);

  await loadComments(postsContainer, inputContainer);

  return divWall;
}
