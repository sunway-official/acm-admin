import React, { Component } from 'react';
import {
  Badge,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Popover,
  RaisedButton,
} from 'material-ui';
import {
  SocialNotificationsNone,
  CommunicationMailOutline,
  ActionDateRange,
  HardwareKeyboardArrowDown,
  ContentAdd,
} from 'material-ui/svg-icons';
import { images } from '../../../theme';
import style from './style.css';

class BadgeExampleSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNew: false,
      openUser: false,
      openNotification: false,
      openMail: false,
      openCalendar: false,
    };
  }

  handleTouchTapNew = event => {
    event.preventDefault();

    this.setState({
      openNew: true,
      anchorEl: event.currentTarget,
    });
  };
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
      openNew: false,
    });
  };
  render() {
    return (
      <div className="menu">
        <style
          dangerouslySetInnerHTML={{
            __html: style,
          }}
        />{' '}
        <RaisedButton
          onClick={this.handleTouchTapNew}
          className="new"
          primary={true}
        >
          <div className="group">
            <ContentAdd style={{ color: 'white' }} />
            <span style={{ color: 'white' }}>New</span>
            <HardwareKeyboardArrowDown style={{ color: 'white' }} />
          </div>
          <Popover
            open={this.state.openNew}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem primaryText="New" />
              <MenuItem primaryText="Help &amp; feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Sign out" />
            </Menu>
          </Popover>
        </RaisedButton>
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
            <SocialNotificationsNone />{' '}
          </IconButton>{' '}
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
            </Menu>{' '}
          </Popover>{' '}
        </Badge>{' '}
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
            <CommunicationMailOutline />{' '}
          </IconButton>{' '}
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
            </Menu>{' '}
          </Popover>{' '}
        </Badge>{' '}
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
            <ActionDateRange />{' '}
          </IconButton>{' '}
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
            </Menu>{' '}
          </Popover>{' '}
        </Badge>{' '}
        <div className="badge user" onClick={this.handleTouchTapUser}>
          <Avatar className="avatar" src={images.defaultAvatar} />{' '}
          <span className="user-name"> Manh </span>{' '}
          <IconButton tooltip="User">
            <HardwareKeyboardArrowDown />
          </IconButton>{' '}
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
              <MenuItem primaryText="Sign out" />
            </Menu>{' '}
          </Popover>{' '}
        </div>{' '}
      </div>
    );
  }
}

export default BadgeExampleSimple;
