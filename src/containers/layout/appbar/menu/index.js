import { IconButton, Menu, MenuItem, Popover } from 'material-ui';
import { HardwareKeyboardArrowDown } from 'material-ui/svg-icons';
import { Component } from 'react';
import React from 'react';
import { compose, withApollo, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import { AppBar, Drawer } from 'material-ui';
import ConfMgtSidebar from 'pages/conference/add';
import { queries } from '../helpers';
import style from './style.css';
import { functions } from 'containers/layout/appbar/helpers';

class BadgeExampleSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openUser: false,
      openCalendar: false,
      openListConf: false,
    };
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleToggleConference = () => {
    this.setState({ openListConf: !this.state.openListConf });
    this.handleRequestClose();
  };

  handleCloseConference = () => this.setState({ openListConf: false });

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
    window.location.reload();
  }
  render() {
    let first = '';
    if (this.props.me !== undefined) {
      first = this.props.me.firstname;
    }
    const loadingRole = this.props.GET_ALL_ROLE_OF_USER.loading;
    if (loadingRole) return <div />;

    let isShow = [];
    const roles = this.props.GET_ALL_ROLE_OF_USER.getAllRolesOfUser;

    if (roles && roles.length > 0) {
      const rolesUserId = functions.getRolesId(roles);
      localStorage.setItem('roles', rolesUserId);
      isShow = functions.checkRoleAllComponents(rolesUserId);
    }

    let isAuthor;
    if (localStorage.getItem('roles')) {
      isAuthor = localStorage.getItem('roles').indexOf('7');
    }

    let disable_submit = false;
    if (this.props.me && this.props.me.currentConference) {
      const currentConferenceData = this.props.me.currentConference;
      const deadline_sbm_abs = currentConferenceData.dl_submit_abstract;

      const now = new Date();

      if (now.toISOString() < deadline_sbm_abs) {
        disable_submit = true;
      }
    }

    return (
      <div className="menu">
        <style
          dangerouslySetInnerHTML={{
            __html: style,
          }}
        />
        {disable_submit === true &&
          isAuthor !== -1 && (
            <FlatButton
              label="Submit paper"
              primary={true}
              className="submit-btn"
              href="/conference/paper/add/"
            />
          )}
        <div className="badge user" onClick={this.handleTouchTapUser}>
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
                <MenuItem
                  primaryText="User Profile"
                  onClick={this.handleRequestClose}
                />
              </Link>
              {isShow['invite-user'] ? (
                <Link to="/invite-user">
                  <MenuItem
                    primaryText="Author/Reviewer Invitation"
                    onClick={this.handleRequestClose}
                  />
                </Link>
              ) : (
                ''
              )}
              <MenuItem primaryText="Sign out" onClick={this.handleSignOut} />
            </Menu>
          </Popover>
        </div>
        <Drawer
          open={this.state.openListConf}
          docked={false}
          onRequestChange={openListConf => this.setState({ openListConf })}
        >
          <AppBar
            title="ACM"
            className="sidebar"
            onClick={this.handleCloseConference}
          />
          <ConfMgtSidebar handleCloseConference={this.handleCloseConference} />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  me: state.auth.currentUser,
});

export default compose(
  withRouter,
  withApollo,
  connect(mapStateToProps),
  graphql(queries.GET_ALL_ROLE_OF_USER, {
    name: 'GET_ALL_ROLE_OF_USER',
  }),
)(BadgeExampleSimple);
