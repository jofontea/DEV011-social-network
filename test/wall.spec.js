/**
 * @jest-environment jsdom
 */
import {
  createButton, createInput, getLikeCount, handlePublishButtonClick,
} from '../src/Views/wall.js';

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
    expect(inputElement.hasAttribute('autofocus')).toBe(true);
  });
});

describe('handlePublishButtonClick', () => {
  test('debería ser una función', () => {
    expect(typeof handlePublishButtonClick).toBe('function');
  });

  test('publica un comentario correctamente', async () => {
    document.body.innerHTML = '<div id="postsContainer"></div><div id="inputContainer"></div>';
    const COMMENT_INPUT_ID = 'comment-input';
    const PUBLISH_BUTTON_ID = 'publishButton';
    const postsContainer = document.getElementById('postsContainer');
    const inputContainer = document.getElementById('inputContainer');
    const inputElement = document.createElement('input');
    inputElement.value = 'Este es un comentario de prueba';
    inputElement.setAttribute('id', COMMENT_INPUT_ID);
    inputContainer.appendChild(inputElement);
    const publishButton = createButton(PUBLISH_BUTTON_ID, 'Publicar', async (e) => {
      e.preventDefault();
      await handlePublishButtonClick(postsContainer, inputContainer);
    });
    publishButton.click();
    document.body.innerHTML = '';
  });
});
describe('getLikeCount', () => {
  test('debería ser una función', () => {
    expect(typeof getLikeCount).toBe('function');
  });

/* test('debería obtener la cantidad correcta de likes', async () => {
    // Configuración inicial
    const postId = 'postId123'; // Ajusta según tu aplicación y base de datos

    // Llama a la función getLikeCount para obtener la cantidad de likes
    const likeCount = await getLikeCount(postId);

    // Asegura que la cantidad de likes sea la esperada
    expect(likeCount).toBe('2'); // Aquí puedes ajustar el valor esperado según tu lógica
  }); */
});
/* describe('loadComments', () => {
  test('debería cargar comentarios correctamente', async () => {
    // Configura el estado inicial del DOM
    document.body.innerHTML = '<div id="postsContainer"></div><div id="inputContainer"></div>';
    const inputContainer = document.getElementById('inputContainer');
    const postsContainer = document.getElementById('postsContainer');

    // Llama a la función que estás probando
    await loadComments(postsContainer, inputContainer);

    expect(postsContainer.children).toHaveLength(1);

    // Limpia el estado del DOM después de la prueba
    document.body.innerHTML = '';
  });
}); */
