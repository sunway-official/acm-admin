import React from 'react';
import { Field } from 'redux-form';
import CustomDatePicker from 'components/CustomDatePicker';

class Fields extends React.Component {
  render() {
    return (
      <div className="d-flex date flex-wrap">
        <div className="d-flex form-group align-items-center">
          <label className="end">Submission Deadline :</label>
          <Field
            name="abstractSubmissionDate"
            component={CustomDatePicker}
            minDate={new Date()}
            format={null}
            textFieldStyle={{ width: '100%' }}
            hintText=" "
          />
        </div>
        <div className="d-flex form-group align-items-center">
          <label className="end">Review Deadline :</label>
          <Field
            name="actractReviewDate"
            component={CustomDatePicker}
            minDate={new Date()}
            format={null}
            textFieldStyle={{ width: '100%' }}
            hintText=" "
          />
        </div>

        <div className="d-flex form-group align-items-center">
          <label className="end">First Result :</label>
          <Field
            name="abstractFirstResultDate"
            component={CustomDatePicker}
            minDate={new Date()}
            format={null}
            textFieldStyle={{ width: '100%' }}
            hintText=" "
          />
        </div>
        <div className="d-flex form-group align-items-center">
          <label className="end">Re-Submission Deadline :</label>
          <Field
            name="abstractReSubmissionDate"
            component={CustomDatePicker}
            minDate={new Date()}
            format={null}
            textFieldStyle={{ width: '100%' }}
            hintText=" "
          />
        </div>
        <div className="d-flex form-group align-items-center">
          <label className="end">Re-Review Deadline :</label>
          <Field
            name="abstractReReviewDate"
            component={CustomDatePicker}
            minDate={new Date()}
            format={null}
            textFieldStyle={{ width: '100%' }}
            hintText=" "
          />
        </div>
        <div className="d-flex form-group align-items-center">
          <label className="end">Final Result :</label>
          <Field
            name="abstractFinalResult"
            component={CustomDatePicker}
            minDate={new Date()}
            format={null}
            textFieldStyle={{ width: '100%' }}
            hintText=" "
          />
        </div>
      </div>
    );
  }
}

export default Fields;
