import { IconButton, Menu, MenuItem, Popover } from 'material-ui';
import { HardwareKeyboardArrowDown } from 'material-ui/svg-icons';
import { Component } from 'react';
import React from 'react';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AppBar } from 'material-ui';
// import { ActionReorder } from 'material-ui/svg-icons';
import { images } from './../../../theme';

// import { images } from '../../../../';
import style from './../style.css';

class DashboardMenu extends Component {
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

  handleTouchTapUser = event => {
    event.preventDefault();

    this.setState({
      openUser: true,
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
        <AppBar className="navbar menu-dashboard">
          <img className="logo" src={images.defaultLogo} alt="logo" />
          <div className="space" />
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
                <MenuItem primaryText="Sign out" onClick={this.handleSignOut} />
              </Menu>
            </Popover>
          </div>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  me: state.auth.currentUser,
});

export default compose(withRouter, withApollo, connect(mapStateToProps))(
  DashboardMenu,
);
//<Avatar className="avatar" src={images.defaultAvatar} />
