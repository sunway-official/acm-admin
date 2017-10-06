import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { RaisedButton, Subheader, TextField, DatePicker } from 'material-ui';
import { style } from './style.css';
import normalizePhone from './normalizePhone';
import { gql, graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'title',
    'description',
    'startDate',
    'endDate',
    'organizerName',
    'organizerEmail',
    'organizerWebsite',
    'organizerPhoneNumber',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.organizerEmail &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.organizerEmail)
  ) {
    errors.organizerEmail = 'Invalid email address';
  }
  return errors;
};

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => <TextField errorText={touched && error} {...input} {...custom} />;

const renderDatePicker = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <DatePicker
    minDate={currentDate}
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
  />
);

class Info extends Component {
  constructor() {
    super();
    this.saveConference = this.saveConference.bind(this);
    this.saveOrganizer = this.saveOrganizer.bind(this);
    this.saveForm = this.saveForm.bind(this);
  }

  saveForm() {
    this.saveConference();
    this.saveOrganizer();
  }

  saveConference() {
    const {
      UPDATE_CONFERENCE_MUTATION,
      conference_id,
      title,
      description,
      startDate,
      endDate,
    } = this.props;
    UPDATE_CONFERENCE_MUTATION({
      variables: {
        id: conference_id,
        title: title,
        description: description,
        start_date: startDate,
        end_date: endDate,
      },
    });
  }
  saveOrganizer() {
    const {
      UPDATE_ORGANIZER_DETAIL_MUTATION,
      organizerDetail_id,
      organizerName,
      organizerEmail,
      organizerWebsite,
      organizerPhoneNumber,
    } = this.props;

    console.log(this.props);
    UPDATE_ORGANIZER_DETAIL_MUTATION({
      variables: {
        id: organizerDetail_id,
        name: organizerName,
        email: organizerEmail,
        website: organizerWebsite,
        phone: organizerPhoneNumber,
      },
    });
    // console.log(this.props);
  }

  render() {
    const { handleSubmit, submitting, pristine, invalid } = this.props;
    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        <div>
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <div>
            <div>
              <Subheader className="header title">Basic Information</Subheader>
              <div>
                <div className="d-flex form-group">
                  <label>Title :</label>
                  <Field
                    name="title"
                    component={renderTextField}
                    fullWidth={true}
                    hintText="Conference Title"
                  />
                </div>
                <div className="d-flex form-group">
                  <label>Description :</label>
                  <Field
                    name="description"
                    component={renderTextField}
                    multiLine
                    rows={1}
                    fullWidth={true}
                  />
                </div>
                <div className="d-flex date">
                  <div className="d-flex form-group">
                    <label className="start">Conference Start From :</label>
                    <Field
                      name="startDate"
                      component={renderDatePicker}
                      format={null}
                      textFieldStyle={{ width: '100%' }}
                      hintText="Start Date"
                    />
                  </div>
                  <div className="d-flex form-group">
                    <label className="end">To :</label>
                    <Field
                      name="endDate"
                      component={renderDatePicker}
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
                      component={renderTextField}
                      hintText="Organizer Name"
                      fullWidth={true}
                    />
                  </div>
                  <div className="d-flex form-group">
                    <label>Email :</label>
                    <Field
                      name="organizerEmail"
                      component={renderTextField}
                      hintText="Organizer Email"
                      fullWidth={true}
                    />
                  </div>
                  <div className="d-flex form-group">
                    <label>Website :</label>
                    <Field
                      name="organizerWebsite"
                      component={renderTextField}
                      hintText="Organizer Website"
                      fullWidth={true}
                    />
                  </div>
                  <div className="d-flex form-group">
                    <label>Phone Number :</label>
                    <Field
                      name="organizerPhoneNumber"
                      component={renderTextField}
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
                disabled={pristine || submitting || invalid}
                onClick={() => this.saveForm()}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
const currentDate = new Date();

Info = reduxForm({
  form: 'conferenceInfo',
  validate,
})(Info);

const mapStateToProps = (state, ownProps) => {
  const conference = ownProps.conference;
  const organizerDetail = conference.organizerDetail;
  // console.log(state);
  return {
    conference_id: conference.id,
    organizerDetail_id: organizerDetail.id,
    initialValues: {
      title: conference.title,
      description: conference.description,
      startDate: new Date(conference.start_date),
      endDate: new Date(conference.end_date),

      organizerName: organizerDetail.name,
      organizerEmail: organizerDetail.email,
      organizerWebsite: organizerDetail.website,
      organizerPhoneNumber: organizerDetail.phone,
    },
  };
};

const selector = formValueSelector('conferenceInfo'); // <-- same as form name
Info = connect(state => {
  // can select values individually
  const title = selector(state, 'title');
  const description = selector(state, 'description');
  const startDate = selector(state, 'startDate');
  const endDate = selector(state, 'endDate');
  const organizerName = selector(state, 'organizerName');
  const organizerEmail = selector(state, 'organizerEmail');
  const organizerWebsite = selector(state, 'organizerWebsite');
  const organizerPhoneNumber = selector(state, 'organizerPhoneNumber');
  return {
    title,
    description,
    startDate,
    endDate,
    organizerName,
    organizerEmail,
    organizerWebsite,
    organizerPhoneNumber,
  };
})(Info);

const UPDATE_CONFERENCE_MUTATION = gql`
  mutation UpdateConference(
    $id: ID!
    $title: String
    $description: String
    $start_date: Date
    $end_date: Date
  ) {
    updateConference(
      id: $id
      title: $title
      description: $description
      start_date: $start_date
      end_date: $end_date
    ) {
      id
      title
      description
      start_date
      end_date
    }
  }
`;

const UPDATE_ORGANIZER_DETAIL_MUTATION = gql`
  mutation updateOrganizerDetail(
    $id: ID!
    $name: String
    $email: String
    $website: String
    $phone: String
  ) {
    updateOrganizerDetail(
      id: $id
      name: $name
      email: $email
      website: $website
      phone: $phone
    ) {
      id
      name
      email
      website
      phone
    }
  }
`;

export default compose(
  connect(mapStateToProps, undefined),
  graphql(UPDATE_CONFERENCE_MUTATION, {
    name: 'UPDATE_CONFERENCE_MUTATION',
  }),
  graphql(UPDATE_ORGANIZER_DETAIL_MUTATION, {
    name: 'UPDATE_ORGANIZER_DETAIL_MUTATION',
  }),
)(Info);
