import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { bindActionCreators } from 'redux';
import { mutations, queries } from '../helpers';
import CoOrganizerForm from './Form';
import { conferenceCoOranizerActions } from 'store/ducks/conference/info/coOrganizer';
import { alertOptions, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
import './style.css';

class CoOrganizerInfo extends PureComponent {
  constructor() {
    super();
    this.save = this.save.bind(this);
    this.add = this.add.bind(this);
    this.toggleExit = this.toggleExit.bind(this);
  }
  showAlertSuccess = () => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
    });
  };
  toggleExit() {
    this.props.toggleModalForm();
  }
  async add(values) {
    try {
      await this.props.INSERT_COORGANIZER({
        variables: {
          address: '',
          id: this.props.coOrganizerId,
          name: values.coOrganizerName,
          email: values.coOrganizerEmail,
          website: values.coOrganizerWebsite,
          phone: values.coOrganizerPhone,
        },
        refetchQueries: [
          {
            query: queries.GET_CURRENT_CONFERENCE,
          },
        ],
      });
      this.toggleExit();
      this.showAlertSuccess();
    } catch (error) {
      throw new SubmissionError(error);
    }
  }
  async save(values) {
    console.log(values);
    try {
      await this.props.UPDATE_COORGANIZER_MUTATION({
        variables: {
          id: this.props.coOrganizerId,
          name: values.coOrganizerName,
          email: values.coOrganizerEmail,
          website: values.coOrganizerWebsite,
          phone: values.coOrganizerPhone,
        },
      });
      this.toggleExit();
      this.showAlertSuccess();
    } catch (error) {
      throw new SubmissionError(error);
    }
  }
  render() {
    return (
      <div>
        <CoOrganizerForm
          initialValues={this.props.initialValues}
          onSubmit={this.props.isAdd ? this.add : this.save}
        />
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </div>
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(mutations.UPDATE_COORGANIZER_MUTATION, {
    name: 'UPDATE_COORGANIZER_MUTATION',
  }),
  graphql(mutations.INSERT_COORGANIZER, {
    name: 'INSERT_COORGANIZER',
  }),
)(CoOrganizerInfo);
