import React, { PureComponent } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { RaisedButton, TextField } from 'material-ui';
import { gql, graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { style } from './style.css';
import { GET_CONFERENCE_BY_ID_QUERY } from '../index';
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
  return errors;
};

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => <TextField errorText={touched && error} {...input} {...custom} />;

class Info extends PureComponent {
  constructor() {
    super();
    this.save = this.save.bind(this);
    this.add = this.add.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick() {
    if (this.props.isAdd === true) {
      this.add();
    } else this.save();
  }
  add() {
    const {
      INSERT_COORGANIZER,
      coOrganizerId,
      coOrganizerName,
      coOrganizerEmail,
      coOrganizerWebsite,
      coOrganizerPhone,
    } = this.props;
    INSERT_COORGANIZER({
      variables: {
        conference_id: this.props.conferenceId,
        // set conference_id dua tren props cua coOrganizerList truyen qua
        address: '',
        id: coOrganizerId,
        name: coOrganizerName,
        email: coOrganizerEmail,
        website: coOrganizerWebsite,
        phone: coOrganizerPhone,
      },
      update: (store, { data: { insertCoOrganizerDetail } }) => {
        const data = store.readQuery({
          query: GET_CONFERENCE_BY_ID_QUERY, //
          variables: {
            id: this.props.conferenceId,
          },
        });
        data.getConferenceByID.coOrganizerDetails.push(insertCoOrganizerDetail);
        store.writeQuery({ query: GET_CONFERENCE_BY_ID_QUERY, data });
      },
    });
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
    const { handleSubmit, submitting, pristine, invalid } = this.props;
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
            onClick={this.handleOnClick}
            disabled={pristine || submitting || invalid}
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

const INSERT_COORGANIZER = gql`
  mutation insertCoOrganizerDetail(
    $conference_id: ID!
    $name: String!
    $email: String!
    $website: String!
    $phone: String!
    $address: String!
  ) {
    insertCoOrganizerDetail(
      conference_id: $conference_id
      name: $name
      email: $email
      website: $website
      phone: $phone
      address: $address
    ) {
      id
      name
      email
      website
      phone
      conference {
        id
      }
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
  graphql(INSERT_COORGANIZER, {
    name: 'INSERT_COORGANIZER',
  }),
)(Info);
