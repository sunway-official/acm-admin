import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, Menu, MenuItem, Popover } from 'material-ui';
import {
  ActionInfoOutline,
  ActionSupervisorAccount,
  // ActionChromeReaderMode,
  // AvLibraryBooks,
  // EditorShowChart,
  NotificationEventAvailable,
  HardwareKeyboardArrowRight,
  SocialLocationCity,
  EditorFormatListNumbered,
  AvWeb,
} from 'material-ui/svg-icons';
import style from './style.css';
import { connect } from 'react-redux';

class ListExampleSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openLanding: false,
    };
  }

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
  };
  render() {
    var conference_id;
    if (this.props.auth.currentUser) {
      conference_id = this.props.auth.currentUser.currentConference.id;
    }
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <List className="list">
          <Link to="/conference/info">
            <ListItem
              className="item"
              primaryText={'Information'}
              leftIcon={<ActionInfoOutline />}
            />
          </Link>
          <Link to="/conference/activities">
            <ListItem
              className="item"
              primaryText={'Activities management'}
              leftIcon={<NotificationEventAvailable />}
            />
          </Link>
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
                <Link to="/conference/1/people/staff">
                  <MenuItem
                    className="item"
                    primaryText={'Staff'}
                    onClick={this.handleRequestClose}
                  />
                </Link>
                {/*
               <MenuItem primaryText={<a href="/dashboard">Speaker</a>} />
                <MenuItem primaryText={<a href="/dashboard">Author</a>} />
                <MenuItem primaryText={<a href="/dashboard">Reviewer</a>} />
                <MenuItem primaryText={<a href="/dashboard">Participant</a>} />
              */}
              </Menu>
            </Popover>
          </ListItem>
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
              </Menu>
            </Popover>
          </ListItem>
          <Link to="/conference/rooms-management">
            <ListItem
              className="item"
              primaryText={'Rooms'}
              leftIcon={<SocialLocationCity />}
            />
          </Link>
          <Link to="/conference/topics-management">
            <ListItem
              className="item"
              primaryText={'Topics'}
              leftIcon={<EditorFormatListNumbered />}
            />
          </Link>
          <Link to="/conference/papers">
            <ListItem
              className="item"
              primaryText={'Papers management'}
              leftIcon={<NotificationEventAvailable />}
            />
          </Link>
          {/*
          <ListItem
            className="item"
            primaryText={<a href="/dashboard">Paper</a>}
            leftIcon={<AvLibraryBooks />}
          />
          <ListItem
            className="item"
            primaryText={<a href="/dashboard">Newfeed</a>}
            leftIcon={<ActionChromeReaderMode />}
          />
          <ListItem
            className="item"
            primaryText={<a href="/dashboard">Statistic</a>}
            leftIcon={<EditorShowChart />}
          />
          */}
        </List>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, undefined)(ListExampleSimple);
