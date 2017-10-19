import { regex } from 'utils/';

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
    'coOrganizerName',
    'coOrganizerEmail',
    'coOrganizerWebsite',
    'coOrganizerPhone',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.organizerEmail && !regex.EMAIL_REGEX.test(values.organizerEmail)) {
    errors.organizerEmail = 'Invalid email address';
  }
  if (
    values.coOrganizerEmail &&
    !regex.EMAIL_REGEX.test(values.coOrganizerEmail)
  ) {
    errors.coOrganizerEmail = 'Invalid email address';
  }
  if (values.endDate < values.startDate) {
    alert('Wrong');
  }
  return errors;
};
export default validate;
