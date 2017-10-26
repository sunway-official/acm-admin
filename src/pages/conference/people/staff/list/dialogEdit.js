import React from 'react';
import { Dialog, Tabs, Tab, IconButton } from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons';
import PersonalInfo from './personalInfo';
import RolesInfo from './rolesInfo';

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
      <div>
        <Dialog open={this.props.openDialog} actions={actions}>
          <Tabs style={{ marginTop: '20px' }}>
            <Tab label="Personal Information">
              <PersonalInfo />
            </Tab>
            <Tab label="Roles Information">
              <RolesInfo onSubmit={() => {}} />
            </Tab>
          </Tabs>
        </Dialog>
      </div>
    );
  }
}
export default DialogEdit;
