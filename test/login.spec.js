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

  test('tiene un botón para logearse al muro', () => {
    const DOM = document.createElement('div');
    DOM.append(login());
    const loginButton = DOM.querySelector('.button-login');
    expect(loginButton).toBeDefined();
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
