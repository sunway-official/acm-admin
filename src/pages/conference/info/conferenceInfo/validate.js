import { regex } from '../../../../utils';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'title',
    'description',
    'organizerName',
    'organizerEmail',
    'organizerWebsite',
    'organizerPhoneNumber',
    'organizerAddress',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });

  if (values.organizerEmail && !regex.EMAIL_REGEX.test(values.organizerEmail)) {
    errors.organizerEmail = 'Invalid email address';
  }
  return errors;
};
export default validate;
