import { IconButton, Menu, MenuItem, Popover } from 'material-ui';
import { HardwareKeyboardArrowDown } from 'material-ui/svg-icons';
import { Component } from 'react';
import React from 'react';
import { compose, withApollo, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { AppBar, Drawer } from 'material-ui';
import ConfMgtSidebar from 'pages/conference/add';
import { queries } from '../helpers';
// import { images } from 'theme';
import style from './style.css';
import { functions } from 'containers/layout/appbar/helpers';
import Loading from 'components/render/renderLoading';

class BadgeExampleSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openUser: false,
      // openNotification: false,
      // openMail: false,
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
  }
  render() {
    // const { loading } = this.props.data;
    // if (loading) return <div>Loading...</div>;
    //const avatar = this.props.me.avatar;
    let first = '';
    if (this.props.me !== undefined) {
      //console.log(this.props.me.firstname);
      first = this.props.me.firstname;
      //const avatar = this.props.me.avatar;
      //console.log(avatar);
    }
    const loadingRole = this.props.GET_ALL_ROLE_OF_USER.loading;
    if (loadingRole) return <Loading />;

    let isShow = [];
    const roles = this.props.GET_ALL_ROLE_OF_USER.getAllRolesOfUser;

    if (roles && roles.length > 0) {
      const rolesUserId = functions.getRolesId(roles);
      localStorage.setItem('roles', rolesUserId);
      isShow = functions.checkRoleAllComponents(rolesUserId);
    }

    return (
      <div className="menu">
        <style
          dangerouslySetInnerHTML={{
            __html: style,
          }}
        />
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
              {isShow['switch-conferences'] ? (
                <MenuItem
                  primaryText="Switch conference"
                  onClick={this.handleToggleConference}
                />
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
//<Avatar className="avatar" src={images.defaultAvatar} />
// <Avatar
// className="avatar"
// src={avatar ? S3_GET_PREFIX + avatar : images.defaultAvatar}
// />
