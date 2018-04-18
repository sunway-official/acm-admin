import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import { mutations, queries } from '../../helpers';
import Form from '../Form';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { alertOptions, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
import Loading from 'components/render/renderLoading';

class Index extends Component {
  constructor() {
    super();
    this.handleEdit = this.handleEdit.bind(this);
  }

  showAlertSuccess = () => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
      onClose: () => {
        this.props.history.replace('/conference/info');
      },
    });
  };
  async handleEdit(values) {
    try {
      await this.props.UPDATE_COORGANIZER_MUTATION({
        variables: {
          id: this.props.coOrganizer_id,
          name: values.coOrganizerName,
          email: values.coOrganizerEmail,
          website: values.coOrganizerWebsite,
          phone: values.coOrganizerPhone,
        },
      });
      this.showAlertSuccess();
    } catch (error) {
      throw console.log(error);
    }
  }
  render() {
    const {
      loading,
      getCoOrganizerDetailByID,
    } = this.props.GET_CO_ORGANIZER_DETAIL_BY_ID;
    let coOrganizer, initialValues;
    if (getCoOrganizerDetailByID) {
      coOrganizer = getCoOrganizerDetailByID;
      initialValues = {
        coOrganizerName: coOrganizer.name,
        coOrganizerEmail: coOrganizer.email,
        coOrganizerWebsite: coOrganizer.website,
        coOrganizerPhone: coOrganizer.phone,
      };
    }
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="conference">
        <Subheader className="subheader">
          {localStorage.getItem('conferenceTitle')}
        </Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Dashboard</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <Link to="/conference/info">
            <span>Conference Information</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Co-Organizer Management</span>
        </div>
        <div className="dashboard content justify-content-center d-flex">
          <Form onSubmit={this.handleEdit} initialValues={initialValues} />
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  if (ownProps) {
    return {
      coOrganizer_id: ownProps.match.params.id,
    };
  }
  return {};
};
export default compose(
  withRouter,
  connect(mapStateToProps, undefined),
  graphql(mutations.UPDATE_COORGANIZER_MUTATION, {
    name: 'UPDATE_COORGANIZER_MUTATION',
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.id,
      },
    }),
  }),
  graphql(queries.GET_CO_ORGANIZER_DETAIL_BY_ID, {
    name: 'GET_CO_ORGANIZER_DETAIL_BY_ID',
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.id,
      },
    }),
  }),
)(Index);
