import {
  collection, getDocs, addDoc, serverTimestamp, deleteDoc, doc, updateDoc, getDoc, setDoc,
} from 'firebase/firestore';
import { db } from '../firestore.js';
import { logoutUser } from '../lib/index.js';
import { auth } from '../config-firebase.js';
import imgLogo from '../IMAGENES/logo-fit.png';

let divWall;
let publishButton;
export function createInput() {
  const postInput = document.createElement('input');
  postInput.setAttribute('type', 'text');
  postInput.setAttribute('id', 'comment-input');
  postInput.setAttribute('placeholder', 'Escribe tu publicación');
  postInput.setAttribute('autofocus', 'autofocus');
  return postInput;
}

export async function loadComments(container, inputContainer) {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    if (querySnapshot.size === 0) {
      console.log('No hay comentarios disponibles.');
      return;
    }

    const comments = querySnapshot.docs
      .map((document) => {
        const commentData = document.data();
        const commentText = commentData.comment;
        const postId = document.id;
        // validamos que no sea una cadena vacia
        return commentText.trim() !== '' ? { postId, text: commentText, timestamp: commentData.timestamp } : null;
      }).filter(Boolean);
    // organizamos los comentarios en orden descendente
    comments.sort((a, b) => b.timestamp - a.timestamp);

    container.innerHTML = '';
    comments.forEach(async (comment) => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      const commentElement = document.createElement('div');
      commentElement.textContent = `ID: ${comment.postId}, Comentario: ${comment.text}`;
      commentElement.classList.add('comments');

      const containerIcons = document.createElement('div');
      containerIcons.setAttribute('class', 'container-icons');

      const editButton = document.createElement('button');
      editButton.setAttribute('class', 'edit-button');
      editButton.innerHTML = '<i class="fas fa-edit"></i>';
      editButton.addEventListener('click', async () => {
        const newText = prompt('Edita tu comentario:', comment.text);
        if (newText !== null) {
          try {
            const commentRef = doc(db, 'posts', comment.postId);
            await updateDoc(commentRef, { comment: newText });
            await loadComments(container, inputContainer);
          } catch (error) {
            console.error('Error al editar el comentario:', error);
          }
        }
      });

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('class', 'delete');
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.addEventListener('click', async () => {
        // eslint-disable-next-line no-restricted-globals
        const confirmDelete = confirm('¿Estás seguro de eliminar el comentario?');
        if (confirmDelete) {
          try {
            const commentRef = doc(db, 'posts', comment.postId);
            await deleteDoc(commentRef);
            await loadComments(container, inputContainer);
          } catch (error) {
            console.error('Error al eliminar el comentario:', error);
          }
        }
      });

      const likeCountSpan = document.createElement('span');
      likeCountSpan.setAttribute('class', 'like-count');
      likeCountSpan.setAttribute('data-post-id', comment.postId);
      likeCountSpan.textContent = '0'; // Inicialmente, el conteo de likes es 0

      // Obtener los likes para este comentario
      const likesSnapshot = await getDocs(collection(db, 'posts', comment.postId, 'likes'));
      likeCountSpan.textContent = likesSnapshot.size.toString(); // Mostrar el número de likes

      // Agrega likeCountSpan al DOM (junto con el comentario)
      postElement.appendChild(likeCountSpan);

      const likeButton = document.createElement('button');
      likeButton.setAttribute('class', 'like-button');
      likeButton.setAttribute('data-post-id', comment.postId);
      likeButton.innerHTML = '<i class="fa-sharp fa-solid fa-heart-circle-check"></i>';

      likeButton.addEventListener('click', async () => {
        try {
          const userId = auth.currentUser.uid;

          const likeRef = doc(db, 'posts', comment.postId, 'likes', `${userId}`);
          const likeSnapshot = await getDoc(likeRef);

          if (likeSnapshot.exists()) {
            // Si ya existe un like, quitar el like
            likeButton.classList.remove('liked');
            await deleteDoc(likeRef);
          } else {
            likeButton.classList.add('liked');
            // Si no existe un like, agregar el like
            await setDoc(likeRef, { userId });
          }

          // Actualizar el conteo de likes en el post
          const likesSnapshot2 = await getDocs(collection(db, 'posts', comment.postId, 'likes'));
          likeCountSpan.textContent = likesSnapshot2.size.toString();
        } catch (error) {
          console.error('Error al dar/quitar like al comentario:', error);
        }
      });

      containerIcons.append(editButton, deleteButton, likeButton, likeCountSpan);

      postElement.appendChild(commentElement);
      postElement.appendChild(containerIcons);

      container.appendChild(postElement);
    });

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

  const imgLogoElement = document.createElement('img');
  imgLogoElement.setAttribute('id', 'logo-header-w');
  imgLogoElement.setAttribute('src', imgLogo);

  const logOut = document.createElement('button');
  logOut.classList.add('logOut');
  logOut.textContent = 'Cerrar sesión';
  logOut.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
  logOut.addEventListener('click', async () => {
    // eslint-disable-next-line no-restricted-globals
    const alertlogOut = confirm('¿Está seguro que desea salir de su cuenta?');
    if (alertlogOut === true) {
      await logoutUser();
      navigateTo('/');
    } else {
      alert('Operación cancelada');
    }
  }); const inputContainer = document.createElement('div');
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

  headerWall.append(titleWall, imgLogoElement, logOut);
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
