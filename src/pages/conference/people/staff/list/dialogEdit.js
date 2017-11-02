import React from 'react';
import { Dialog, Tabs, Tab, IconButton } from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons';
import RolesInfo from './rolesInfo';
import PersonalInfo from './personalInfo';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';

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
            <PersonalInfo
              initialValues={this.props.initialValues}
              roles={roles}
            />
          </Tab>,
          <Tab label="Roles Information">
            <RolesInfo />
          </Tab>
        </Tabs>
      </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const staff = ownProps.staff;
  // console.log('staff', staff);
  return {
    initialValues: {
      id: staff.id,
      firstname: staff.firstname,
      lastname: staff.lastname,
      email: staff.email,
      dob: staff.dob,
      gender: staff.gender,
    },
  };
};

const GET_ALL_ROLES_BY_USER_ID = gql`
  query getAllRolesByUserID($user_id: ID!) {
    getAllRolesByUserID(user_id: $user_id) {
      role {
        name
        id
      }
    }
  }
`;

export default compose(
  connect(mapStateToProps, undefined),
  graphql(GET_ALL_ROLES_BY_USER_ID, {
    options: ownProps => ({
      variables: { user_id: ownProps.staff.id },
    }),
  }),
)(DialogEdit);
