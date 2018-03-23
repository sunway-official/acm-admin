import React from 'react';
import { Field } from 'redux-form';
import CustomDatePicker from 'components/CustomDatePicker';
const abstractsArray = [
  {
    label: 'Submission Deadline :',
    name: 'dl_submit_abstract',
  },
  {
    label: 'Review Deadline :',
    name: 'dl_review_abstract',
  },
  {
    label: 'Release First Result :',
    name: 'dl_release_abstract',
  },
  {
    label: 'Re-Submission Deadline :',
    name: 'dl_re_submit_abstract',
  },
  {
    label: 'Re-Review Deadline :',
    name: 'dl_re_review_abstract',
  },
  {
    label: 'Release Final Result :',
    name: 'dl_release_final_abstract',
  },
];
const papersArray = [
  {
    label: 'Submission Deadline :',
    name: 'dl_submit_paper',
  },
  {
    label: 'Review Deadline :',
    name: 'dl_review_paper',
  },
  {
    label: 'Release First Result :',
    name: 'dl_release_paper',
  },
  {
    label: 'Re-Submission Deadline :',
    name: 'dl_re_submit_paper',
  },
  {
    label: 'Re-Review Deadline :',
    name: 'dl_re_review_paper',
  },
  {
    label: 'Release Final Result :',
    name: 'dl_release_final_paper',
  },
];
class Fields extends React.Component {
  render() {
    const { stepIndex } = this.props;
    if (stepIndex === 0) {
      return (
        <div className="d-flex date flex-wrap">
          {abstractsArray.map((data, index) => {
            return (
              <div key={index} className="d-flex form-group align-items-center">
                <label className="end">{data.label}</label>
                <Field
                  name={data.name}
                  component={CustomDatePicker}
                  minDate={new Date()}
                  format={null}
                  textFieldStyle={{ width: '100%' }}
                  hintText=" "
                />
              </div>
            );
          })}
        </div>
      );
    }
    if (stepIndex === 1) {
      return (
        <div className="d-flex date flex-wrap">
          {papersArray.map((data, index) => {
            return (
              <div key={index} className="d-flex form-group align-items-center">
                <label className="end">{data.label}</label>
                <Field
                  name={data.name}
                  component={CustomDatePicker}
                  minDate={new Date()}
                  format={null}
                  textFieldStyle={{ width: '100%' }}
                  hintText=" "
                />
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default Fields;
