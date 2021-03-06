import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, Menu, MenuItem, Popover } from 'material-ui';
import { sidebarActions } from 'store/ducks/sidebar';

import {
  ActionInfoOutline,
  ActionSupervisorAccount,
  AvLibraryBooks,
  NotificationEventAvailable,
  HardwareKeyboardArrowRight,
  SocialLocationCity,
  EditorFormatListNumbered,
  AvWeb,
} from 'material-ui/svg-icons';
import style from './style.css';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { queries, functions } from '../helpers';
import { withRouter } from 'react-router';
import Loading from 'components/render/renderLoading';

class ListExampleSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openLanding: false,
      conference_id: 0,
    };
  }
  handleClickSidebar = () => {
    this.props.setSidebar();
  };
  handleTouchTap = event => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };
  handleLanding = event => {
    event.preventDefault();

    this.setState({
      openLanding: true,
      anchorLanding: event.currentTarget,
    });
  };
  handleRequestClose = () => {
    this.setState({
      open: false,
      openLanding: false,
    });
    this.props.setSidebar();
  };
  render() {
    const {
      loading,
      getLandingPageByConferenceId,
    } = this.props.GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY;
    const loadingRole = this.props.GET_ALL_ROLE_OF_USER.loading;
    if (loading || loadingRole) return <Loading />;
    let conference_id;
    let disableView = true;

    // check role and show component
    let isShow = [];
    const roles = this.props.GET_ALL_ROLE_OF_USER.getAllRolesOfUser;

    if (roles && roles.length > 0) {
      const rolesUserId = functions.getRolesId(roles);
      localStorage.setItem('roles', rolesUserId);
      isShow = functions.checkRoleAllComponents(rolesUserId);
    }
    // check role and show component

    if (
      this.props.auth.currentUser &&
      this.props.auth.currentUser.currentConference
    ) {
      conference_id = this.props.auth.currentUser.currentConference.id;
      if (getLandingPageByConferenceId) disableView = false;
    } else {
      conference_id = 0;
    }
    let view;
    view = !disableView ? (
      <Link to={`/landingpage/${conference_id}`}>
        <MenuItem
          className="item"
          primaryText={'View'}
          onClick={() => {
            this.handleRequestClose();
            window.location.reload();
          }}
        />
      </Link>
    ) : (
      ''
    );
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <List className="list">
          {isShow['conference-info'] ? (
            <Link to="/conference/info">
              <ListItem
                className="item"
                primaryText={'Information'}
                leftIcon={<ActionInfoOutline />}
                onClick={() => this.handleClickSidebar()}
              />
            </Link>
          ) : null}

          {isShow['activities'] ? (
            <Link to="/conference/activities">
              <ListItem
                className="item"
                primaryText={'Schedules'}
                leftIcon={<NotificationEventAvailable />}
                onClick={() => this.handleClickSidebar()}
              />
            </Link>
          ) : null}

          {isShow['people'] ? (
            <ListItem
              className="item"
              primaryText="People"
              leftIcon={<ActionSupervisorAccount />}
              onClick={this.handleTouchTap}
              rightIcon={<HardwareKeyboardArrowRight />}
            >
              <Popover
                open={this.state.open}
                className="people"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                onRequestClose={this.handleRequestClose}
              >
                <Menu style={{ color: 'black' }} className="menu people-menu">
                  <Link to="/conference/people/staff">
                    <MenuItem
                      className="item"
                      primaryText={'Staff'}
                      onClick={this.handleRequestClose}
                    />
                  </Link>
                  <Link to="/conference/people/participant-management">
                    <MenuItem
                      className="item"
                      primaryText={'Participant'}
                      onClick={this.handleRequestClose}
                    />
                  </Link>
                </Menu>
              </Popover>
            </ListItem>
          ) : null}

          {isShow['papers'] ? (
            <Link to="/conference/papers">
              <ListItem
                className="item"
                primaryText={'Papers'}
                leftIcon={<AvLibraryBooks />}
                onClick={() => this.handleClickSidebar()}
              />
            </Link>
          ) : null}
          {isShow['landing-page'] ? (
            <ListItem
              className="item landing-page"
              primaryText={'Landing Page'}
              leftIcon={<AvWeb />}
              onClick={this.handleLanding}
              rightIcon={<HardwareKeyboardArrowRight />}
            >
              <Popover
                open={this.state.openLanding}
                className="landing"
                anchorEl={this.state.anchorLanding}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                onRequestClose={this.handleRequestClose}
              >
                <Menu style={{ color: 'black' }}>
                  <Link to="/conference/landing-page-management">
                    <MenuItem
                      className="item"
                      primaryText={'Edit'}
                      onClick={this.handleRequestClose}
                    />
                  </Link>
                  {view}
                </Menu>
              </Popover>
            </ListItem>
          ) : null}
          {isShow['rooms'] ? (
            <Link to="/conference/rooms-management">
              <ListItem
                className="item"
                primaryText={'Rooms'}
                leftIcon={<SocialLocationCity />}
                onClick={() => this.handleClickSidebar()}
              />
            </Link>
          ) : null}
          {isShow['topics'] ? (
            <Link to="/conference/topics-management">
              <ListItem
                className="item"
                primaryText={'Topics'}
                leftIcon={<EditorFormatListNumbered />}
                onClick={() => this.handleClickSidebar()}
              />
            </Link>
          ) : null}
        </List>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  if (state.auth) {
    return {
      auth: state.auth,
      openSidebar: state.sidebar.openSidebar,
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setSidebar: () => dispatch(sidebarActions.setSidebar()),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  graphql(queries.GET_ALL_ROLE_OF_USER, {
    name: 'GET_ALL_ROLE_OF_USER',
  }),
  graphql(queries.GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY, {
    name: 'GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY',
  }),
)(ListExampleSimple);
