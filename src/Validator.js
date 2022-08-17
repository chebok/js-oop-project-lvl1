/* eslint-disable import/extensions */
import * as yup from 'yup';
import StringValidator from './StringValidator.js';
import NumberValidator from './NumberValidator.js';
import ArrayValidator from './ArrayValidator.js';

class Validator {
  string() {
    return new StringValidator();
  }

  number() {
    return new NumberValidator();
  }

  array() {
    return new ArrayValidator();
  }
}
export default Validator;
