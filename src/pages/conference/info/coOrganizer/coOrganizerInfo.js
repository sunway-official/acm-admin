import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { RaisedButton, TextField } from 'material-ui';
import { gql, graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { style } from './style.css';
import normalizePhone from '../normalizePhone';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'coOrganizerName',
    'coOrganizerEmail',
    'coOrganizerWebsite',
    'coOrganizerPhone',
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
    errors.organizerEmail = 'Invalid email addrecss';
  }
  return errors;
};

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => <TextField errorText={touched && error} {...input} {...custom} />;

class Info extends Component {
  constructor() {
    super();
    this.save = this.save.bind(this);
  }

  save() {
    const {
      UPDATE_COORGANIZER_MUTATION,
      coOrganizerId,
      coOrganizerName,
      coOrganizerEmail,
      coOrganizerWebsite,
      coOrganizerPhone,
    } = this.props;
    UPDATE_COORGANIZER_MUTATION({
      variables: {
        id: coOrganizerId,
        name: coOrganizerName,
        email: coOrganizerEmail,
        website: coOrganizerWebsite,
        phone: coOrganizerPhone,
      },
    });
  }
  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <div>
          <div>
            <div className="d-flex form-group">
              <label>Name :</label>
              <Field
                name="coOrganizerName"
                component={renderTextField}
                hintText="Co-Organizer Name"
                fullWidth={true}
              />
            </div>
            <div className="d-flex form-group">
              <label>Email :</label>
              <Field
                name="coOrganizerEmail"
                component={renderTextField}
                hintText="Co-Organizer Email"
                fullWidth={true}
              />
            </div>
            <div className="d-flex form-group">
              <label>Website :</label>
              <Field
                name="coOrganizerWebsite"
                component={renderTextField}
                hintText="Co-Organizer Website"
                fullWidth={true}
              />
            </div>
            <div className="d-flex form-group">
              <label>Phone Number :</label>
              <Field
                name="coOrganizerPhone"
                component={renderTextField}
                hintText="Co-Organizer Phone Number"
                fullWidth={true}
                normalize={normalizePhone}
              />
            </div>
          </div>
        </div>
        <div className="d-flex save-btn btn-group">
          <RaisedButton
            label="Save"
            primary={true}
            onClick={this.save}
            disabled={pristine || submitting}
            type="submit"
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const coOrganizerDetails = ownProps.coOrganizerDetails;
  return {
    coOrganizerId: coOrganizerDetails.id,
    initialValues: {
      coOrganizerName: coOrganizerDetails.name,
      coOrganizerEmail: coOrganizerDetails.email,
      coOrganizerWebsite: coOrganizerDetails.website,
      coOrganizerPhone: coOrganizerDetails.phone,
    },
  };
};

const selector = formValueSelector('coOrganizerInfo');

Info = connect(state => {
  const coOrganizerName = selector(state, 'coOrganizerName');
  const coOrganizerEmail = selector(state, 'coOrganizerEmail');
  const coOrganizerWebsite = selector(state, 'coOrganizerWebsite');
  const coOrganizerPhone = selector(state, 'coOrganizerPhone');
  return {
    coOrganizerName,
    coOrganizerEmail,
    coOrganizerWebsite,
    coOrganizerPhone,
  };
})(Info);

const UPDATE_COORGANIZER_MUTATION = gql`
  mutation UpdateCoOrganizerDetail(
    $id: ID!
    $name: String!
    $email: String!
    $website: String!
    $phone: String!
  ) {
    updateCoOrganizerDetail(
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

Info = reduxForm({
  form: 'coOrganizerInfo',

  validate,
})(Info);

export default compose(
  connect(mapStateToProps, undefined),
  graphql(UPDATE_COORGANIZER_MUTATION, {
    name: 'UPDATE_COORGANIZER_MUTATION',
  }),
)(Info);
// export default connect(mapStateToProps, undefined)(Info);
