/* eslint-disable import/extensions */
import * as yup from 'yup';
import StringValidator from './StringValidator.js';
import NumberValidator from './NumberValidator.js';

class Validator {
  string() {
    return new StringValidator();
  }

  number() {
    return new NumberValidator();
  }
}
export default Validator;
