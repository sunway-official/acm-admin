import React, { Component } from 'react';
import { TextField, ListItem } from 'material-ui';
import {
  NotificationWc,
  ActionPermIdentity,
  SocialCake,
  CommunicationMailOutline,
  ActionWork,
} from 'material-ui/svg-icons';
import { Field, reduxForm } from 'redux-form';
import CustomInput from 'components/CustomInput';
import GetRoles from './getRoles';
class PersonalInfo extends Component {
  render() {
    console.log(this.props.initialValues.role);
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form
        className="form conference-info view-form"
        style={{ paddingTop: '30px' }}
      >
        <div>
          <div className="d-flex form-group">
            <ListItem
              className="title-group"
              primaryText="Name:"
              leftIcon={<ActionPermIdentity />}
              disabled={true}
            />
            <Field
              name="firstname"
              component={CustomInput}
              underlineShow={false}
              disabled={true}
            />
          </div>
          {/*Chua connect data cho position*/}
          <div className="d-flex form-group">
            <ListItem
              className="title-group"
              primaryText="Position:"
              leftIcon={<ActionWork />}
              disabled={true}
            />
            <TextField
              name="role"
              underlineShow={false}
              disabled={true}
              hintText={'' + this.props.initialValues.role}
            />
          </div>
          <div className="d-flex form-group">
            <ListItem
              className="title-group"
              primaryText="Email:"
              leftIcon={<CommunicationMailOutline />}
              disabled={true}
            />
            <Field
              name="email"
              underlineShow={false}
              disabled={true}
              component={CustomInput}
            />
          </div>
          <div className="d-flex form-group">
            <ListItem
              className="title-group"
              primaryText="Date of birth:"
              leftIcon={<SocialCake />}
              disabled={true}
            />
            <Field
              name="dob"
              component={CustomInput}
              underlineShow={false}
              disabled={true}
            />
          </div>
          <div className="d-flex form-group">
            <ListItem
              className="title-group"
              primaryText="Gender:"
              leftIcon={<NotificationWc />}
              disabled={true}
            />
            <Field
              name="gender"
              underlineShow={false}
              component={CustomInput}
              disabled={true}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'PersonalInfo',
})(PersonalInfo);
