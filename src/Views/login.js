import { loginGoogle, loginUser } from '../lib/index.js';
// import imgLogo from '../IMAGENES/logo-fit.png';
const imgLogo = '../IMAGENES/logo-fit.png';
export function login(navigateTo) {
  const section = document.createElement('section');
  section.setAttribute('class', 'container');
  const title = document.createElement('h1');
  title.setAttribute('class', 'title');
  const buttonGoogle = document.createElement('button');
  buttonGoogle.setAttribute('class', 'button-google');
  const divLogin = document.createElement('div');
  divLogin.setAttribute('class', 'div-l');
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('id', 'email');
  const inputPass = document.createElement('input');
  inputPass.setAttribute('id', 'password');
  const buttonLogin = document.createElement('button');
  buttonLogin.setAttribute('class', 'button-login');
  const checking = document.createElement('button');
  checking.setAttribute('class', 'checking');
  const imgLogoElement = document.createElement('img');
  imgLogoElement.setAttribute('id', 'img-logo');
  imgLogoElement.setAttribute('src', imgLogo);

  const googleLogo = document.createElement('i');
  googleLogo.className = 'fa-brands fa-google';
  googleLogo.setAttribute('id', 'google-logo');

  const errorMessageElement = document.createElement('span');
  errorMessageElement.className = 'alert-message';
  errorMessageElement.classList.add('hidden');

  googleLogo.setAttribute('src', googleLogo);

  inputPass.setAttribute('type', 'password');
  title.textContent = 'Fit Sync';
  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';
  buttonLogin.textContent = 'Ingresar';
  checking.textContent = 'Regístrate';
  buttonGoogle.textContent = 'Ingresar con ';

  const returnButton = document.createElement('button');
  returnButton.setAttribute('class', 'return-button');
  returnButton.innerHTML = '<i class="fi-rr-arrow-small-left"></i>';
  returnButton.addEventListener('click', () => {
    navigateTo('/');
  });

  buttonLogin.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe
    const emailValue = inputEmail.value;
    const passwordValue = inputPass.value;
    loginUser(emailValue, passwordValue)
      .then(() => {
        navigateTo('/wall');
      })
      .catch(() => {
        errorMessageElement.textContent = 'Datos incorrectos, verifica nuevamente';
        errorMessageElement.classList.remove('hidden');
        setTimeout(() => {
          errorMessageElement.classList.add('hidden');
        }, 3000);
      });
  });

  buttonGoogle.addEventListener('click', () => {
    loginGoogle()
      .then(() => {
        navigateTo('/wall');
      })
      .catch(() => {
        // console.log(error);
        errorMessageElement.textContent = 'Datos incorrectos, verifica nuevamente';
        errorMessageElement.classList.remove('hidden');
        // setTimeout(() => {
        //   errorMessageElement.classList.add('hidden');
        // }, 3000);
      });
  });

  checking.addEventListener('click', () => {
    navigateTo('/register');
  });

  buttonGoogle.appendChild(googleLogo);
  divLogin.append(
    imgLogoElement,
    inputEmail,
    inputPass,
    errorMessageElement,
    buttonLogin,
    buttonGoogle,
    checking,
    returnButton,
  );
  section.append(title, divLogin);
  return section;
}
