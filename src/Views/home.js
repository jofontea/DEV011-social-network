/*sera el el elemento que se visualiza en nuestra aplicación cuando entremos la primera vez, 
esta función retorna un nodo que incluye un titulo con un mensaje de bienvenida y un 
botón que por el momento solo se visualiza el cual más adelante nos permitirá
 navegar a la ruta login.
*/
//file home.js
export function home(navigateTo) {
  const section = document.createElement("section");
  const title = document.createElement("h2");
  const button = document.createElement("button");
  const imgLogo = document.createElement("img");
  const body =  document.createElement('body')

  imgLogo.setAttribute("class", "img-logo");
  imgLogo.setAttribute("src", "IMAGENES/logo-fit.png");
  body.setAttribute("class","body");
  body.setAttribute("src", "IMAGENES/background.png");

  button.textContent = "Comienza aquí";
  button.setAttribute("id", "buttonlogin");
  title.textContent = "Bienvenid@ a Fit Sync";
  button.addEventListener("click", () => {
    navigateTo("/login");
  });

  section.append(body, title, imgLogo, button);
  console.log(section);
  return section;
}
