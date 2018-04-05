import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Subheader, RaisedButton } from 'material-ui';
import CustomInput from 'components/CustomInput';
import CustomDatePicker from 'components/CustomDatePicker';
import AppMap from 'components/AppMap';
import normalizePhone from 'utils/normalizePhone';
import validate from '../helpers/validate';
import { alertOptions } from 'theme/alert';
import AlertContainer from 'react-alert';
import {
  abstractDeadlineArr,
  paperDeadlineArr,
} from '../../conference/info/deadLine/fields';
class AddConferenceForm extends React.Component {
  render() {
    const {
      handleSubmit,
      onMapPositionChanged,
      pristine,
      reset,
      submitting,
    } = this.props;
    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        <section className="section-conference-info">
          <Subheader className="header subtitle">Basic Information</Subheader>
          <div className="section-content">
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
                rowsMax={3}
                fullWidth={true}
                hintText="Conference Description"
              />
            </div>
          </div>
        </section>
        <section className="section-deadline">
          <Subheader className="subtitle">
            Absrtact Submission Deadline
          </Subheader>
          <div className="d-flex flex-wrap justify-content-center">
            {abstractDeadlineArr.map((data, index) => {
              return (
                <div
                  className="d-flex date deadline-input form-group"
                  key={index}
                >
                  <label>{data.label}:</label>
                  <Field
                    minDate={new Date()}
                    name={data.name}
                    component={CustomDatePicker}
                    format={null}
                    hintText={data.hintText}
                    textFieldStyle={{ width: '80%' }}
                  />
                </div>
              );
            })}
          </div>
        </section>
        <section className="section-deadline">
          <Subheader className="subtitle">Paper Submission Deadline</Subheader>
          <div className="d-flex flex-wrap justify-content-center">
            {paperDeadlineArr.map((data, index) => {
              return (
                <div
                  className="d-flex date deadline-input form-group"
                  key={index}
                >
                  <label className="label-deadline">{data.label}:</label>
                  <Field
                    minDate={new Date()}
                    name={data.name}
                    component={CustomDatePicker}
                    format={null}
                    hintText={data.hintText}
                    textFieldStyle={{ width: '80%' }}
                  />
                </div>
              );
            })}
          </div>
        </section>
        <section className="section-organization-date">
          <Subheader className="subtitle">Organization Date</Subheader>
          <div className="section-content d-flex justify-content-center">
            <div className="d-flex form-group">
              <label>Registration Date:</label>
              <Field
                name="dl_registration"
                component={CustomDatePicker}
                minDate={new Date()}
                format={null}
                textFieldStyle={{ width: '100%' }}
                hintText="Registration Date"
              />
            </div>
            <div className="d-flex form-group">
              <label>Conference Start Date :</label>
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
              <label>Conference End Date :</label>
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
        </section>
        <div className="map add">
          <AppMap
            onMapPositionChanged={onMapPositionChanged}
            initalPosition={{
              lat: 16.0598934,
              long: 108.2076032,
            }}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAhGSgJvoGdeOzzDDDyTxWyQj7YRA2lZiA"
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '550px' }} />}
            mapElement={
              <div
                style={{
                  height: '100%',
                  marginLeft: '0%',
                }}
              />
            }
          />
        </div>
        <section className="section-organizer">
          <Subheader className="header subtitle">
            Organizer Information
          </Subheader>
          <div className="section-content">
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
        </section>
        <div className="d-flex save-btn btn-group marginBottom">
          <RaisedButton
            label="Save"
            primary={true}
            type="submit"
            disabled={pristine}
          />
          <RaisedButton
            className="btn"
            label="Reset"
            secondary={true}
            type="reset"
            disabled={submitting}
            onClick={reset}
          />
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </form>
    );
  }
}

export default reduxForm({
  form: 'AddconferenceForm',
  validate,
})(AddConferenceForm);
