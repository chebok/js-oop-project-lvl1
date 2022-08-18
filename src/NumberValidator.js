import * as yup from 'yup';

export default class NumberValidator {
  constructor() {
    this.rules = [];
  }

  async isValid(number) {
    const promises = this.rules.map((rule) => rule.isValid(number));
    const result = await Promise.all(promises);
    return !result.includes(false);
  }

  required() {
    this.rules.push(yup.number().required());
    return this;
  }

  positive() {
    this.rules.push(yup.number().nullable().positive());
    return this;
  }

  range(num1, num2) {
    this.rules.push(yup.number().nullable().min(num1).max(num2));
    return this;
  }

  test(fnName, ...params) {
    this.rules.push(yup.number().test((value) => this[fnName](value, ...params)));
    return this;
  }
}
