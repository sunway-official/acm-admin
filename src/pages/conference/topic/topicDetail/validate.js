const validate = values => {
  const errors = {};
  const requiredFields = ['name', 'description', 'color_id'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  return errors;
};
export default validate;
