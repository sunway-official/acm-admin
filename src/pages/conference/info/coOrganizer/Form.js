import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import CustomInput from 'components/CustomInput';
import normalizePhone from 'utils/normalizePhone';
import validate from './validate';
class CoOrganizerForm extends Component {
  render() {
    const { onSubmit, handleSubmit } = this.props;
    return (
      <div>
        <form
          className="form conference-info"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="d-flex form-group">
              <label>Name :</label>
              <Field
                name="coOrganizerName"
                component={CustomInput}
                hintText="Co-Organizer Name"
                fullWidth={true}
              />
            </div>
            <div className="d-flex form-group">
              <label>Email :</label>
              <Field
                name="coOrganizerEmail"
                component={CustomInput}
                hintText="Co-Organizer Email"
                fullWidth={true}
              />
            </div>
            <div className="d-flex form-group">
              <label>Website :</label>
              <Field
                name="coOrganizerWebsite"
                component={CustomInput}
                hintText="Co-Organizer Website"
                fullWidth={true}
              />
            </div>
            <div className="d-flex form-group">
              <label>Phone Number :</label>
              <Field
                name="coOrganizerPhone"
                component={CustomInput}
                hintText="Co-Organizer Phone Number"
                fullWidth={true}
                normalize={normalizePhone}
              />
            </div>
          </div>
          <div className="d-flex save-btn btn-group">
            <RaisedButton label="Save" primary={true} type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'CoOrganizerForm',
  validate,
})(CoOrganizerForm);
