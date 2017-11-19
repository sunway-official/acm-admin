import { Avatar, IconButton, Menu, MenuItem, Popover } from 'material-ui';
import { HardwareKeyboardArrowDown } from 'material-ui/svg-icons';
import { Component } from 'react';
import React from 'react';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { images } from '../../../../theme';
import style from './style.css';

//import { graphql, gql } from 'react-apollo';

class BadgeExampleSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openUser: false,
      openNotification: false,
      openMail: false,
      openCalendar: false,
    };
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleTouchTapUser = event => {
    event.preventDefault();

    this.setState({
      openUser: true,
      anchorEl: event.currentTarget,
    });
  };
  handleTouchTapNotification = event => {
    event.preventDefault();

    this.setState({
      openNotification: true,
      anchorEl: event.currentTarget,
    });
  };
  handleTouchTapMail = event => {
    event.preventDefault();
    this.setState({
      openMail: true,
      anchorEl: event.currentTarget,
    });
  };
  handleTouchTapCalendar = event => {
    event.preventDefault();

    this.setState({
      openCalendar: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      openUser: false,
      openNotification: false,
      openMail: false,
      openCalendar: false,
    });
  };

  handleSignOut() {
    localStorage.clear();
    this.props.client.resetStore();
    this.props.history.replace('/login');
  }
  render() {
    // const { loading } = this.props.data;
    // if (loading) return <div>Loading...</div>;
    var first = '';
    if (this.props.me !== undefined) {
      //console.log(this.props.me.firstname);
      first = this.props.me.firstname;
    }
    return (
      <div className="menu">
        <style
          dangerouslySetInnerHTML={{
            __html: style,
          }}
        />
        {/*
           <Badge
          className="badge"
          badgeContent={10}
          primary={true}
          badgeStyle={{
            top: 10,
            left: 30,
          }}
          onClick={this.handleTouchTapNotification}
        >
          <IconButton tooltip="Notifications">
            <SocialNotificationsNone />
          </IconButton>
          <Popover
            open={this.state.openNotification}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              horizontal: 'left',
              vertical: 'bottom',
            }}
            targetOrigin={{
              horizontal: 'left',
              vertical: 'top',
            }}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem primaryText="Noti" />
              <MenuItem primaryText="Help &amp; feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Sign out" />
            </Menu>
          </Popover>
        </Badge>
        <Badge
          className="badge"
          badgeContent={5}
          primary={true}
          badgeStyle={{
            top: 10,
            left: 30,
          }}
          onClick={this.handleTouchTapMail}
        >
          <IconButton tooltip="Mails">
            <CommunicationMailOutline />
          </IconButton>
          <Popover
            open={this.state.openMail}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              horizontal: 'left',
              vertical: 'bottom',
            }}
            targetOrigin={{
              horizontal: 'left',
              vertical: 'top',
            }}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem primaryText="Mail" />
              <MenuItem primaryText="Help &amp; feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Sign out" />
            </Menu>
          </Popover>
        </Badge>

        <Badge
          className="badge"
          badgeContent={4}
          primary={true}
          badgeStyle={{
            top: 10,
            left: 30,
          }}
          onClick={this.handleTouchTapCalendar}
        >
          <IconButton tooltip="Calendar">
            <ActionDateRange />
          </IconButton>
          <Popover
            open={this.state.openCalendar}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              horizontal: 'left',
              vertical: 'bottom',
            }}
            targetOrigin={{
              horizontal: 'left',
              vertical: 'top',
            }}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem primaryText="Calendar" />
              <MenuItem primaryText="Help &amp; feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Sign out" />
            </Menu>
          </Popover>
        </Badge>
        */}
        <div className="badge user" onClick={this.handleTouchTapUser}>
          <Avatar className="avatar" src={images.defaultAvatar} />
          <span className="user-name"> {first} </span>
          <IconButton tooltip="User">
            <HardwareKeyboardArrowDown />
          </IconButton>
          <Popover
            open={this.state.openUser}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              horizontal: 'left',
              vertical: 'bottom',
            }}
            targetOrigin={{
              horizontal: 'left',
              vertical: 'top',
            }}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <Link to="/user-profile">
                <MenuItem primaryText="User Profile" />
              </Link>
              <MenuItem primaryText="Sign out" onClick={this.handleSignOut} />
            </Menu>
          </Popover>
        </div>
      </div>
    );
  }
}

// const QUERY_ME = gql`
//   query Me {
//     me {
//       firstname
//     }
//   }
// `;
const mapStateToProps = state => ({
  me: state.auth.currentUser,
});

export default compose(withRouter, withApollo, connect(mapStateToProps))(
  BadgeExampleSimple,
);
