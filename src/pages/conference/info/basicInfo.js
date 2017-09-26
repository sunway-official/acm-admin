import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Subheader } from 'material-ui';
import { TextField, DatePicker } from 'redux-form-material-ui';
import { required } from './validate';

class BasicInfo extends Component {
  render() {
    const minDate = new Date();
    return (
      <div>
        <Subheader className="header title">Basic Information</Subheader>
        <div>
          <div className="d-flex form-group">
            <label>Title :</label>
            <Field
              name="title"
              component={TextField}
              validate={required}
              hintText="Conference Title"
              fullWidth={true}
            />
          </div>
          <div className="d-flex form-group">
            <label>Description :</label>
            <Field
              name="description"
              component={TextField}
              validate={required}
              hintText="Conference Description"
              multiLine
              rows={1}
              fullWidth={true}
            />
          </div>
          <div className="d-flex date">
            <div className="d-flex form-group">
              <label className="start">Conference Start From :</label>
              <Field
                name="startDate"
                component={DatePicker}
                validate={required}
                format={null}
                textFieldStyle={{ width: '100%' }}
                hintText="Start Date"
                autoOk={true}
                minDate={minDate}
              />
            </div>
            <div className="d-flex form-group">
              <label className="end">To :</label>
              <Field
                name="endtDate"
                component={DatePicker}
                validate={required}
                format={null}
                textFieldStyle={{ width: '100%' }}
                hintText="End Date"
                autoOk={true}
                minDate={minDate}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BasicInfo = reduxForm({
  form: 'conferenceInfo',
})(BasicInfo);

export default BasicInfo;
