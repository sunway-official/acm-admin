import React from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { RaisedButton } from 'material-ui';
import validate, { renderTextField, renderDatePicker } from './validate';
import normalizePhone from './normalizePhone';
import { style } from './style.css';

const AddConferenceForm = ({
  onClick,
  handleSubmit = this.props.history.push('/'),
  reset,
  submitting,
  pristine,
  invalid,
  handleClose = this.props.handleClose,
}) => (
  <form className="form conference-add" onSubmit={handleSubmit}>
    <div>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div>
        <center className="add-title">Conference Information</center>
        <div name="conference">
          <div className="d-flex form-group">
            <label>Address ID</label>
            <Field
              name="address_id"
              component={renderTextField}
              fullWidth={true}
              hintText="Address id"
            />
            <br />
          </div>
          <div className="d-flex form-group">
            <label>Title</label>
            <Field
              name="title"
              component={renderTextField}
              fullWidth={true}
              hintText="Title"
            />
            <br />
          </div>
          <div className="d-flex form-group">
            <label>Description</label>
            <Field
              name="description"
              component={renderTextField}
              multiLine
              fullWidth={true}
              hintText="Description"
            />
            <br />
          </div>
          <div className="d-flex date">
            <div className="d-flex form-group">
              <label className="start">
                Time duration <label className="from"> From:{'  '}</label>
              </label>
              <Field
                minDate={new Date()}
                name="startDate"
                component={renderDatePicker}
                format={null}
                textFieldStyle={{ width: '100%' }}
                hintText="Start Date"
              />
            </div>
            <div className="d-flex form-group">
              <label className="end">To: </label>
              <Field
                name="endDate"
                component={renderDatePicker}
                minDate={new Date()}
                format={null}
                textFieldStyle={{ width: '100%' }}
                hintText="End Date"
              />
            </div>
          </div>
          <div className="d-flex form-group">
            <label>Background image</label>
            <Field
              name="bg_image"
              component={renderTextField}
              fullWidth={true}
              hintText="background image"
            />
            <br />
          </div>
        </div>
        <div>
          <center className="add-title">Organizer Information</center>
          <div>
            <div className="d-flex form-group">
              <label>Address</label>
              <Field
                name="organizerAddress"
                component={renderTextField}
                fullWidth={true}
                hintText="Address"
              />
              <br />
            </div>
          </div>
          <div className="d-flex form-group">
            <label>Name</label>
            <Field
              name="organizerName"
              component={renderTextField}
              fullWidth={true}
              hintText="Organizer name"
            />
            <br />
          </div>
          <div className="d-flex form-group">
            <label>Website</label>
            <Field
              name="organizerWebsite"
              component={renderTextField}
              fullWidth={true}
              hintText="Organizer website"
            />
            <br />
          </div>
          <div className="d-flex form-group">
            <label>Email</label>
            <Field
              name="organizerEmail"
              component={renderTextField}
              fullWidth={true}
              hintText="Organizer email"
            />
            <br />
          </div>
          <div className="d-flex form-group">
            <label>Phone Number </label>
            <Field
              name="organizerPhoneNumber"
              component={renderTextField}
              hintText="Organizer Phone Number"
              fullWidth={true}
              normalize={normalizePhone}
            />
          </div>
          <div className="d-flex submit-btn btn-group">
            <RaisedButton
              className="btn"
              label="Save"
              primary={true}
              type="submit"
              disabled={pristine || submitting || invalid}
              onClick={handleClose}
            />
            <RaisedButton
              className="btn"
              label="Reset"
              primary={true}
              type="reset"
              disabled={pristine || submitting}
              onClick={reset}
            />
          </div>
        </div>
      </div>
    </div>
  </form>
);

const afterSubmit = (result, dispatch) => dispatch(reset('AddconferenceForm'));
export default reduxForm({
  form: 'AddconferenceForm',
  onSubmitSuccess: afterSubmit,
  validate,
})(AddConferenceForm);
