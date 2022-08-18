export default class ObjectValidator {
  constructor() {
    this.rules = {};
  }

  isValid(obj) {
    if (!obj) {
      return false;
    }
    return Object.entries(obj).every(([key, value]) => this.rules[key].isValid(value));
  }

  shape(objSchema) {
    this.rules = { ...this.rules, ...objSchema };
    return this;
  }
}
