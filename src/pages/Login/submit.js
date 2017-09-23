import { SubmissionError } from 'redux-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function submit(values) {
  return sleep(10).then(() => {
    // simulate server latency
    if (
      ![
        'john@gmail.com',
        'paul@gmail.com',
        'george@gmail.com',
        'ringo@gmail.com'].includes(values.username)
    ) {
      throw new SubmissionError({
        username: 'User does not exist',
      });
    } else if (values.password !== 'redux-form') {
      throw new SubmissionError({
        password: 'Wrong password',
      });
    } else {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    }
  });
}

export default submit;
