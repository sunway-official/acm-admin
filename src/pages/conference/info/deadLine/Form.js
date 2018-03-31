import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import CustomDatePicker from 'components/CustomDatePicker';
import { abstractDeadlineArr, paperDeadlineArr } from './fields';
import { Subheader, RaisedButton } from 'material-ui';
class Form extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <main className="container-form">
        <section className="section-deadline">
          <form onSubmit={handleSubmit}>
            <Subheader className="deadline-subheader">
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
          </form>
        </section>
        <section className="section-deadline">
          <form onSubmit={handleSubmit}>
            <Subheader className="deadline-subheader">
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
          </form>
        </section>
        <div className="d-flex save-btn btn-group marginBottom">
          <RaisedButton primary={true} type="submit" label="Save" />
        </div>
      </main>
    );
  }
}

export default reduxForm({
  form: 'Form',
})(Form);
