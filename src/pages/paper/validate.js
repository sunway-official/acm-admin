const validate = values => {
  const errors = {};
  const requiredFields = ['title', 'abstract', 'topics'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });

  return errors;
};
export default validate;
