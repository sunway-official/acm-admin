import React, { Component } from 'react';
import CustomInput from 'components/CustomInput';
import { Subheader, RaisedButton, MenuItem } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import { renderSelectField } from 'components/render';
import { validate } from './helpers';
import userTitles from './userTitles';
class Form extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <section style={{ width: '70%' }}>
        <form className="form conference-info" onSubmit={handleSubmit}>
          <Subheader className="subtitle">
            Speaker/Reviewer Invitation
          </Subheader>
          <div style={{ padding: '30px' }}>
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
              <label>Email :</label>
              <Field
                name="email"
                component={CustomInput}
                hintText="User Email"
                fullWidth={true}
              />
            </div>
            <div className="d-flex form-group">
              <label>Firstname :</label>
              <Field
                name="firstname"
                component={CustomInput}
                hintText="User Firstname"
                fullWidth={true}
              />
            </div>
            <div className="d-flex form-group">
              <label>Lastname :</label>
              <Field
                name="lastname"
                component={CustomInput}
                hintText="User Lastname"
                fullWidth={true}
              />
            </div>
            <div className="d-flex form-group">
              <label>Role :</label>
              <Field
                name="role_id"
                component={renderSelectField}
                hintText="Role"
                fullWidth={true}
              >
                <MenuItem value={6} primaryText="Reviewer" />
                <MenuItem value={7} primaryText="Author" />
              </Field>
            </div>
          </div>
          <div className="d-flex save-btn btn-group marginBottom">
            <RaisedButton label="Submit" primary={true} type="submit" />
          </div>
        </form>
      </section>
    );
  }
}
export default reduxForm({
  form: 'Form',
  validate,
})(Form);
