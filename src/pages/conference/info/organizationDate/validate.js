const validate = (values, props) => {
  const errors = {};
  let arrayErrors = [];
  let checkError = 0;
  const requiredFields = [
    'abstractSubmissionDate',
    'actractReviewDate',
    'abstractFirstResultDate',
    'abstractReSubmissionDate',
    'abstractReReviewDate',
    'abstractFinalResult',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
      arrayErrors[checkError] = errors;
    }
    if (arrayErrors.length) {
      props.checkError(true);
    } else props.checkError(false);
  });
  // if (values.actractReviewDate <= values.abstractSubmissionDate) {
  //   errors.actractReviewDate =
  //     'End date of conference must be greater than start date';
  // }

  return errors;
};
export default validate;
