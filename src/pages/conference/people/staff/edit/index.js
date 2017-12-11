import React from 'react';
import { Dialog, Tabs, Tab, IconButton } from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons';
import Roles from './roles';
import Form from './form';
import { connect } from 'react-redux';
import { queries } from '../helpers';
import { graphql, compose } from 'react-apollo';
import '../../../info/coOrganizer/style.css';

class DialogEdit extends React.Component {
  render() {
    const { loading, error, getAllRolesActiveByUserID } = this.props.data;
    if (loading) {
      return <div />;
    }
    if (error) {
      return <div />;
    }
    let roles;
    if (getAllRolesActiveByUserID) {
      roles = getAllRolesActiveByUserID;
    } else return <div>Loading...</div>;
    const actions = (
      <div>
        <IconButton
          onClick={this.props.handleClose}
          tooltip="Close"
          className="cancel-btn dialog"
        >
          <NavigationClose />
        </IconButton>,
      </div>
    );
    return (
      <Dialog open={this.props.openDialog} actions={actions}>
        <Tabs style={{ marginTop: '20px' }}>
          <Tab label="Personal Information">
            <Form initialValues={this.props.user} roles={roles} />
          </Tab>
          <Tab label="Roles Information">
            <Roles />
          </Tab>
        </Tabs>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
});

export default compose(
  connect(mapStateToProps, undefined),
  graphql(queries.GET_ALL_ROLES_ACTIVE_BY_USER_ID_QUERY, {
    options: ownProps => ({
      variables: {
        user_id: ownProps.staff_id,
        conference_id: ownProps.conference_id,
      },
    }),
  }),
)(DialogEdit);
