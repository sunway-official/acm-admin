import { regex } from '../../../../utils';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'title',
    'description',
    'startDate',
    'endDate',
    'organizerName',
    'organizerEmail',
    'organizerWebsite',
    'organizerPhoneNumber',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });

  if (values.organizerEmail && !regex.EMAIL_REGEX.test(values.organizerEmail)) {
    errors.organizerEmail = 'Invalid email address';
  }
  if (values.endDate <= values.startDate) {
    errors.endDate = 'End date of conference must be greater than start date';
  }
  return errors;
};
export default validate;
