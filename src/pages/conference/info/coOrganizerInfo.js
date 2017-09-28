import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { RaisedButton } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import { normalizePhone, email, required } from './validate';

const renderCoOrganizers = ({ fields, meta: { error, submitFailed } }) => (
  <div>
    {submitFailed && error && <span>{error}</span>}
    {fields.map((data, index) => (
      <div key={index}>
        <div className="d-flex group remove-btn">
          <span>Co-Organizer #{index + 1}</span>
          <RaisedButton label="Remove" onClick={() => fields.remove(index)} />
        </div>
        <div className="d-flex form-group">
          <label>Name :</label>
          <Field
            name={`${data}.coOrganizerName`}
            component={TextField}
            validate={required}
            hintText="Organizer Name"
            fullWidth={true}
          />
        </div>
        <div className="d-flex form-group">
          <label>Email :</label>
          <Field
            name={`${data}.coOrganizerEmail`}
            component={TextField}
            validate={[required, email]}
            hintText="Organizer Email"
            fullWidth={true}
          />
        </div>
        <div className="d-flex form-group">
          <label>Website :</label>
          <Field
            name={`${data}.coOrganizerWebsite`}
            component={TextField}
            validate={required}
            hintText="Organizer Website"
            fullWidth={true}
          />
        </div>
        <div className="d-flex form-group">
          <label>Phone Number :</label>
          <Field
            name={`${data}.coOrganizerPhoneNumber`}
            component={TextField}
            validate={required}
            hintText="Organizer Phone Number"
            fullWidth={true}
            normalize={normalizePhone}
          />
        </div>
      </div>
    ))}
    <div className="d-flex add-btn btn-group">
      <RaisedButton
        label="Add Co-Organizer "
        primary={true}
        onClick={() => fields.push({})}
        className="add-btn"
      />
    </div>
  </div>
);

class CoOrganizer extends Component {
  render() {
    return (
      <div>
        <FieldArray name="coOrganizers" component={renderCoOrganizers} />
      </div>
    );
  }
}

CoOrganizer = reduxForm({
  form: 'conferenceInfo',
})(CoOrganizer);

export default CoOrganizer;
