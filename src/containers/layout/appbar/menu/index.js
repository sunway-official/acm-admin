import React, { Component } from 'react';
import {
  Badge,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Popover,
} from 'material-ui';
import {
  SocialNotificationsNone,
  CommunicationMailOutline,
  ActionDateRange,
  HardwareKeyboardArrowDown,
} from 'material-ui/svg-icons';
import { images } from '../../../../theme';
import style from './style.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withApollo, compose } from 'react-apollo';

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

  // handleRequestClose = () => {
  //   this.setState({
  //     openUser: false,
  //     openNotification: false,
  //     openMail: false,
  //     openCalendar: false,
  //   });
  // };

  handleSignOut() {
    localStorage.clear();
    this.props.client.resetStore();
    this.props.history.replace('/login');
  }
  render() {
    return (
      <div className="menu">
        <style
          dangerouslySetInnerHTML={{
            __html: style,
          }}
        />
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
        <div className="badge user" onClick={this.handleTouchTapUser}>
          <Avatar className="avatar" src={images.defaultAvatar} />
          <span className="user-name"> Manh </span>
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
              <MenuItem primaryText="A" />
              <MenuItem primaryText="Help &amp; feedback" />
              <MenuItem primaryText="Settings" />
              <Link to="/userInfo">
                <MenuItem
                  primaryText="User Info"
                  onClick={this.handleSignOut}
                />
              </Link>
              <MenuItem primaryText="Sign out" onClick={this.handleSignOut} />
            </Menu>
          </Popover>
        </div>
      </div>
    );
  }
}

export default compose(withRouter, withApollo)(BadgeExampleSimple);
