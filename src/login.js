// file login.js
export function login() {
  const section = document.createElement('section');
  section.setAttribute('class', 'container');
  const title = document.createElement('h1');
  title.setAttribute('class', 'title');
  const buttonGoogle = document.createElement('button');
  buttonGoogle.setAttribute('class', 'button-google');
  const form = document.createElement('form');
  form.setAttribute('class', 'form');
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('class', 'email');
  const inputPass = document.createElement('input');
  inputPass.setAttribute('class', 'password');
  const buttonLogin = document.createElement('button');
  buttonLogin.setAttribute('class', 'button-login');
  const checking = document.createElement('button');
  checking.setAttribute('class', 'checking');
  const imgLogo = document.createElement('img');
  imgLogo.setAttribute('class', 'img-logo');
  imgLogo.setAttribute('src', 'logo app Fit Sync.png');




  title.textContent = 'Fit Sync';
  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';
  buttonLogin.textContent = 'Ingresar';
  checking.textContent = 'Regístrate';
  buttonGoogle.textContent = 'Ingresar con Google';

  form.append( imgLogo, inputEmail, inputPass, buttonLogin);
  section.append(title, form, buttonGoogle, checking,);
  console.log(login);
  return section;
}

export default login;