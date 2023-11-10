import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firestore';
import { createPost } from '../lib/index.js';

export function wall(navigateTo) {
  const headerWall = document.createElement('header');
  headerWall.setAttribute('class', 'header-w');
  const titleWall = document.createElement('h1');
  titleWall.setAttribute('class', 'title-w');
  const logoHeader = document.createElement('img');
  logoHeader.setAttribute('class', 'logo-header-w');
  const logOut = document.createElement('button');
  logOut.setAttribute('class', 'logOut');
  const divWall = document.createElement('div');
  divWall.setAttribute('class', 'div-w');
  // const menu = document.createElement('select'); menu.setAttribute('id', 'menu-w');
  // const op1 = document.createElement('option'); op1.setAttribute('value', ' ');
  const editButton = document.createElement('button');
  editButton.setAttribute('class', 'edit-button');
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'delete');
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  const postInput = document.createElement('input');
  postInput.setAttribute('type', 'text');
  const publishButton = document.createElement('button');
  publishButton.id = 'publish-button';
  const postsContainer = document.createElement('div');
  postsContainer.setAttribute('id', 'comment-div');

  titleWall.textContent = 'Fit Sync';
  logoHeader.setAttribute('src', 'IMAGENES/logo-fit.png');
  publishButton.textContent = 'Publicar';
  postInput.setAttribute('placeholder', 'Escribe tu publicación');

  logOut.textContent = 'Cerrar sesión';
  logOut.addEventListener('click', () => {
    navigateTo('/'); // Redirigir home
  });

  publishButton.addEventListener('click', () => {
    const comment = postInput.value;
    console.log('veamos', comment);
    createPost(comment);
  });

  headerWall.append(titleWall, logoHeader, logOut);
  postsContainer.append(postInput, publishButton, editButton, deleteButton);
  divWall.append(headerWall, postsContainer);

  // Agregar el contenedor principal al cuerpo del documento
  document.body.appendChild(divWall);

  // Ahora que el elemento con id 'comment-div' está en el DOM, podemos obtenerlo
  const commentsContainer = document.getElementById('comment-div');

  const loadComments = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    querySnapshot.forEach((doc) => {
      const commentData = doc.data();
      const commentText = commentData.comment;
      // Crear un contenedor para la publicación y sus botones
      const postContainer = document.createElement('div');
      postContainer.setAttribute('class', 'post-container');
      const commentElement = document.createElement('div');
      commentElement.textContent = commentText;
      commentElement.setAttribute('class', 'comments');
      // Crear botones de "Editar" y "Eliminar" para esta publicación
      const editButton = document.createElement('button');
      editButton.setAttribute('class', 'edit-button');
      editButton.innerHTML = '<i class="fas fa-edit"></i>';

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('class', 'delete');
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

      const likeButton = document.createElement('button');
      likeButton.setAttribute('class', 'like-button');
      likeButton.innerHTML = '<i class="fa-solid fa-heart"></i>';

      // Agregar los botones a la publicación
      postContainer.append(commentElement, editButton, deleteButton, likeButton);
      
      // Agregar el contenedor de la publicación al contenedor principal
      commentsContainer.appendChild(postContainer);
    });
  };

  loadComments();
  window.addEventListener('load', loadComments);

  return divWall; // Devolvemos el contenedor principal por si deseas agregar más contenido al muro
}
