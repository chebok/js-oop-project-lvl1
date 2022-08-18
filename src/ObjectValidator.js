export default class ObjectValidator {
  constructor() {
    this.rules = {};
  }

  async isValid(obj) {
    const promises = Object.entries(obj).map(([key, value]) => this.rules[key].isValid(value));
    const result = await Promise.all(promises);
    return !result.includes(false);
  }

  shape(objSchema) {
    this.rules = { ...this.rules, ...objSchema };
    return this;
  }
}
