const validate = values => {
  const errors = {};
  const requiredFields = [
    ' title',
    'description',
    'startDate',
    'endDate',
    'organizerName',
    'organizerEmail',
    'organizerWebsite',
    'organizerPhoneNumber',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.organizerEmail &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.organizerEmail)
  ) {
    errors.emaorganizerEmailil = 'Invalid email address';
  }
  return errors;
};

export default validate;
