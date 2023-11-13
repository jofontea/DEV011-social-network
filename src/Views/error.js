export function error(navigateTo) {
  const errorMessageContainer = document.createElement('div');
  errorMessageContainer.setAttribute('class', 'error-message-container');
  const goHome = document.createElement('p');
  goHome.setAttribute('class', 'go-home-message');
  goHome.textContent = 'Vuelve al inicio';
  const title = document.createElement('h2');
  title.setAttribute('class', 'error-message');
  title.textContent = 'Error 404 page not found, please go home';

  const returnButton = document.createElement('button');
  returnButton.setAttribute('class', 'return-button');
  returnButton.innerHTML = '<i class="fi-rr-arrow-small-left"></i>';
  returnButton.addEventListener('click', () => {
    navigateTo('/');
  });

  errorMessageContainer.appendChild(title);
  errorMessageContainer.appendChild(goHome);
  errorMessageContainer.appendChild(returnButton);

  document.body.appendChild(errorMessageContainer);

  return errorMessageContainer;
}
