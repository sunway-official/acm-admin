import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import formValueSelector from 'redux-form';
import { RaisedButton, Subheader } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import { style } from './style.css';
import normalizePhone from './normalizePhone';
import { images } from '../../../theme';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
class OrganizerInfo extends Component {
  // componentDidMount() {
  //   this.refs.topic // the Field
  //     .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
  //     .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
  //     .focus(); // on TextField
  // }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <div className="form">
            <Subheader className="header">
              <span className="title">Organizer Information</span>
            </Subheader>
            <div>
              <Field
                name="organizerName"
                component={TextField}
                hintText="Organize Name"
                floatingLabelText="Organize Name"
                validate={required}
                fullWidth={true}
              />
            </div>
            <div>
              <Field
                name="organizerWebsite"
                component={TextField}
                hintText="Organizer Website"
                floatingLabelText="Organizer Website"
                validate={required}
                fullWidth={true}
              />
            </div>
            <div>
              <Field
                name="organizerPhoneNumber"
                component={TextField}
                hintText="Organizer Phone Number"
                floatingLabelText="Organizer Phone Number"
                validate={required}
                fullWidth={true}
                normalize={normalizePhone}
              />
            </div>
            <div>
              <img
                style={{ width: '100%' }}
                src={images.mapTemplate}
                alt="map"
              />
            </div>
            <div className="d-flex btn-group">
              <RaisedButton
                label="Save"
                primary={true}
                type="submit"
                disabled={submitting}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
// const selector = formValueSelector('conferenceInfo');
OrganizerInfo = reduxForm({
  form: 'conferenceInfo',
  initialValues: {
    topic: 'ABC',
  },
})(OrganizerInfo);

export default OrganizerInfo;
