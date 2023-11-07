/**
 * @jest-environment jsdom
 */
import { loginUser } from '../src/lib/index';

describe('loginUser', () => {
  test('debería ser una función', () => {
    expect(typeof loginUser).toBe('function');
  });
});
