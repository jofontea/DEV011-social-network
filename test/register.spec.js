/**
 * @jest-environment jsdom
 */
import { register } from '../src/Views/register.js';

jest.mock('../src/lib/index', () => ({
  registerFirebase: jest.fn((email, password) => {
    if (email === 'pepa@gmail.com' && password === '123456') {
      const userCredential = { user: 'pepa@gmail.com' };
      return Promise.resolve(userCredential);
    }
    return Promise.reject();
  }),
  validateUserExist: jest.fn(() => Promise.resolve([])),
}));

describe('register', () => {
  test('debería ser una función', () => {
    expect(typeof register).toBe('function');
  });

  test('tiene un botón para crear una cuenta', () => {
    const DOM = document.createElement('div');
    DOM.append(register());
    const sendButton = DOM.querySelector('.button-send');
    expect(sendButton).toBeDefined();
  });

  test('llama a registerFirebase con los datos correctos', () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(register(navigateTo));

    const emailInput = DOM.querySelector('#email-r');
    const passwordInput = DOM.querySelector('#password-r');
    emailInput.value = 'pepa@gmail.com';
    passwordInput.value = '123456';

    const sendButton = DOM.querySelector('.button-send');
    sendButton.click(); // Simula el clic en el botón, espera
    // await Promise.resolve();
    setTimeout(() => {
      expect(navigateTo).toHaveBeenLastCalledWith('/wall');
    });
  });
});
