import React, { Component } from 'react';
import { Toggle, ListItem, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';

class RolesInfo extends Component {
  state = {
    toggleModerator: false,
    toggleSupporter: false,
    toggleTicketChecker: false,
    toggleReviewer: false,
    toggleAuthor: false,
  };

  render() {
    console.log('props', this.props);
    return (
      <div>
        <div>
          <ListItem
            primaryText="Moderator"
            rightToggle={<Toggle defaultToggled={this.state.toggleModerator} />}
          />
          <ListItem
            primaryText="Supporter"
            rightToggle={<Toggle defaultToggled={this.state.toggleSupporter} />}
          />
          <ListItem
            primaryText="Ticket Checker"
            rightToggle={
              <Toggle defaultToggled={this.state.toggleTicketChecker} />
            }
          />
          <ListItem
            primaryText="Reviewer"
            rightToggle={<Toggle defaultToggled={this.state.toggleReviewer} />}
          />
          <ListItem
            primaryText="Author"
            rightToggle={<Toggle defaultToggled={this.state.toggleAuthor} />}
          />
        </div>
        <div>
          <RaisedButton
            style={{ width: '0' }}
            className="d-flex m-auto"
            label="Save"
            primary={true}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const userID = state.user.data.id;
  console.log('state', state.roles.data);
  return {
    id: userID,
    roles: state.roles.data,
  };
};

export default connect(mapStateToProps, undefined)(RolesInfo);
