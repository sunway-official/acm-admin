import { regex } from '../../../../utils';

const validate = values => {
  const errors = {};
  const ArrayErrors = [];
  const requiredFields = [
    'coOrganizerName',
    'coOrganizerEmail',
    'coOrganizerWebsite',
    'coOrganizerPhone',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
      ArrayErrors[errors] = errors;
    }
  });

  if (
    values.coOrganizerEmail &&
    !regex.EMAIL_REGEX.test(values.coOrganizerEmail)
  ) {
    errors.coOrganizerEmail = 'Invalid email address';
    ArrayErrors[errors] = errors;
  }

  return errors;
};
export default validate;
