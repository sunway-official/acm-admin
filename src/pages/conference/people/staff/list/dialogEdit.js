import React from 'react';
import { Dialog, Tabs, Tab, IconButton } from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons';
import RolesInfo from './rolesInfo';
import PersonalInfo from './personalInfo';
import { connect } from 'react-redux';
import GET_ALL_ROLES_BY_USER_ID from './helpers/getAllRolesByUserID';
import { graphql, compose } from 'react-apollo';
import { rolesOperations } from 'store/ducks/roles';

class DialogEdit extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.loading !== this.props.data.loading) {
      nextProps.setRole(nextProps.data.getAllRolesByUserID);
    }
  }
  render() {
    const { loading, error, getAllRolesByUserID } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>error</div>;
    }
    const roles = getAllRolesByUserID;
    console.log(this.props);
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
const mapdispatchToProps = dispatch => {
  return {
    setRole: roles => dispatch(rolesOperations.setRolesOperation(roles)),
  };
};

const mapStateToProps = (state, ownProps) => {
  const staff = ownProps.staff;
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

export default compose(
  connect(mapStateToProps, mapdispatchToProps),
  graphql(GET_ALL_ROLES_BY_USER_ID, {
    options: ownProps => ({
      variables: { user_id: ownProps.staff.id },
    }),
  }),
)(DialogEdit);
