const validate = values => {
  const errors = {};
  const requiredFields = [
    'title',
    'abstract',
    'keywords',
    'topic',
    'file',
    'street',
    'city',
    'country',
    'zipcode',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });

  if (isNaN(Number(values.zipcode))) {
    errors.zipcode = 'Zipcode is a number';
  }

  let keywordsArr = [];
  let abstractArr = [];
  let titleArr = [];
  if (values.keywords !== undefined) {
    keywordsArr = values.keywords.split(',');
    if (keywordsArr.length < 3 || keywordsArr.length > 5) {
      errors.keywords =
        'Keywords must be longer than 3 words and shorter than 5 words, separated by semicolons';
    }
  }
  if (values.title !== undefined) {
    abstractArr = values.title.split(' ');
    if (abstractArr.length > 15) {
      errors.title = 'Title must be shorter than 15 words';
    }
  }

  if (values.abstract !== undefined) {
    titleArr = values.abstract.split(' ');
    if (titleArr.length > 150) {
      errors.abstract = 'Abstract must be shorter than 150 words';
    }
  }

  return errors;
};
export default validate;
