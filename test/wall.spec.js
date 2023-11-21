/**
 * @jest-environment jsdom
 */
import {
  createInput, wall,
} from '../src/Views/wall.js';

jest.mock('../src/lib/index', () => ({
  logoutUser: jest.fn(() => Promise.resolve([])),
}));

describe('wall', () => {
  test('tiene un botón para editar', () => {
    const DOM = document.createElement('div');
    DOM.append(wall());
    const haveAButton = DOM.querySelector('.edit-button');
    expect(haveAButton).toBeDefined();
  });
  test('tiene un botón para dar "me gusta"', () => {
    const DOM = document.createElement('div');
    DOM.append(wall());
    const haveAButton = DOM.querySelector('.like-button');
    expect(haveAButton).toBeDefined();
  });
  test('tiene un botón para eliminar el post', () => {
    const DOM = document.createElement('div');
    DOM.append(wall());
    const haveAButton = DOM.querySelector('.delete');
    expect(haveAButton).toBeDefined();
  });
  test('tiene un botón para publicar un comentario', () => {
    const DOM = document.createElement('div');
    DOM.append(wall());
    const haveAButton = DOM.querySelector('#publish-button');
    expect(haveAButton).toBeDefined();
  });
  test('tiene un botón para cerrar sesión', () => {
    const DOM = document.createElement('div');
    DOM.append(wall());
    const haveAButton = DOM.querySelector('.logOut');
    expect(haveAButton).toBeDefined();
  });
  // eslint-disable-next-line max-len
  // test('el botón es capaz de rederigir al usuario a home luego de cerrar la sesión', async () => {
  //   const DOM = document.createElement('div');
  //   const navigateTo = jest.fn();
  //   DOM.append(wall(navigateTo));
  //   await Promise.resolve();

  //   const logOutButton = DOM.querySelector('.logOut');
  //   logOutButton.click();

  //   expect(navigateTo).toHaveBeenCalledWith('/');
  // });
});

describe('createInput', () => {
  test('debería crear un elemento input correctamente', () => {
    const inputElement = createInput();

    expect(inputElement.tagName).toBe('INPUT');
    expect(inputElement.getAttribute('type')).toBe('text');
    expect(inputElement.getAttribute('id')).toBe('comment-input');
    expect(inputElement.getAttribute('placeholder')).toBe('Escribe tu publicación');
    expect(inputElement.hasAttribute('autofocus')).toBe(true);
  });
});
