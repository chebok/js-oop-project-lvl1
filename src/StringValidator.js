import * as yup from 'yup';

export default class StringValidator {
  constructor() {
    this.rules = [];
  }

  async isValid(str) {
    const promises = this.rules.map((rule) => rule.isValid(str));
    const result = await Promise.all(promises);
    return !result.includes(false);
  }

  required() {
    this.rules.push(yup.string().required());
    return this;
  }

  contains(data) {
    this.rules.push(yup.string().required().matches(data));
    return this;
  }

  minLength(number) {
    this.rules.push(yup.string().required().min(number));
    return this;
  }
}
