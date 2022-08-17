/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import Validator from '../src/Validator.js';

let v;
let schema;
let schema2;

beforeAll(() => {
  v = new Validator();
  schema = v.string();
  schema2 = v.number();
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
  expect(await schema.minLength(6).isValid('what')).toBeFalsy();
  expect(await schema.contains('whatthe').isValid('what does the fox say')).toBeFalsy();
  expect(await schema.isValid('what does the fox say')).toBeFalsy();
  expect(await schema.isValid('whatthe')).toBeTruthy();
});

test('number', async () => {
  expect(await schema2.isValid(null)).toBeTruthy();
  schema2.required();
  expect(await schema2.isValid(0)).toBeTruthy();
  expect(await schema2.isValid(7)).toBeTruthy();
  expect(await schema2.isValid(null)).toBeFalsy();
  schema2.positive();
  expect(await schema2.isValid(-5)).toBeFalsy();
  schema2.range(-5, 5);
  expect(await schema2.isValid(5)).toBeTruthy();
  expect(await schema2.isValid(-3)).toBeFalsy();
});
