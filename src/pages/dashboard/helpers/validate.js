import { regex } from '../../../utils';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'title',
    'description',
    'startDate',
    'endDate',
    'organizerName',
    'organizerEmail',
    'organizerWebsite',
    'organizerAddress',
    'organizerPhoneNumber',
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
    'dl_registration',
  ];
  const arrDate = [
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
    'dl_registration',
    'startDate',
    'endDate',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  if (values.organizerEmail && !regex.EMAIL_REGEX.test(values.organizerEmail)) {
    errors.organizerEmail = 'Invalid email address';
  }

  for (var i = 0; i < arrDate.length; i++) {
    if (values[arrDate[i + 1]] <= values[arrDate[i]]) {
      errors[arrDate[i + 1]] = 'Invalid date';
    }
  }
  return errors;
};
export default validate;
