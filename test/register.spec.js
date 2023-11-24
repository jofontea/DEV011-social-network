/**
 * @jest-environment jsdom
 */
import { register } from '../src/Views/register.js';
import { registerFirebase } from '../src/lib/index.js';

jest.mock('../src/lib/index', () => ({
  registerFirebase: jest.fn(() => Promise.resolve([])),
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
  test('tiene un botón para volver atrás', () => {
    const DOM = document.createElement('div');
    DOM.append(register());
    const sendButton = DOM.querySelector('.return-button');
    expect(sendButton).toBeDefined();
  });
  test('se devuelve a la pagina anterior (login)', () => {
    const DOM = document.createElement('div');
    const navigateTo = jest.fn();
    DOM.append(register(navigateTo));
    const haveAbuttonLogin = DOM.querySelector('.return-button');
    haveAbuttonLogin.click();
    expect(navigateTo).toHaveBeenLastCalledWith('/login');
  });
  test('llama a registerFirebase con los datos correctos', async () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(register(navigateTo));

    const emailInput = DOM.querySelector('#email');
    const passwordInput = DOM.querySelector('#password');
    emailInput.value = 'pepa@gmail.com';
    passwordInput.value = '123456';

    registerFirebase.mockResolvedValue();

    const sendButton = DOM.querySelector('.button-send');
    sendButton.click();

    setTimeout(() => {
      const errorMessageElement = DOM.querySelector('.alert-message');
      expect(errorMessageElement.textContent).toBe('Usuario registrado con exito.');
      expect(navigateTo).toHaveBeenLastCalledWith('/login');
    });
  });
  test('muestra mensaje de error al intentar registrarse con datos incompletos', () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(register(navigateTo));

    registerFirebase.mockRejectedValue(new Error('Simulated error'));

    const sendButton = DOM.querySelector('.button-send');
    sendButton.click();
    setTimeout(() => {
      const errorMessageElement = DOM.querySelector('.alert-message');
      expect(errorMessageElement.textContent).toBe('Te falta ingresar la contraseña');
    });
  });

  test('muestra mensaje de error al intentar registrarse con contraseña corta', () => {
    // Setup
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(register(navigateTo));

    const emailInput = DOM.querySelector('#email');
    const passwordInput = DOM.querySelector('#password');
    emailInput.value = 'pepa@gmail.com';
    passwordInput.value = '123';

    registerFirebase.mockRejectedValue(new Error('Simulated error'));

    const sendButton = DOM.querySelector('.button-send');
    sendButton.click();

    setTimeout(() => {
      const errorMessageElement = DOM.querySelector('.alert-message');
      expect(errorMessageElement.textContent).toBe('Tu contraseña debe tener al menos 6 caracteres');
    });
  });

  test('muestra mensaje de error al intentar registrarse con correo electrónico inválido', () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(register(navigateTo));

    const emailInput = DOM.querySelector('#email');
    const passwordInput = DOM.querySelector('#password');
    emailInput.value = 'invalid-email';
    passwordInput.value = '123456';

    registerFirebase.mockRejectedValue(new Error('Simulated error'));

    const sendButton = DOM.querySelector('.button-send');
    sendButton.click();

    setTimeout(() => {
      const errorMessageElement = DOM.querySelector('.alert-message');
      expect(errorMessageElement.textContent).toBe('El correo electrónico es invalido');
    });
  });
  test('muestra mensaje de error al intentar registrarse con correo ya registrado', () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(register(navigateTo));

    const emailInput = DOM.querySelector('#email');
    const passwordInput = DOM.querySelector('#password');
    emailInput.value = 'pepi@gmail.com';
    passwordInput.value = '123456';

    registerFirebase.mockRejectedValue(new Error('Simulated error'));

    const sendButton = DOM.querySelector('.button-send');
    sendButton.click();

    setTimeout(() => {
      const errorMessageElement = DOM.querySelector('.alert-message');
      expect(errorMessageElement.textContent).toBe('El correo electrónico ya está en uso');
    });
  });
});
