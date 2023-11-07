import { registerFirebase } from '../lib';

export function register(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2'); title.setAttribute('class', 'title-r');
  const button = document.createElement('button'); button.setAttribute('class', 'button-send');
  const imgLogo = document.createElement('img'); imgLogo.setAttribute('class', 'img-logo');
  const text = document.createElement('h2'); text.setAttribute('class', 'text-r');
  const email = document.createElement('input'); email.setAttribute('id', 'email-r');
  const password = document.createElement('input'); password.setAttribute('id', 'password-r');
  const divRg = document.createElement('div'); divRg.setAttribute('class', 'div-r');
  // const name = document.createElement('input'); name.setAttribute('class', 'name-r');
  // const lastName = document.createElement('input'); lastName.setAttribute('class', 'last-name-r');
  // const againPassword = document.createElement('input'); againPassword.setAttribute('class', 'again-password-r');
  // const date = document.createElement('input'); date.setAttribute('class', 'date-r');

  text.textContent = 'Inserta tus datos aquí';
  email.placeholder = 'Correo electrónico';
  password.placeholder = 'Contraseña';
  button.textContent = 'Enviar datos';
  title.textContent = 'Fit Sync';
  //name.placeholder = 'Nombre';
  //lastName.placeholder = 'Apellido';
  //againPassword.placeholder = 'Repetir contraseña';
  //date.placeholder = 'Fecha de nacimiento';

  imgLogo.setAttribute('src', 'IMAGENES/logo-fit.png');
  button.setAttribute('id', 'buttonlogin');
  password.setAttribute('type', 'password');
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe
    const emailValue = email.value;
    const passwordValue = password.value;
    registerFirebase(emailValue, passwordValue);
  });

  // button.addEventListener('click', () => {
  //   navigateTo('/login');
  // });

  divRg.append(
    title,
    imgLogo,
    text,
    email,
    password,
    button
  );

  section.append(divRg);
  console.log(section);
  return section;
}