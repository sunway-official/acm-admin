import { regex } from '../../../utils';

const validate = values => {
  const ArrayErrors = [];
  const errors = {};
  const requiredFields = [
    'title',
    'description',
    'startDate',
    'endDate',
    'organizerName',
    'organizerEmail',
    'organizerAddress',
    'organizerWebsite',
    'organizerPhoneNumber',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
      ArrayErrors[0] = errors;
    }
  });

  if (values.organizerEmail && !regex.EMAIL_REGEX.test(values.organizerEmail)) {
    errors.organizerEmail = 'Invalid email address';
    ArrayErrors[0] = errors;
  }
  if (values.endDate < values.startDate) {
    errors.endDate = 'End date of conference must be greater than start date';
    ArrayErrors[0] = errors;
  }
  return errors;
};
export default validate;
