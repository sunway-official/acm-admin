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

  return errors;
};
export default validate;
