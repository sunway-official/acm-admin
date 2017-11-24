import { regex } from '../../../utils';
const validate = values => {
  const errors = {};
  const requiredFields = [
    'slogan',
    'register_description',
    'call_paper_description',
    'speaker_description',
    'email',
    'facebook_id',
    'twitter_id',
    'linkedin_id',
    'phone_number',
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
