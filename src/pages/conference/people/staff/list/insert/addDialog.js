import React, { Component } from 'react';
import { Dialog, SelectField, MenuItem, IconButton } from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons';

// import { graphql, gql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { userActions } from 'store/ducks/user';
import RoleInfo from '../rolesInfo';
class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSetUser = this.handleSetUser.bind(this);
  }
  state = {
    value: 0,
  };
  handleChange(event, index, value) {
    this.setState({ value });
  }
  handleSetUser(user) {
    this.props.setUser(user);
  }
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
    const allUsers = this.props.allUsers;
    return (
      <Dialog actions={actions} open={this.props.open}>
        <SelectField value={this.state.value} onChange={this.handleChange}>
          {allUsers.map((user, index) => {
            return (
              <MenuItem
                onClick={() => {
                  this.handleSetUser(user);
                }}
                key={index}
                value={index}
                primaryText={user.lastname + ' ' + user.firstname}
              />
            );
          })}
        </SelectField>
      </Dialog>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(userActions.setUser(user)),
  };
};
export default connect(undefined, mapDispatchToProps)(AddDialog);
