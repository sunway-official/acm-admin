import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Subheader } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import { normalizePhone, email, required } from './validate';

class Organizer extends Component {
  render() {
    return (
      <div>
        <Subheader className="header title">Organizer Information</Subheader>
        <div>
          <div className="d-flex form-group">
            <label>Name :</label>
            <Field
              name="organizerName"
              component={TextField}
              validate={required}
              hintText="Organizer Name"
              fullWidth={true}
            />
          </div>
          <div className="d-flex form-group">
            <label>Email :</label>
            <Field
              name="organizerEmail"
              component={TextField}
              validate={[required, email]}
              hintText="Organizer Email"
              fullWidth={true}
            />
          </div>
          <div className="d-flex form-group">
            <label>Website :</label>
            <Field
              name="organizerWebsite"
              component={TextField}
              validate={required}
              hintText="Organizer Website"
              fullWidth={true}
            />
          </div>
          <div className="d-flex form-group">
            <label>Phone Number :</label>
            <Field
              name="organizerPhoneNumber"
              component={TextField}
              validate={required}
              hintText="Organizer Phone Number"
              fullWidth={true}
              normalize={normalizePhone}
            />
          </div>
        </div>
      </div>
    );
  }
}

Organizer = reduxForm({
  form: 'conferenceInfo',
  required,
})(Organizer);

export default Organizer;
