export function register(navigateTo) {
  const section = document.createElement("section");
  const title = document.createElement("h2");
  const button = document.createElement("button");
  const imgLogo = document.createElement("img");

  const text = document.createElement("h2");
  const email = document.createElement("input");
  const name = document.createElement("input");
  const lastName = document.createElement("input");
  const password = document.createElement("input");
  const againPassword = document.createElement("input");
  const date = document.createElement("input");
  const form = document.createElement("form");

  title.setAttribute("class", "title-r");
  form.setAttribute("class", "form-r");
  text.setAttribute("class", "text-r");
  text.textContent = "Inserta tus datos aquí";
  email.setAttribute("class", "email-r");
  email.placeholder = "Correo electrónico";
  name.setAttribute("class", "name-r");
  name.placeholder = "Nombre";
  lastName.setAttribute("class", "last-name-r");
  lastName.placeholder = "Apellido";
  password.setAttribute("class", "password-r");
  password.placeholder = "Contraseña";
  againPassword.setAttribute("class", "again-password-r");
  againPassword.placeholder = "Repetir contraseña";
  date.setAttribute("class", "date-r");
  date.placeholder = "Fecha de nacimiento";

  imgLogo.setAttribute("class", "img-logo");
  imgLogo.setAttribute("src", "IMAGENES/logo-fit.png");
  button.setAttribute("class", "button-send");
  button.textContent = "Enviar datos";
  button.setAttribute("id", "buttonlogin");
  title.textContent = "Fit Sync";
  button.addEventListener("click", () => {
    navigateTo("/login");
  });
  form.append(
    title,
    imgLogo,
    text,
    email,
    name,
    lastName,
    password,
    againPassword,
    date,
    button
  );
  section.append(form);
  console.log(section);
  return section;
}
