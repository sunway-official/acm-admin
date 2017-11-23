const validate = values => {
  const errors = {};
  const requiredFields = ['name', 'seats', 'status'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  if (Number(values.seats) < 18) {
    errors.seats = 'Sorry, Room seat must > 0';
  }
  return errors;
};
export default validate;
