import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import CustomInput from 'components/CustomInput';
import { renderSelectField } from 'components/render';
import { MenuItem, RaisedButton, Subheader } from 'material-ui';
import { countryData } from '../paper/countryData';
import userTitles from '../inviteUser/userTitles';
import validate from './validate';
import normalizePhone from 'utils/normalizePhone';

class Form extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <section style={{ width: '100%' }}>
        <Subheader className="header subtitle" style={{ marginLeft: '60px' }}>
          Personal Details
        </Subheader>
        <form
          className="form conference-info"
          style={{ margin: '0 100px' }}
          onSubmit={handleSubmit}
        >
          <div className="d-flex form-group">
            <label>Firstname :</label>
            <Field
              name="firstname"
              component={CustomInput}
              fullWidth={true}
              hintText="Firstname"
            />
          </div>
          <div className="d-flex form-group">
            <label>Lastname :</label>
            <Field
              name="lastname"
              component={CustomInput}
              fullWidth={true}
              hintText="Lastname"
            />
          </div>
          <div className="d-flex form-group">
            <label>Title :</label>
            <Field
              name="title"
              hintText="User Title"
              component={renderSelectField}
              fullWidth={true}
            >
              {userTitles.map(title => {
                return (
                  <MenuItem
                    key={title.value}
                    value={title.value}
                    primaryText={title.primaryText}
                  />
                );
              })}
            </Field>
          </div>
          <div className="d-flex form-group">
            <label>Gender :</label>
            <Field
              name="gender"
              component={renderSelectField}
              hintText="Gender"
              fullWidth={true}
            >
              <MenuItem value="male" primaryText="Male" />
              <MenuItem value="female" primaryText="Female" />
              <MenuItem value="unknow" primaryText="Unknow" />
            </Field>
          </div>
          <div className="d-flex form-group">
            <label>Country :</label>
            <Field
              name="country"
              component={renderSelectField}
              fullWidth={true}
              hintText="Choose the country"
            >
              {countryData.map(country => {
                return (
                  <MenuItem
                    key={country.label}
                    value={country.label}
                    primaryText={country.label}
                  />
                );
              })}
            </Field>
          </div>
          <div className="d-flex form-group">
            <label>Phone Number :</label>
            <Field
              name="phone_number"
              component={CustomInput}
              fullWidth={true}
              hintText="Phone Number"
              normalize={normalizePhone}
            />
          </div>
          <div className="d-flex form-group">
            <label>Email :</label>
            <Field
              name="email"
              component={CustomInput}
              fullWidth={true}
              hintText="Email"
            />
          </div>
          <div className="d-flex save-btn btn-group marginBottom">
            <RaisedButton label="Sign up" primary={true} type="submit" />
          </div>
        </form>
      </section>
    );
  }
}

export default reduxForm({
  form: 'AuthorRegistrationForm',
  validate,
})(Form);
