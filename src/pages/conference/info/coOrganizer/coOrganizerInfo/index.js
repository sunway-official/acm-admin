import React, { PureComponent } from 'react';

import { gql, graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { bindActionCreators } from 'redux';

import CoOrganizerForm from './CoOrganizerForm';
import GET_CONFERENCE_BY_ID_QUERY from '../../helpers/getConferenceByIdQuery';
import { conferenceCoOranizerActions } from 'store/ducks/conference/info/coOrganizer';
import './style.css';

class CoOrganizerInfo extends PureComponent {
  constructor() {
    super();
    this.save = this.save.bind(this);
    this.add = this.add.bind(this);
    this.toggleExit = this.toggleExit.bind(this);
  }
  toggleExit() {
    this.props.toggleModalForm();
  }
  async add({
    coOrganizerName,
    coOrganizerEmail,
    coOrganizerWebsite,
    coOrganizerPhone,
  }) {
    try {
      await this.props.INSERT_COORGANIZER({
        variables: {
          conference_id: this.props.conferenceId,
          // set conference_id dua tren props cua coOrganizerList truyen qua
          address: '',
          id: this.props.coOrganizerId,
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
          data.getConferenceByID.coOrganizerDetails.push(
            insertCoOrganizerDetail,
          );
          store.writeQuery({ query: GET_CONFERENCE_BY_ID_QUERY, data });
        },
      });
      this.toggleExit();
    } catch (error) {
      throw new SubmissionError(error);
    }
  }
  async save({
    coOrganizerName,
    coOrganizerEmail,
    coOrganizerWebsite,
    coOrganizerPhone,
  }) {
    try {
      await this.props.UPDATE_COORGANIZER_MUTATION({
        variables: {
          id: this.props.coOrganizerId,
          name: coOrganizerName,
          email: coOrganizerEmail,
          website: coOrganizerWebsite,
          phone: coOrganizerPhone,
        },
      });
      this.toggleExit();
    } catch (error) {
      throw new SubmissionError(error);
    }
  }
  render() {
    return (
      <CoOrganizerForm
        initialValues={this.props.initialValues}
        onSubmit={this.props.isAdd ? this.add : this.save}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const coOrganizerDetails = ownProps.coOrganizerDetails;
  const isAdd = ownProps.isAdd;
  return {
    coOrganizerId: coOrganizerDetails.id,
    initialValues: isAdd
      ? {}
      : {
          coOrganizerName: coOrganizerDetails.name,
          coOrganizerEmail: coOrganizerDetails.email,
          coOrganizerWebsite: coOrganizerDetails.website,
          coOrganizerPhone: coOrganizerDetails.phone,
        },
  };
};

const mapDispatchToProps = dispatch => ({
  toggleModalForm: bindActionCreators(
    conferenceCoOranizerActions.toggleCoOrganizerFormModal,
    dispatch,
  ),
});

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(UPDATE_COORGANIZER_MUTATION, {
    name: 'UPDATE_COORGANIZER_MUTATION',
  }),
  graphql(INSERT_COORGANIZER, {
    name: 'INSERT_COORGANIZER',
  }),
)(CoOrganizerInfo);
