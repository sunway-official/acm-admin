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
} from 'material-ui/svg-icons';
import style from './style.css';
class ListExampleSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    // this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap = event => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
    // this.handleRequestClose();
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
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

export default ListExampleSimple;
