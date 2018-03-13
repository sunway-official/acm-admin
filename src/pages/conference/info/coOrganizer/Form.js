import React, { Component } from 'react';
import { RaisedButton, Subheader } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import CustomInput from 'components/CustomInput';
import normalizePhone from 'utils/normalizePhone';
import validate from './validate';
import { Link } from 'react-router-dom';
class CoOrganizerForm extends Component {
  render() {
    const { onSubmit, handleSubmit, pristine } = this.props;
    return (
      <div>
        <form
          className="form conference-info"
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: '800px' }}
        >
          <Subheader className="subheader subtitle">
            CoOrganizer Information
          </Subheader>

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
          <div className="d-flex save-btn btn-group marginBottom">
            <RaisedButton
              label="Save"
              primary={true}
              type="submit"
              disabled={pristine}
            />
            <RaisedButton
              className="marginLeft"
              label="Cancel"
              containerElement={<Link to="/conference/info" />}
            />
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
