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

  test('tiene un botón para logearse a al muro ', () => {
    const DOM = document.createElement('div');
    DOM.append(login());
    const loginButton = DOM.querySelector('.button-login');
    expect(loginButton).toBeDefined();
  });

  test('lleva los datos correctos para ingresar', () => {
    const navigateTo = jest.fn();

    const DOM = document.createElement('div');
    DOM.append(login(navigateTo));

    const emailInput = DOM.querySelector('.email');
    const passwordInput = DOM.querySelector('.password');
    emailInput.value = 'pepi@gmail.com';
    passwordInput.value = '123456';

    const loginButton = DOM.querySelector('.button-login');
    loginButton.click();
    setTimeout(() => {
      expect(navigateTo).toHaveBeenLastCalledWith('/wall');
    });
  });

  test('llama a showAlert con el mensaje correcto al error de credenciales incorrectas', () => {
    const navigateTo = jest.fn();
    const showAlert = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(login(navigateTo, showAlert));

    const emailInput = DOM.querySelector('.email');
    const passwordInput = DOM.querySelector('.password');
    emailInput.value = 'pepi@gmail.com';
    passwordInput.value = 'invalid-password';

    const loginButton = DOM.querySelector('.button-login');
    loginButton.click();
    setTimeout(() => {
      expect(showAlert).toHaveBeenCalledWith('Datos incorrectos, verifica nuevamente');
    });
  });

  test('llama a loginGoogle al hacer clic en el botón de Google', () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(login(navigateTo));

    const googleButton = DOM.querySelector('.button-google');
    googleButton.click();

    setTimeout(() => {
      expect(navigateTo).toHaveBeenLastCalledWith('/wall');
    });
  });
});
