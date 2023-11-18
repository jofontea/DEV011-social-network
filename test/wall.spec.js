/**
 * @jest-environment jsdom
 */
import { createInput } from '../src/Views/wall.js';

jest.mock('../src/lib/index', () => ({
  logoutUser: jest.fn(),
}));
describe('createInput', () => {
  test('debería crear un elemento input correctamente', () => {
    const inputElement = createInput();

    expect(inputElement.tagName).toBe('INPUT');
    expect(inputElement.getAttribute('type')).toBe('text');
    expect(inputElement.getAttribute('id')).toBe('comment-input');
    expect(inputElement.getAttribute('placeholder')).toBe('Escribe tu publicación');
    expect(inputElement.getAttribute('autofocus')).toBe('autofocus');
  });
});

// describe('wall', () => {
//   test('llama a logOut al hacer clic en el botón de Cerrar Sesion', async () => {
//     const navigateTo = jest.fn();
//     const DOM = document.createElement('div');
//     DOM.append(wall(navigateTo));

//     const logOutButton = DOM.querySelector('.logOut');
//     logOutButton.click();
//     setTimeout(() => {
//       expect(navigateTo).toHaveBeenLastCalledWith('/');
//     });
//   });
// });
