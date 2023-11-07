// file login.js
function login() {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    const buttonReturn = document.createElement('button');
    const form = document.createElement('form');
    const inputEmail = document.createElement('input');
    const inputPass = document.createElement('input');
    const buttonLogin = document.createElement('button');
  
    inputEmail.placeholder = 'Escribir email';
    inputPass.placeholder = 'contraseña';
  
    title.textContent = 'Regístrate';
    buttonLogin.textContent = 'ingresar';
  
    buttonReturn.textContent = 'Volver al inicio';
  
    form.append(inputEmail, inputPass, buttonLogin);
    section.append(title, form, buttonReturn);
  
    return section;
  }
  
  export default login;