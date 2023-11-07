import { createPost } from "../lib/index";
export function wall(navigateTo) {
  const headerWall = document.createElement("header");
  headerWall.setAttribute("class", "header-w");
  const titleWall = document.createElement("h1");
  titleWall.setAttribute("class", "title-w");
  const logoHeader = document.createElement("img");
  logoHeader.setAttribute("class", "logo-header-w");
  const logOut = document.createElement("button");
  logOut.setAttribute("class", "logOut");
  const divWall = document.createElement("div");
  divWall.setAttribute("class", "div-w");
  //const menu = document.createElement('select'); menu.setAttribute('id', 'menu-w');
  // const op1 = document.createElement('option'); op1.setAttribute('value', ' ');
  const footerWall = document.createElement("footer");
  footerWall.setAttribute("class", "footer-w");
  const copyrightText = document.createElement("p");
  copyrightText.setAttribute("class", "text_footer");
  const postInput = document.createElement("input");
  postInput.setAttribute("type", "text");
  const publishButton = document.createElement("button");
  publishButton.id = "publish-button";
  const postsContainer = document.createElement("div");

  titleWall.textContent = "Fit Sync";
  logoHeader.setAttribute("src", "IMAGENES/logo-fit.png");
  copyrightText.textContent =
    "© 2023 Josefa, Jessica y Camila. Todos los derechos reservados.";
  publishButton.textContent = "Publicar";
  postInput.setAttribute("placeholder", "Escribe tu publicación");

  logOut.textContent = "Cerrar sesión";
  logOut.addEventListener("click", () => {
    navigateTo("/"); // Redirigir home
  });

  publishButton.addEventListener("click", () => {
    const comment = postInput.value;
    console.log("veamos", comment);
    createPost(comment);
  });

  // // CREAR POST

  headerWall.append(titleWall, logoHeader, logOut);
  footerWall.appendChild(copyrightText);
  postsContainer.append(postInput, publishButton);
  // Agregar elementos al contenedor principal
  //divWall.append(headerWall, footerWall);
  divWall.append(headerWall, postsContainer, footerWall);

  // Agregar el contenedor principal al cuerpo del documento
  document.body.appendChild(divWall);

  return divWall; // Devolvemos el contenedor principal por si deseas agregar más contenido al muro
}