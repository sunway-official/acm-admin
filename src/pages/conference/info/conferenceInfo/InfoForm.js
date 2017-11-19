import React from 'react';

import { reduxForm, Field } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';

import CustomInput from 'components/CustomInput';
import CustomDatePicker from 'components/CustomDatePicker';
import AppMap from 'components/AppMap';
import normalizePhone from 'utils/normalizePhone';
import validate from '../validate';

const InfoForm = ({
  onSubmit,
  handleSubmit,
  submitting,
  pristine,
  invalid,
  initialValues,
  onMapPositionChanged,
}) => {
  return (
    <form className="form conference-info" onSubmit={handleSubmit}>
      <div>
        <div>
          <div>
            <Subheader className="header title">Basic Information</Subheader>
            <AppMap
              onMapPositionChanged={onMapPositionChanged}
              initalPosition={{
                lat: initialValues.lat,
                long: initialValues.long,
              }}
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDFNlwjsuntl-BmMpDKJPOiUvwxhAEyMEI"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={
                <div
                  style={{
                    height: `100%`,
                    marginLeft: '-50%',
                    marginRight: '-50%',
                  }}
                />
              }
            />
            <div>
              <div className="d-flex form-group">
                <label>Title :</label>
                <Field
                  name="title"
                  component={CustomInput}
                  fullWidth={true}
                  hintText="Conference Title"
                />
              </div>
              <div className="d-flex form-group">
                <label>Description :</label>
                <Field
                  name="description"
                  component={CustomInput}
                  multiLine
                  rows={1}
                  fullWidth={true}
                />
              </div>
              <div className="d-flex date">
                <div className="d-flex form-group">
                  <label className="start">Start From :</label>
                  <Field
                    minDate={new Date()}
                    name="startDate"
                    component={CustomDatePicker}
                    format={null}
                    textFieldStyle={{ width: '100%' }}
                    hintText="Start Date"
                  />
                </div>
                <div className="d-flex form-group">
                  <label className="end">To :</label>
                  <Field
                    name="endDate"
                    component={CustomDatePicker}
                    minDate={new Date()}
                    format={null}
                    textFieldStyle={{ width: '100%' }}
                    hintText="End Date"
                  />
                </div>
              </div>
            </div>
            <div>
              <Subheader className="header title">
                Organizer Information
              </Subheader>
              <div>
                <div className="d-flex form-group">
                  <label>Name :</label>
                  <Field
                    name="organizerName"
                    component={CustomInput}
                    hintText="Organizer Name"
                    fullWidth={true}
                  />
                </div>
                <div className="d-flex form-group">
                  <label>Email :</label>
                  <Field
                    name="organizerEmail"
                    component={CustomInput}
                    hintText="Organizer Email"
                    fullWidth={true}
                  />
                </div>
                <div className="d-flex form-group">
                  <label>Website :</label>
                  <Field
                    name="organizerWebsite"
                    component={CustomInput}
                    hintText="Organizer Website"
                    fullWidth={true}
                  />
                </div>
                <div className="d-flex form-group">
                  <label>Phone Number :</label>
                  <Field
                    name="organizerPhoneNumber"
                    component={CustomInput}
                    hintText="Organizer Phone Number"
                    fullWidth={true}
                    normalize={normalizePhone}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex save-btn btn-group">
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
};

export default reduxForm({
  form: 'ConferenceInfoForm',
  validate,
})(InfoForm);
