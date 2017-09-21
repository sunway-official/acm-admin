import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import formValueSelector from 'redux-form';
import { RaisedButton, Subheader } from 'material-ui';
import { DatePicker, TextField } from 'redux-form-material-ui';
import { style } from './style.css';
import normalizePhone from './normalizePhone';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
class Index extends Component {
  // componentDidMount() {
  //   this.refs.topic // the Field
  //     .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
  //     .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
  //     .focus(); // on TextField
  // }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <div className="form">
            <Subheader className="header">
              <span className="title">Basic Information</span>
            </Subheader>
            <div>
              <Field
                name="topic"
                component={TextField}
                hintText="Conference Topic"
                floatingLabelText="Conference Topic"
                validate={required}
                // ref="topic"
                // withRef
                fullWidth={true}
              />
            </div>
            <div>
              <Field
                name="description"
                component={TextField}
                validate={required}
                hintText="Conference Description"
                floatingLabelText="Conference Description"
                multiLine
                rows={1}
                fullWidth={true}
              />
            </div>
            <div className="d-flex date">
              <Field
                name="startDate"
                component={DatePicker}
                format={null}
                hintText="Start Date Of Conference"
                validate={required}
                autoOk={true}
              />
              <Field
                name="endDate"
                component={DatePicker}
                format={null}
                hintText="End Date Of Conference"
                validate={required}
                autoOk={true}
              />
            </div>
            <div className="place">
              <div>Place is uses Map</div>
            </div>
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
              <div>Address is uses Map</div>
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
Index = reduxForm({
  form: 'conferenceInfo',
  initialValues: {
    topic: 'ABC',
  },
})(Index);

export default Index;
