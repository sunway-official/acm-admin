import React from 'react';
import { Dialog, Tabs, Tab, IconButton } from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons';
import PersonalInfo from './personalInfo';
import { connect } from 'react-redux';

class DialogEdit extends React.Component {
  render() {
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
            <PersonalInfo initialValues={this.props.initialValues} />
          </Tab>
          <Tab label="Roles Information">
            <div>Role</div>
          </Tab>
        </Tabs>
      </Dialog>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const staff = ownProps.allStaff;
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

export default connect(mapStateToProps, undefined)(DialogEdit);
