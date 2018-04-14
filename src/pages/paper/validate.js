const validate = values => {
  const errors = {};
  const requiredFields = [
    'title',
    'abstract',
    'keywords',
    'topic',
    'file',
    'street',
    'city',
    'country',
    'zipcode',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });

  if (isNaN(Number(values.zipcode))) {
    errors.zipcode = 'Zipcode is a number';
  }

  return errors;
};
export default validate;
