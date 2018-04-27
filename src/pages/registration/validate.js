import { regex } from '../../utils';
const validate = values => {
  const errors = {};
  const requiredFields = [
    'firstname',
    'lastname',
    'title',
    'gender',
    'country',
    'phone_number',
    'email',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  if (values.email && !regex.EMAIL_REGEX.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};
export default validate;
