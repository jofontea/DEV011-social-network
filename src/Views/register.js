import { registerFirebase, validateUserExist } from '../lib/index.js';

export function register(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2'); title.setAttribute('class', 'title-r');
  const button = document.createElement('button'); button.setAttribute('class', 'button-send');
  const imgLogo = document.createElement('img'); imgLogo.setAttribute('class', 'img-logo');
  const text = document.createElement('h2'); text.setAttribute('class', 'text-r');
  const email = document.createElement('input'); email.setAttribute('id', 'email-r');
  const password = document.createElement('input'); password.setAttribute('id', 'password-r');
  const divRg = document.createElement('div'); divRg.setAttribute('class', 'div-r');

  text.textContent = 'Inserta tus datos aquí';
  email.placeholder = 'Correo electrónico';
  password.placeholder = 'Contraseña';
  button.textContent = 'Enviar datos';
  title.textContent = 'Fit Sync';

  imgLogo.setAttribute('src', 'IMAGENES/logo-fit.png');
  button.setAttribute('id', 'buttonlogin');
  password.setAttribute('type', 'password');
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe
    const emailValue = email.value;
    const passwordValue = password.value;
    if (passwordValue.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    validateUserExist(emailValue)
      .then((signInMethods) => {
        if (signInMethods.length === 0) {
          registerFirebase(emailValue, passwordValue)
            .then((userCredential) => {
              const user = userCredential.user;
              // Enviar correo de confirmación
              console.log('Usuario registrado:', user);
              navigateTo('/login');
            })
            .catch((error) => {
              console.error('Error de Autenticación de Firebase:', error);
              if (
                error.code === 'auth/email-already-in-use'
              || error.code === 'auth/invalid-email'
              ) {
                alert(
                  'El correo electrónico ya está en uso o es inválido. Intenta con otro correo.',
                );
              }
            });
        } else {
          alert(
            'El correo electrónico ya está registrado. Intenta iniciar sesión en su lugar.',
          );
        }
      })
      .catch((error) => {
        console.error('Error al verificar el correo electrónico:', error);
      });
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
    button,
  );

  section.append(divRg);
  // console.log(section);
  return section;
}
