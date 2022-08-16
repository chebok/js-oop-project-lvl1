/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import Validator from '../src/Validator.js';

let v;
let schema;

beforeAll(() => {
  v = new Validator();
  schema = v.string();
});

test('string', async () => {
  expect(await schema.isValid('')).toBeTruthy();
  expect(await schema.isValid(null)).toBeTruthy();
  expect(await schema.isValid(undefined)).toBeTruthy();
  schema.required();
  expect(await schema.isValid('what does the fox say')).toBeTruthy();
  expect(await schema.isValid('')).toBeFalsy();
  expect(await schema.isValid(null)).toBeFalsy();
  expect(await schema.contains('what').isValid('what does the fox say')).toBeTruthy();
  expect(await schema.contains('whatthe').isValid('what does the fox say')).toBeFalsy();
  expect(await schema.isValid('what does the fox say')).toBeFalsy();
});
