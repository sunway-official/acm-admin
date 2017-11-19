import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { bindActionCreators } from 'redux';
import { mutations } from '../helpers';
import CoOrganizerForm from './Form';
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
          address: '',
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
  console.log(state);
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(mutations.UPDATE_COORGANIZER_MUTATION, {
    name: 'UPDATE_COORGANIZER_MUTATION',
  }),
  graphql(mutations.INSERT_COORGANIZER, {
    name: 'INSERT_COORGANIZER',
  }),
)(CoOrganizerInfo);
