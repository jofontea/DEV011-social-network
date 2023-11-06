export function wall(navigateTo) {
  const headerWall = document.createElement('header'); headerWall.setAttribute('class', 'header-w');
  const titleWall = document.createElement('h1'); titleWall.setAttribute('class', 'title-w');
  const logoHeader = document.createElement('img'); logoHeader.setAttribute('class', 'logo-header-w');
  const logOut = document.createElement("button"); logOut.setAttribute('class', 'logOut');
  const divWall = document.createElement("div"); divWall.setAttribute("class", "div-w");
  //const menu = document.createElement('select'); menu.setAttribute('id', 'menu-w');
  // const op1 = document.createElement('option'); op1.setAttribute('value', ' ');
  const footerWall = document.createElement('footer'); footerWall.setAttribute('class', 'footer-w');
  const copyrightText = document.createElement("p"); copyrightText.setAttribute('class', 'text_footer');
  const postInput = document.createElement("input"); postInput.setAttribute("type", "text");
  const publishButton = document.createElement("button");
  const postsContainer = document.createElement("div"); postsContainer.setAttribute("class", "posts-container");


  titleWall.textContent = "Fit Sync";
  logoHeader.setAttribute('src', 'IMAGENES/logo-fit.png');
  copyrightText.textContent = "© 2023 Josefa, Jessica y Camila. Todos los derechos reservados.";
  publishButton.textContent = "Publicar";
  postInput.setAttribute("placeholder", "Escribe tu publicación");


  logOut.textContent = "Cerrar sesión";
  logOut.addEventListener("click", () => {
    navigateTo("/"); // Redirigir home
  });
// // CREAR POST
//   function createPost(text) {
//     const post = document.createElement("div");
//     post.textContent = text;
//     // Botón para eliminar un post
//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "Eliminar";
//     deleteButton.addEventListener("click", () => {
//       if (confirm("¿Seguro que deseas eliminar esta publicación?")) {
//         post.remove();
//       }
//     });
//     // Botón para editar un post
//     const editButton = document.createElement("button");
//     editButton.textContent = "Editar";
//     editButton.addEventListener("click", () => {
//       const editText = document.createElement("input");
//       editText.setAttribute("type", "text");
//       editText.value = post.textContent;
//       const saveButton = document.createElement("button");
//       saveButton.textContent = "Guardar";
//       saveButton.addEventListener("click", () => {
//         post.textContent = editText.value;
//         saveButton.remove();
//         editButton.style.display = "block";
//       });
//       post.textContent = "";
//       post.append(editText, saveButton);
//       editButton.style.display = "none";
//     });
//     post.appendChild(deleteButton);
//     post.appendChild(editButton);
//     return post;
//   }
// // Función para dar like a un post
// function likePost(post) {
//   // Implementa la lógica para dar/quitar like y llevar un conteo de likes aquí
// }

// Función para publicar un nuevo post
function publishPost() {
  const text = postInput.value;
  if (text.trim() !== "") {
    const post = createPost(text);
    postsContainer.appendChild(post);
    postInput.value = "";
  }
}

publishButton.addEventListener("click", publishPost);

// // ... (continúa con la implementación de otras funciones y lógica)

  // Agregar elementos al encabezado
  headerWall.append(titleWall, logoHeader, logOut);
  footerWall.appendChild(copyrightText);
  // Agregar elementos al contenedor principal
  //divWall.append(headerWall, footerWall);
  divWall.append(headerWall, postInput, publishButton, postsContainer, footerWall);

  // Agregar el contenedor principal al cuerpo del documento
  document.body.appendChild(divWall);

  return divWall; // Devolvemos el contenedor principal por si deseas agregar más contenido al muro
}
