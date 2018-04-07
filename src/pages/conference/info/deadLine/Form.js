import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import CustomDatePicker from 'components/CustomDatePicker';
import { abstractDeadlineArr, paperDeadlineArr } from './fields';
import { Subheader, RaisedButton } from 'material-ui';
import validate from './validate';
class Form extends Component {
  render() {
    const { handleSubmit, pristine } = this.props;
    return (
      <main className="container-form">
        <form onSubmit={handleSubmit}>
          <section className="section-deadline">
            <Subheader className="subtitle">
              Absrtact Submission Deadline
            </Subheader>
            <div className="d-flex flex-wrap justify-content-center">
              {abstractDeadlineArr.map((data, index) => {
                return (
                  <div
                    className="d-flex date deadline-input form-group"
                    key={index}
                  >
                    <label className="label-deadline">{data.label}:</label>
                    <Field
                      minDate={new Date()}
                      name={data.name}
                      component={CustomDatePicker}
                      format={null}
                      hintText={data.hintText}
                      textFieldStyle={{ width: '80%' }}
                    />
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
                    <Field
                      minDate={new Date()}
                      name={data.name}
                      component={CustomDatePicker}
                      format={null}
                      hintText={data.hintText}
                      textFieldStyle={{ width: '80%' }}
                    />
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
  validate,
})(Form);
