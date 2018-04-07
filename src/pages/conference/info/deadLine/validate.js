const validate = values => {
  const errors = {};
  let arrayValues = [],
    arrayKeys = [];
  var i = 0;

  arrayKeys = Object.keys(values);
  arrayValues = Object.values(values);
  arrayKeys.map(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }

    return {};
  });
  for (i; i < arrayKeys.length; i++) {
    if (arrayValues[i] >= arrayValues[i + 1]) {
      errors[arrayKeys[i + 1]] = 'Invalid date';
    }
  }

  return errors;
};
export default validate;
