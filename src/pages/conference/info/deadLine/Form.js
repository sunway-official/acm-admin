import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import CustomDatePicker from 'components/CustomDatePicker';
const arrDeadlines = [
  {
    label: 'Submit Deadline',
    name: 'dl_submit_abstract',
    hintText: '1',
  },
  {
    label: 'Review Deadline',
    name: 'dl_review_abstract',
    hintText: '2',
  },
  {
    label: 'Release Result',
    name: 'dl_release_abstract',
    hintText: '3',
  },
  {
    label: 'Re-Submit Deadline',
    name: 'dl_re_submit_abstract',
    hintText: '4',
  },
  {
    label: 'Re-Review Deadline',
    name: 'dl_re_review_abstract',
    hintText: '5',
  },
  {
    label: 'Release Final Result',
    name: 'dl_release_final_abstract',
    hintText: '6',
  },
];
class Form extends Component {
  render() {
    const { handleSubmit, initialValues } = this.props;
    return (
      <section className="container">
        <form>
          {arrDeadlines.map((data, index) => {
            return (
              <div className="d-flex date form-group" key={index}>
                <label className={data.name}>{data.label}:</label>
                <Field
                  minDate={new Date()}
                  name={data.name}
                  component={CustomDatePicker}
                  format={null}
                  hintText={data.hintText}
                />
              </div>
            );
          })}
        </form>
      </section>
    );
  }
}

export default reduxForm({
  form: 'Form',
})(Form);
