const validate = values => {
  const errors = {};
  const requiredFields = [
    'email',
    'firstname',
    'lastname',
    'facebook_id',
    'twitter_id',
    'linkedin_id',
    'gender',
    'bio',
    'dob',
    'position',
    'organization',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  return errors;
};
export default validate;
