/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import Validator from '../src/Validator.js';

test('string', async () => {
  const v = new Validator();
  const schema = v.string();
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
  const v = new Validator();
  const schema2 = v.number();
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

test('array', async () => {
  const v = new Validator();
  const schema3 = v.array();
  expect(await schema3.isValid(null)).toBeTruthy();
  schema3.required();
  expect(await schema3.isValid([])).toBeTruthy();
  expect(await schema3.isValid(null)).toBeFalsy();
  schema3.sizeof(2);
  expect(await schema3.isValid(['hexlet'])).toBeFalsy();
  expect(await schema3.isValid(['hexlet', 'code-basics'])).toBeTruthy();
});

test('object', async () => {
  const v = new Validator();
  const schema4 = v.object();
  schema4.shape({
    name: v.string().required(),
    age: v.number().positive(),
  });
  expect(await schema4.isValid({ name: 'kolya', age: 100 })).toBeTruthy();
  expect(await schema4.isValid({ name: 'maya', age: null })).toBeTruthy();
  expect(await schema4.isValid({ name: '', age: null })).toBeFalsy();
  expect(await schema4.isValid({ name: 'ada', age: -5 })).toBeFalsy();
});

test('addValidator', async () => {
  const v = new Validator();
  const fn1 = (value, start) => value.startsWith(start);
  v.addValidator('string', 'startWith', fn1);
  const schema5 = v.string().test('startWith', 'H');
  expect(await schema5.isValid('Hexlet')).toBeTruthy();
  expect(await schema5.isValid('exlet')).toBeFalsy();
  const fn2 = (value, min) => value >= min;
  v.addValidator('number', 'min', fn2);
  const schema6 = v.number().test('min', 5);
  expect(await schema6.isValid(6)).toBeTruthy();
  expect(await schema6.isValid(4)).toBeFalsy();
});
