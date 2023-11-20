import { registerFirebase } from '../lib/index.js';

export function register(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2'); title.setAttribute('class', 'title-r');
  const button = document.createElement('button'); button.setAttribute('class', 'button-send');
  const imgLogo = document.createElement('img'); imgLogo.setAttribute('class', 'img-logo');
  const text = document.createElement('h2'); text.setAttribute('class', 'text-r');
  const email = document.createElement('input'); email.setAttribute('id', 'email');
  const password = document.createElement('input'); password.setAttribute('id', 'password');
  const divRg = document.createElement('div'); divRg.setAttribute('class', 'div-r');
  const errorMessageElement = document.createElement('span');
  errorMessageElement.className = 'alert-message';
  errorMessageElement.classList.add('hidden');

  text.textContent = 'Inserta tus datos aquí';
  email.placeholder = 'Correo electrónico';
  password.placeholder = 'Contraseña';
  button.textContent = 'Enviar datos';
  title.textContent = 'Fit Sync';

  imgLogo.setAttribute('src', 'IMAGENES/logo-fit.png');
  button.setAttribute('id', 'buttonlogin');
  password.setAttribute('type', 'password');
  const returnButton = document.createElement('button');
  returnButton.setAttribute('class', 'return-button');
  returnButton.innerHTML = '<i class="fi-rr-arrow-small-left"></i>';
  returnButton.addEventListener('click', () => {
    navigateTo('/login');
  });

  button.addEventListener('click', (event) => {
    event.preventDefault();
    const emailValue = email.value;
    const passwordValue = password.value;
    registerFirebase(emailValue, passwordValue)
      .then(() => {
        errorMessageElement.textContent = ('Usuario registrado con exito.');
        errorMessageElement.classList.remove('hidden');
        setTimeout(() => {
          navigateTo('/login');
        }, 2000);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          errorMessageElement.textContent = 'El correo electrónico ya está en uso';
          errorMessageElement.classList.remove('hidden');
          setTimeout(() => {
            errorMessageElement.classList.add('hidden');
          }, 3000);
        } else if (error.code === 'auth/invalid-email') {
          errorMessageElement.textContent = 'El correo electrónico es invalido';
          errorMessageElement.classList.remove('hidden');
          setTimeout(() => {
            errorMessageElement.classList.add('hidden');
          }, 3000);
        } else if (error.code === 'auth/missing-password') {
          errorMessageElement.textContent = 'Te falta ingresar la contraseña';
          errorMessageElement.classList.remove('hidden');
          setTimeout(() => {
            errorMessageElement.classList.add('hidden');
          }, 3000);
        } else if (error.code === 'auth/weak-password') {
          errorMessageElement.textContent = 'Tu contraseña debe tener al menos 6 caracteres';
          errorMessageElement.classList.remove('hidden');
          setTimeout(() => {
            errorMessageElement.classList.add('hidden');
          }, 3000);
        }
      });
  });

  divRg.append(
    title,
    imgLogo,
    text,
    email,
    password,
    errorMessageElement,
    button,
    returnButton,
  );

  section.append(divRg);
  return section;
}
