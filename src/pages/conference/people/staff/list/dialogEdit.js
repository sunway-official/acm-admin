import React from 'react';
import { Dialog, Tabs, Tab, IconButton } from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons';
import RolesInfo from './rolesInfo';
import PersonalInfo from './personalInfo';
import { connect } from 'react-redux';
import GET_ALL_ROLES_BY_USER_ID from './helpers/getAllRolesByUserID';
import { graphql, compose } from 'react-apollo';

class DialogEdit extends React.Component {
  render() {
    const { loading, error, getAllRolesByUserID } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>error</div>;
    }
    const roles = getAllRolesByUserID;
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
            <PersonalInfo initialValues={this.props.user} roles={roles} />
          </Tab>
          <Tab label="Roles Information">
            <RolesInfo />
          </Tab>
        </Tabs>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
  };
};

export default compose(
  connect(mapStateToProps, undefined),
  graphql(GET_ALL_ROLES_BY_USER_ID, {
    options: ownProps => ({
      variables: { user_id: ownProps.staff_id },
    }),
  }),
)(DialogEdit);
