/**
 * @jest-environment jsdom
 */
import { home } from '../src/Views/home';

describe('home', () => {
  test('debería ser una función', () => {
    expect(typeof home).toBe('function');
  });

  test('tiene un botón para dirigirse a login', () => {
    const DOM = document.createElement('div');
    DOM.append(home());
    const haveAButton = DOM.querySelector('.button-h');
    expect(haveAButton).toBeDefined();
  });

  test('el botón es capaz de redirigir al usuario a login', async () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(home(navigateTo));

    const haveAButton = DOM.querySelector('.button-h');
    haveAButton.click();
    expect(navigateTo).toHaveBeenCalledWith('/login');
  });
});
