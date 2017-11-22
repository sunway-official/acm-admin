const validate = values => {
  const errors = {};
  const requiredFields = ['name', 'seats', 'status'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  return errors;
};
export default validate;
