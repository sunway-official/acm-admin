import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Subheader, RaisedButton } from 'material-ui';
import CustomInput from 'components/CustomInput';
import CustomDatePicker from 'components/CustomDatePicker';
import AppMap from 'components/AppMap';
import normalizePhone from 'utils/normalizePhone';
import validate from '../helpers/validate';

const AddConferenceForm = ({
  handleSubmit,
  invalid,
  onMapPositionChanged,
  handleSwitch,
  reset,
  submitting,
  pristine,
}) => (
  <form className="form conference-info " onSubmit={handleSubmit}>
    <div>
      <div>
        <div className="form-body">
          <Subheader className="header title organizer-inf">
            Conference Information
          </Subheader>
          <div className="map">
            <AppMap
              onMapPositionChanged={onMapPositionChanged}
              initalPosition={{
                lat: 16.0598934,
                long: 108.2076032,
              }}
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAhGSgJvoGdeOzzDDDyTxWyQj7YRA2lZiA"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={
                <div
                  style={{
                    height: `100%`,
                    marginLeft: '0%',
                    marginRight: '-24%',
                  }}
                />
              }
            />
          </div>
          <div>
            <div className="d-flex form-group title-information">
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
                hintText="Conference Description"
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
                  textFieldStyle={{ width: '100%', marginLeft: -46 }}
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
            <Subheader className="header title organizer-inf">
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
                <label>Address :</label>
                <Field
                  name="organizerAddress"
                  component={CustomInput}
                  hintText="Organizer Address"
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
        <div
          className="d-flex submit-btn btn-group"
          style={{ paddingBottom: '20px' }}
        >
          <RaisedButton
            className="btn"
            label="Save"
            primary={true}
            type="submit"
            // disabled={pristine || submitting}
          />
          <RaisedButton
            className="btn"
            label="Reset"
            secondary={true}
            type="reset"
            disabled={pristine || submitting}
            onClick={reset}
          />
        </div>
      </div>
    </div>
  </form>
);

export default reduxForm({
  form: 'AddconferenceForm',
  validate,
})(AddConferenceForm);
