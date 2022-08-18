import * as yup from 'yup';

export default class ArrayValidator {
  constructor() {
    this.rules = [];
  }

  isValid(arr) {
    return this.rules.every((rule) => rule.isValidSync(arr));
  }

  required() {
    this.rules.push(yup.array());
    return this;
  }

  sizeof(number) {
    this.rules.push(yup.array().min(number));
    return this;
  }

  test(fnName, ...params) {
    this.rules.push(yup.array().test((value) => this[fnName](value, ...params)));
    return this;
  }
}
