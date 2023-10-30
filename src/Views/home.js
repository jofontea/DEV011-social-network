export function home(navigateTo) {
  const divHome = document.createElement('div'); divHome.setAttribute('class', 'div-h');
  const section = document.createElement('section'); section.setAttribute('class', 'body-home');
  const title = document.createElement('h2'); title.setAttribute('class', 'title-h');
  const button = document.createElement('button'); button.setAttribute('class', 'button-h');
  const imgLogo = document.createElement('img'); imgLogo.setAttribute('class', 'img-logo');

  imgLogo.setAttribute('src', 'IMAGENES/logo-fit.png');
  button.textContent = 'Comienza aquí';
  title.textContent = 'Bienvenid@ a Fit Sync';

  button.addEventListener('click', () => {
    navigateTo('/login');
  });

  divHome.append(title, imgLogo, button);
  section.append(divHome);
  console.log(section);
  return section;
}
