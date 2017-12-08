import { regex } from '../../../utils';
const validate = values => {
  const errors = {};
  const requiredFields = [
    'firstname',
    'lastname',
    'email',
    'password',
    'confirmPassword',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required!';
    }
  });
  if (values.email && !regex.EMAIL_REGEX.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword = 'Password does not match!';
  }
  if (values.password && !regex.passwordRegex.test(values.password)) {
    errors.password =
      'Password must contains at least 6 character include number, capital and special character ';
  }
  return errors;
};
export default validate;
