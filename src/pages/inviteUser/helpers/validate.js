import { regex } from '../../../utils';

const validate = values => {
  const errors = {};
  const ArrayErrors = [];
  const requiredFields = ['title', 'email', 'firstname', 'lastname', 'role_id'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
      ArrayErrors[errors] = errors;
    }
  });

  if (values.email && !regex.EMAIL_REGEX.test(values.email)) {
    errors.email = 'Invalid email address';
    ArrayErrors[errors] = errors;
  }

  return errors;
};
export default validate;
