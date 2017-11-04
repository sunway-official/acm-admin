import React, { Component } from 'react';
import { Toggle, ListItem, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
class RolesInfo extends Component {
  constructor(props) {
    super(props);
    this.handleToggleModerator = this.handleToggleModerator.bind(this);
  }
  state = {
    toggleModerator: false,
    toggleSupporter: false,
    toggleTicketChecker: false,
    toggleReviewer: false,
    toggleAuthor: false,
  };
  handleToggleModerator() {
    this.setState({ toggleModerator: !this.state.toggleModerator });
  }
  // componentWillMount() {
  //   {
  //     this.props.roles.map(data => {
  //       switch (data.role.name) {
  //         case 'Moderator':
  //           this.setState({ toggleModerator: true });
  //           break;
  //         case 'Supporter':
  //           this.setState({ toggleSupporter: true });
  //           break;
  //         case 'Ticket Checker':
  //           this.setState({ toggleTicketChecker: true });
  //           break;
  //         case 'Reviewer':
  //           this.setState({ toggleReviewer: true });
  //           break;
  //         case 'Author':
  //           this.setState({ toggleAuthor: true });
  //           break;
  //         default:
  //           false;
  //           break;
  //       }
  //     });
  //   }
  // }
  render() {
    // const roles = this.props.roles;
    // console.log('Moderator', this.state.toggleModerator);
    console.log('dispatch', this.props);

    return (
      // <div>
      //   <div>
      //     <ListItem
      //       primaryText="Moderator"
      //       rightToggle={
      //         <Toggle
      //           onToggle={() =>
      //             this.handleToggleModerator +
      //             console.log(this.state.toggleModerator)}
      //           defaultToggled={this.state.toggleModerator}
      //         />
      //       }
      //     />
      //     <ListItem
      //       primaryText="Supporter"
      //       rightToggle={<Toggle defaultToggled={this.state.toggleSupporter} />}
      //     />
      //     <ListItem
      //       primaryText="Ticket Checker"
      //       rightToggle={
      //         <Toggle defaultToggled={this.state.toggleTicketChecker} />
      //       }
      //     />
      //     <ListItem
      //       primaryText="Reviewer"
      //       rightToggle={<Toggle defaultToggled={this.state.toggleReviewer} />}
      //     />
      //     <ListItem
      //       primaryText="Author"
      //       rightToggle={<Toggle defaultToggled={this.state.toggleAuthor} />}
      //     />
      //   </div>
      //   <div>
      //     <RaisedButton
      //       style={{ width: '0' }}
      //       className="d-flex m-auto"
      //       label="Save"
      //       primary={true}
      //     />
      //   </div>
      // </div>
      <div>asd</div>
    );
  }
}
const mapStateToProps = state => {
  const roles = state.roles;
  console.log(roles);
  return {};
};

export default connect(mapStateToProps, undefined)(RolesInfo);
