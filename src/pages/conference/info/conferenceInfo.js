import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { RaisedButton } from 'material-ui';
import { style } from './style.css';
import CoOrganizer from './coOrganizerInfo';
import Organizer from './organizerInfo';
import BasicInfo from './basicInfo';
class Info extends Component {
  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        <div>
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <div>
            <BasicInfo />
            <Organizer />
            <CoOrganizer />
            <div className="d-flex save-btn btn-group">
              <RaisedButton
                label="Save"
                primary={true}
                type="submit"
                disabled={pristine || submitting}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
const minDate = new Date();

Info = reduxForm({
  form: 'conferenceInfo',
  initialValues: {
    title: '12321',
    description: '123',
    startDate: minDate,
    organizerName: 'Duy Tan University',
    organizerEmail: 'duytan@gmail.com',
    organizerWebsite: 'mydtu.com',
    organizerPhoneNumber: '123-123-1233',
  },
})(Info);

export default Info;
