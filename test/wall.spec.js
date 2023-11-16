/**
 * @jest-environment jsdom
 */
import { createInput } from '../src/Views/wall.js';

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
