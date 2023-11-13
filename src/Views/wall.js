import {
  collection, getDocs, addDoc, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firestore';
import { logoutUser } from '../lib/index.js';

export async function wall(navigateTo) {
  const divWall = document.createElement('div');
  divWall.classList.add('div-w');

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

  const publishButton = document.createElement('button');
  publishButton.id = 'publish-button';
  publishButton.textContent = 'Publicar';

  const postsContainer = document.createElement('div');
  postsContainer.setAttribute('id', 'comment-div');

  // Construir la interfaz antes de cargar los comentarios
  headerWall.append(titleWall, logoHeader, logOut);
  divWall.append(headerWall, inputContainer, publishButton, postsContainer);

  // Agregar la interfaz al DOM
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = '';
    root.appendChild(divWall);
  } else {
    console.error("No se encontró el elemento con id 'root'");
    return;
  }

  // Cargar comentarios después de construir la interfaz
  await loadComments(postsContainer, inputContainer);

  // Event listener para publicar comentarios
  publishButton.addEventListener('click', async (e) => {
    console.log('Clic en el botón de publicar');
    e.preventDefault(); // Evita el envío del formulario por defecto

    const commentInput = inputContainer.querySelector('#comment-input');
    const comment = commentInput ? commentInput.value.trim() : '';
    console.log('Contenido del comentario:', comment);

    if (comment === '') {
      alert('Comentario vacío, por favor ingresa texto.');
      return;
    }

    // Crear nuevo comentario en la base de datos
    await addDoc(collection(db, 'posts'), {
      comment,
      timestamp: serverTimestamp(),
    });

    // Actualizar solo los comentarios después de publicar
    await loadComments(postsContainer, inputContainer);
  });
}

function createInput() {
  const postInput = document.createElement('input');
  postInput.setAttribute('type', 'text');
  postInput.setAttribute('id', 'comment-input');
  postInput.setAttribute('placeholder', 'Escribe tu publicación');
  postInput.setAttribute('autofocus', 'autofocus'); // Enfocar el input al cargar la página
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

    // Ordenar comentarios por timestamp en orden descendente (los más nuevos primero)
    comments.sort((a, b) => b.timestamp - a.timestamp);

    // Limpiar el contenedor antes de agregar nuevos comentarios
    container.innerHTML = '';

    // Agregar comentarios al contenedor
    comments.forEach(({ id, text }) => {
      const commentElement = document.createElement('div');
      commentElement.textContent = `ID: ${id}, Comentario: ${text}`;
      commentElement.classList.add('comments');

      container.appendChild(commentElement);
    });

    console.log('Comentarios cargados correctamente');

    // Restaurar el input después de cargar los comentarios
    inputContainer.innerHTML = '';
    inputContainer.appendChild(createInput());
  } catch (error) {
    console.error('Error al cargar comentarios:', error);
  }
}
