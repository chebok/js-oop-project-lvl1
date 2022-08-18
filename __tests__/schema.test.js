/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import Validator from '../src/Validator.js';

test('string', () => {
  const v = new Validator();
  const schema = v.string();
  expect(schema.isValid('')).toBeTruthy();
  expect(schema.isValid(null)).toBeTruthy();
  expect(schema.isValid(undefined)).toBeTruthy();
  schema.required();
  expect(schema.isValid('what does the fox say')).toBeTruthy();
  expect(schema.isValid('')).toBeFalsy();
  expect(schema.isValid(null)).toBeFalsy();
  expect(schema.contains('what').isValid('what does the fox say')).toBeTruthy();
  expect(schema.minLength(6).isValid('what')).toBeFalsy();
  expect(schema.contains('whatthe').isValid('what does the fox say')).toBeFalsy();
  expect(schema.isValid('what does the fox say')).toBeFalsy();
  expect(schema.isValid('whatthe')).toBeTruthy();
});

test('number', () => {
  const v = new Validator();
  const schema2 = v.number();
  expect(schema2.isValid(null)).toBeTruthy();
  schema2.required();
  expect(schema2.isValid(0)).toBeTruthy();
  expect(schema2.isValid(7)).toBeTruthy();
  expect(schema2.isValid(null)).toBeFalsy();
  schema2.positive();
  expect(schema2.isValid(-5)).toBeFalsy();
  schema2.range(-5, 5);
  expect(schema2.isValid(5)).toBeTruthy();
  expect(schema2.isValid(-3)).toBeFalsy();
});

test('array', () => {
  const v = new Validator();
  const schema3 = v.array();
  expect(schema3.isValid(null)).toBeTruthy();
  schema3.required();
  expect(schema3.isValid([])).toBeTruthy();
  expect(schema3.isValid(null)).toBeFalsy();
  schema3.sizeof(2);
  expect(schema3.isValid(['hexlet'])).toBeFalsy();
  expect(schema3.isValid(['hexlet', 'code-basics'])).toBeTruthy();
});

test('object', () => {
  const v = new Validator();
  const schema4 = v.object();
  schema4.shape({
    name: v.string().required(),
    age: v.number().positive(),
  });
  expect(schema4.isValid({ name: 'kolya', age: 100 })).toBeTruthy();
  expect(schema4.isValid({ name: 'maya', age: null })).toBeTruthy();
  expect(schema4.isValid({ name: '', age: null })).toBeFalsy();
  expect(schema4.isValid({ name: 'ada', age: -5 })).toBeFalsy();
});

test('addValidator', () => {
  const v = new Validator();
  const fn1 = (value, start) => value.startsWith(start);
  v.addValidator('string', 'startWith', fn1);
  const schema5 = v.string().test('startWith', 'H');
  expect(schema5.isValid('Hexlet')).toBeTruthy();
  expect(schema5.isValid('exlet')).toBeFalsy();
  const fn2 = (value, min) => value >= min;
  v.addValidator('number', 'min', fn2);
  const schema6 = v.number().test('min', 5);
  expect(schema6.isValid(6)).toBeTruthy();
  expect(schema6.isValid(4)).toBeFalsy();
});
