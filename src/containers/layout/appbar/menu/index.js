import { Avatar, IconButton, Menu, MenuItem, Popover } from 'material-ui';
import { HardwareKeyboardArrowDown } from 'material-ui/svg-icons';
import { Component } from 'react';
import React from 'react';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { AppBar, Drawer } from 'material-ui';
import ConfMgtSidebar from '../../../../pages/conference/add';

import { images } from '../../../../theme';
import style from './style.css';
const S3_GET_PREFIX = process.env.REACT_APP_S3_GET_PREFIX;

//import { graphql, gql } from 'react-apollo';

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
    //console.log(avatar);
    let first = '';
    let avatar = '';
    if (this.props.me !== undefined) {
      //console.log(this.props.me.firstname);
      first = this.props.me.firstname;
      //const avatar = this.props.me.avatar;
      //console.log(avatar);
    }
    return (
      <div className="menu">
        <style
          dangerouslySetInnerHTML={{
            __html: style,
          }}
        />
        <div className="badge user" onClick={this.handleTouchTapUser}>
          <Avatar
            className="avatar"
            src={avatar ? S3_GET_PREFIX + avatar : images.defaultAvatar}
          />
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
              <MenuItem
                primaryText="Switch conference"
                onClick={this.handleToggleConference}
              />
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
          <ConfMgtSidebar />
        </Drawer>
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
//<Avatar className="avatar" src={images.defaultAvatar} />
