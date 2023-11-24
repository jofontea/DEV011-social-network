/**
 * @jest-environment jsdom
 */
import { login } from '../src/Views/login.js';

jest.mock('../src/lib/index.js', () => ({
  loginUser: jest.fn((email, password) => {
    if (email === 'pepi@gmail.com' && password === '123456') {
      return Promise.resolve();
    }
    return Promise.reject();
  }),
  loginGoogle: jest.fn(() => Promise.resolve()),
}));

describe('login', () => {
  test('debería ser una función', () => {
    expect(typeof login).toBe('function');
  });

  test('tiene un botón para ingresar con correo electrónico y contraseña', () => {
    const DOM = document.createElement('div');
    DOM.append(login());
    const haveAButton = DOM.querySelector('.button-login');
    expect(haveAButton).toBeDefined();
  });
  test('tiene un botón para ingresar con cuenta de Google', () => {
    const DOM = document.createElement('div');
    DOM.append(login());
    const haveAButton = DOM.querySelector('.button-google');
    expect(haveAButton).toBeDefined();
  });
  test('tiene un botón para completar formulario de registro', () => {
    const DOM = document.createElement('div');
    DOM.append(login());
    const haveAButton = DOM.querySelector('.checking');
    expect(haveAButton).toBeDefined();
  });
  test('tiene un botón para volver atrás', () => {
    const DOM = document.createElement('div');
    DOM.append(login());
    const haveAButton = DOM.querySelector('.return-button');
    expect(haveAButton).toBeDefined();
  });
  test('se devuelve a la pagina anterior (login)', () => {
    const DOM = document.createElement('div');
    const navigateTo = jest.fn();
    DOM.append(login(navigateTo));
    const haveAbuttonLogin = DOM.querySelector('.return-button');
    haveAbuttonLogin.click();
    expect(navigateTo).toHaveBeenLastCalledWith('/');
  });
  test('lleva los datos correctos para ingresar', async () => {
    const navigateTo = jest.fn();

    const DOM = document.createElement('div');
    DOM.append(login(navigateTo));

    const emailInput = DOM.querySelector('#email');
    const passwordInput = DOM.querySelector('#password');
    emailInput.value = 'pepi@gmail.com';
    passwordInput.value = '123456';

    const loginButton = DOM.querySelector('.button-login');
    loginButton.click();

    // Esperar a que se resuelva la promesa antes de realizar las aserciones
    await Promise.resolve();

    expect(navigateTo).toHaveBeenCalledWith('/wall');
  });

  test('llama a mensaje credenciales incorrectas', () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(login(navigateTo));

    const emailInput = DOM.querySelector('#email');
    const passwordInput = DOM.querySelector('#password');
    emailInput.value = 'pepi@gmail.com';
    passwordInput.value = 'invalid-password';

    const loginButton = DOM.querySelector('.button-login');
    loginButton.click();

    // Utilizamos `await` para esperar que las promesas se resuelvan
    return Promise.resolve().then(() => {
      expect(navigateTo).not.toHaveBeenCalled(); // No debería navegar a /wall
    });
  });

  test('llama a loginGoogle al hacer clic en el botón de Google', async () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(login(navigateTo));

    const googleButton = DOM.querySelector('.button-google');
    googleButton.click();

    // Esperar a que se resuelva la promesa antes de realizar las aserciones
    await Promise.resolve();
    expect(navigateTo).toHaveBeenCalledWith('/wall');
  });
});
