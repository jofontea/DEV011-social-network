import { loginGoogle, loginUser } from "../lib/index.js";

export function login(navigateTo) {
  const section = document.createElement("section");
  section.setAttribute("class", "container");
  const title = document.createElement("h1");
  title.setAttribute("class", "title");
  const buttonGoogle = document.createElement("button");
  buttonGoogle.setAttribute("class", "button-google");
  const divLogin = document.createElement("div");
  divLogin.setAttribute("class", "div-l");
  const inputEmail = document.createElement("input");
  inputEmail.setAttribute("class", "email");
  const inputPass = document.createElement("input");
  inputPass.setAttribute("class", "password");
  const buttonLogin = document.createElement("button");
  buttonLogin.setAttribute("class", "button-login");
  const checking = document.createElement("button");
  checking.setAttribute("class", "checking");
  const imgLogo = document.createElement("img");
  imgLogo.setAttribute("class", "img-logo");
  const googleLogo = document.createElement("img");
  googleLogo.setAttribute("alt", "Google Logo");

  googleLogo.setAttribute("src", "IMAGENES/Google.png");
  imgLogo.setAttribute("src", "IMAGENES/logo-fit.png");
  inputPass.setAttribute("type", "password");
  title.textContent = "Fit Sync";
  inputEmail.placeholder = "Correo electrónico";
  inputPass.placeholder = "Contraseña";
  buttonLogin.textContent = "Ingresar";
  checking.textContent = "Regístrate";
  buttonGoogle.textContent = "Ingresar con Google";

  buttonLogin.addEventListener("click", (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe
    const emailValue = inputEmail.value;
    const passwordValue = inputPass.value;
    loginUser(emailValue, passwordValue);
  });

  buttonGoogle.addEventListener("click", () => {
    loginGoogle()
  });

  checking.addEventListener("click", () => {
    navigateTo("/register");
  });

  buttonGoogle.appendChild(googleLogo);
  divLogin.append(
    imgLogo,
    inputEmail,
    inputPass,
    buttonLogin,
    buttonGoogle,
    checking
  );
  section.append(title, divLogin);
  return section;
}
