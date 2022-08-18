/* eslint-disable import/extensions */
import StringValidator from './StringValidator.js';
import NumberValidator from './NumberValidator.js';
import ArrayValidator from './ArrayValidator.js';
import ObjectValidator from './ObjectValidator.js';

class Validator {
  constructor() {
    this.stringValidator = new StringValidator();
    this.numberValidator = new NumberValidator();
    this.arrayValidator = new ArrayValidator();
    this.objectValidator = new ObjectValidator();
  }

  string() {
    return this.stringValidator;
  }

  number() {
    return this.numberValidator;
  }

  array() {
    return this.arrayValidator;
  }

  object() {
    return this.objectValidator;
  }

  addValidator(type, name, fn) {
    const validatorName = `${type}Validator`;
    this[validatorName][name] = fn;
  }
}
export default Validator;
