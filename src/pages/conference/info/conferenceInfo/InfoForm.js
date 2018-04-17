import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Subheader, RaisedButton, MenuItem } from 'material-ui';
import CustomInput from 'components/CustomInput';
import AppMap from 'components/AppMap';
import normalizePhone from 'utils/normalizePhone';
import validate from './validate';
import AlertContainer from 'react-alert';
import { alertOptions, MyFaCheck } from 'theme/alert';
import { renderSelectField } from 'components/render';

class ConferenceInfoForm extends React.Component {
  state = {
    openDialog: false,
  };
  handleSaved = () => {
    this.setState({ openDialog: !this.state.openDialog });
  };
  showAlertSuccess = () => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
    });
  };
  render() {
    const {
      handleSubmit,
      initialValues,
      onMapPositionChanged,
      pristine,
      categories,
    } = this.props;
    console.log(initialValues);
    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        <div className="form-body d-flex justify-content-space-between">
          <section className="map">
            <Subheader className="header subtitle">
              Organization Place
            </Subheader>
            <AppMap
              onMapPositionChanged={onMapPositionChanged}
              initalPosition={{
                lat: initialValues.lat,
                long: initialValues.long,
              }}
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAhGSgJvoGdeOzzDDDyTxWyQj7YRA2lZiA"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `86%` }} />}
              mapElement={
                <div
                  style={{
                    height: `100%`,
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
                />
              </div>
              <div className="d-flex form-group">
                <label>Category :</label>
                <Field
                  name="category_name"
                  component={renderSelectField}
                  fullWidth={true}
                >
                  {categories.map(value => (
                    <MenuItem
                      key={value.id}
                      value={value.id}
                      primaryText={value.name}
                    />
                  ))}
                </Field>
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
          </div>
        </div>
        <div className="d-flex save-btn btn-group marginBottom">
          <RaisedButton
            label="Save"
            primary={true}
            type="submit"
            disabled={pristine}
          />
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </form>
    );
  }
}
export default reduxForm({
  form: 'ConferenceInfoForm',
  validate,
})(ConferenceInfoForm);
