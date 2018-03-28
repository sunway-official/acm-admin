const validate = (values, props) => {
  const errors = {};
  let arrayErrors = [],
    arrayKeys = [],
    arrayValues = [],
    checkError = 0,
    i = 0;
  const requiredFields = [
    'dl_submit_abstract',
    'dl_review_abstract',
    'dl_release_abstract',
    'dl_re_submit_abstract',
    'dl_re_review_abstract',
    'dl_release_final_abstract',
    'dl_submit_paper',
    'dl_review_paper',
    'dl_release_paper',
    'dl_re_submit_paper',
    'dl_re_review_paper',
    'dl_release_final_paper',
  ];
  console.log(props);
  arrayKeys = Object.keys(values);
  arrayValues = Object.values(values);
  requiredFields.forEach((field, index) => {
    if (!values[field]) {
      errors[field] = 'This field is required';
      arrayErrors[checkError] = errors;
    }
  });

  for (i; i < arrayKeys.length; i++) {
    if (arrayValues[i] >= arrayValues[i + 1]) {
      errors[arrayKeys[i + 1]] = 'Invalid date';
      arrayErrors[checkError] = errors;
    }
  }

  if (arrayErrors.length) {
    props.checkError(true);
  } else props.checkError(false);

  return errors;
};
export default validate;
