import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import CustomDatePicker from 'components/CustomDatePicker';
import {
  abstractDeadlineArr,
  paperDeadlineArr,
  organizationDateArr,
} from './fields';
import { Subheader, RaisedButton } from 'material-ui';
import validate from './validate';
class Form extends Component {
  render() {
    const { handleSubmit, pristine } = this.props;
    return (
      <main>
        <form onSubmit={handleSubmit}>
          <section className="section-deadline">
            <Subheader className="subtitle">
              Abstract Submission Deadline
            </Subheader>
            <div className="d-flex flex-wrap justify-content-center">
              {abstractDeadlineArr.map((data, index) => {
                return (
                  <div
                    className="d-flex date deadline-input form-group"
                    key={index}
                  >
                    <label className="label-deadline">{data.label}:</label>
                    <div className="datePicker-wrapper">
                      <Field
                        // minDate={new Date()}
                        name={data.name}
                        component={CustomDatePicker}
                        format={null}
                        hintText={data.hintText}
                        textFieldStyle={{ width: '100%' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="section-deadline">
            <Subheader className="subtitle">
              Paper Submission Deadline
            </Subheader>
            <div className="d-flex flex-wrap justify-content-center">
              {paperDeadlineArr.map((data, index) => {
                return (
                  <div
                    className="d-flex date deadline-input form-group"
                    key={index}
                  >
                    <label className="label-deadline">{data.label}:</label>
                    <div className="datePicker-wrapper">
                      <Field
                        // minDate={new Date()}
                        name={data.name}
                        component={CustomDatePicker}
                        format={null}
                        hintText={data.hintText}
                        textFieldStyle={{ width: '100%' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="section-organization-date">
            <Subheader className="subtitle">Organization Date</Subheader>
            <div className="d-flex flex-wrap justify-content-center">
              {organizationDateArr.map((data, index) => {
                return (
                  <div
                    className="d-flex date deadline-input form-group"
                    key={index}
                  >
                    <label className="label-deadline">{data.label}:</label>
                    <div className="datePicker-wrapper">
                      <Field
                        // minDate={new Date()}
                        name={data.name}
                        component={CustomDatePicker}
                        format={null}
                        hintText={data.hintText}
                        textFieldStyle={{ width: '100%' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <div className="d-flex save-btn btn-group marginBottom">
            <RaisedButton
              primary={true}
              type="submit"
              label="Save"
              disabled={pristine}
            />
          </div>
        </form>
      </main>
    );
  }
}

export default reduxForm({
  form: 'Form',
  // validate,
})(Form);
