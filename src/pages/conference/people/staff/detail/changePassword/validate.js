import { regex } from '../../../../../../utils';
const validate = values => {
  const errors = {};
  const requiredFields = ['oldPassword', 'newPassword', 'retypePassword'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
    if (values[field] && !regex.passwordRegex.test(values[field])) {
      errors[field] =
        'Password must contains at least 6 character include number and special character';
    }
  });
  if (
    values.newPassword &&
    values.retypePassword &&
    values.newPassword !== values.retypePassword
  ) {
    errors.retypePassword = 'Password does not match!';
  }
  return errors;
};

export default validate;
