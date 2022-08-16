import * as yup from 'yup';

class Validator {
  string() {
    const obj = {
      innerSchema: null,
      isValid: (str) => {
        if (!obj.innerSchema) {
          return true;
        }
        const result = obj.innerSchema.isValid(str);
        return result;
      },
      required() {
        obj.innerSchema = yup.string().required();
      },
      contains(data) {
        obj.innerSchema = obj.innerSchema.matches(data);
        return obj.innerSchema;
      },
    };
    return obj;
  }
}
export default Validator;
