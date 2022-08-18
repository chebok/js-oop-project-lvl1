import * as yup from 'yup';

export default class StringValidator {
  constructor() {
    this.rules = [];
  }

  isValid(str) {
    return this.rules.every((rule) => rule.isValidSync(str));
  }

  required() {
    this.rules.push(yup.string().required());
    return this;
  }

  contains(data) {
    this.rules.push(yup.string().nullable().matches(data));
    return this;
  }

  minLength(number) {
    this.rules.push(yup.string().nullable().min(number));
    return this;
  }

  test(fnName, ...params) {
    this.rules.push(yup.string().test({
      name: 'startWith',
      test: (value) => this[fnName](value, ...params),
    }));
    return this;
  }
}
