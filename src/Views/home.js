// import imgLogo from '../IMAGENES/logo-fit.png';
const imgLogo = '../IMAGENES/logo-fit.png';
export function home(navigateTo) {
  const divHome = document.createElement('div');
  divHome.setAttribute('class', 'div-h');

  const section = document.createElement('section');
  section.setAttribute('class', 'body-home');

  const title = document.createElement('h2');
  title.setAttribute('class', 'title-h');

  const button = document.createElement('button');
  button.setAttribute('class', 'button-h');

  const imgLogoElement = document.createElement('img');
  imgLogoElement.setAttribute('id', 'img-logo');

  imgLogoElement.setAttribute('src', imgLogo);

  button.textContent = 'Comienza aquí';
  title.textContent = 'Bienvenid@ a Fit Sync';

  button.addEventListener('click', () => {
    navigateTo('/login');
  });

  divHome.append(title, imgLogoElement, button);
  section.append(divHome);

  console.log(section);
  return section;
}
