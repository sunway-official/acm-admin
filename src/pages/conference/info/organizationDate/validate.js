const validate = (values, props) => {
  const errors = {};
  let arrayErrors = [];
  let checkError = 0;
  const requiredFields = [
    'dl_submit_abstract',
    'dl_review_abstract',
    'dl_release_abstract',
    'dl_re_submit_abstract',
    'dl_re_review_abstract',
    'dl_release_final_abstract',
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
