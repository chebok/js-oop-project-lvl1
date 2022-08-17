import * as yup from 'yup';

export default class ArrayValidator {
  constructor() {
    this.rules = [];
  }

  async isValid(arr) {
    const promises = this.rules.map((rule) => rule.isValid(arr));
    const result = await Promise.all(promises);
    return !result.includes(false);
  }

  required() {
    this.rules.push(yup.array());
    return this;
  }

  sizeof(number) {
    this.rules.push(yup.array().min(number));
    return this;
  }
}
