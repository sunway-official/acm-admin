import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Subheader } from 'material-ui';
import CustomInput from 'components/CustomInput';
import AppMap from 'components/AppMap';
import CustomDatePicker from 'components/CustomDatePicker';

class ConferenceInfoForm extends React.Component {
  render() {
    const { initialValues } = this.props;
    return (
      <form className="form conference-info">
        <div className="form-body d-flex justify-content-space-between">
          <section className="map">
            <Subheader className="header subtitle">
              Organization Place
            </Subheader>
            <AppMap
              disabled={true}
              initalPosition={{
                lat: initialValues.lat,
                long: initialValues.long,
              }}
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAhGSgJvoGdeOzzDDDyTxWyQj7YRA2lZiA"
              loadingElement={<div style={{ height: '100%' }} />}
              containerElement={<div style={{ height: '86%' }} />}
              mapElement={
                <div
                  style={{
                    height: '100%',
                    marginLeft: '0%',
                  }}
                />
              }
            />
          </section>
          <div style={{ width: '46%' }}>
            <section>
              <Subheader className="header subtitle">
                Basic Information
              </Subheader>
              <div className="d-flex form-group">
                <label>Title :</label>
                <Field
                  name="title"
                  component={CustomInput}
                  fullWidth={true}
                  hintText="Conference Title"
                  disabled={true}
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
                  disabled={true}
                />
              </div>
              <div className="d-flex form-group">
                <label>Category :</label>
                <Field
                  name="category_name"
                  component={CustomInput}
                  fullWidth={true}
                  disabled={true}
                />
              </div>
              <div className="d-flex date">
                <div className="d-flex form-group">
                  <label className="startDate">Start From :</label>
                  <div className="datePicker-wrapper">
                    <Field
                      minDate={new Date()}
                      name="start_date"
                      component={CustomDatePicker}
                      format={null}
                      textFieldStyle={{ width: '100%', marginLeft: -46 }}
                      hintText="Start Date"
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="d-flex form-group">
                  <label className="end">To :</label>
                  <div className="datePicker-wrapper">
                    <Field
                      name="end_date"
                      component={CustomDatePicker}
                      minDate={new Date()}
                      format={null}
                      textFieldStyle={{ width: '100%' }}
                      hintText="End Date"
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </section>
            <section>
              <Subheader className="header subtitle">
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
                    multiLine
                    rows={1}
                    rowsMax={3}
                    disabled={true}
                  />
                </div>
                <div className="d-flex form-group">
                  <label>Email :</label>
                  <Field
                    name="organizerEmail"
                    component={CustomInput}
                    hintText="Organizer Email"
                    fullWidth={true}
                    disabled={true}
                  />
                </div>
                <div className="d-flex form-group">
                  <label>Address :</label>
                  <Field
                    name="organizerAddress"
                    component={CustomInput}
                    hintText="Organizer Address"
                    fullWidth={true}
                    disabled={true}
                  />
                </div>
                <div className="d-flex form-group">
                  <label>Website :</label>
                  <Field
                    name="organizerWebsite"
                    component={CustomInput}
                    hintText="Organizer Website"
                    fullWidth={true}
                    disabled={true}
                  />
                </div>
                <div className="d-flex form-group">
                  <label>Phone Number :</label>
                  <Field
                    name="organizerPhoneNumber"
                    component={CustomInput}
                    hintText="Organizer Phone Number"
                    fullWidth={true}
                    disabled={true}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </form>
    );
  }
}
export default reduxForm({
  form: 'ConferenceInfoForm',
})(ConferenceInfoForm);
