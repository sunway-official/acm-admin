import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, Menu, MenuItem, Popover } from 'material-ui';
import {
  ActionInfoOutline,
  ActionSupervisorAccount,
  ActionChromeReaderMode,
  AvLibraryBooks,
  EditorShowChart,
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
  }

  handleTouchTap = event => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
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
          <ListItem
            className="item"
            primaryText={<a href="/">Schedule</a>}
            leftIcon={<NotificationEventAvailable />}
          />
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
                <MenuItem primaryText={<a href="/">Speaker</a>} />
                <MenuItem primaryText={<a href="/">Author</a>} />
                <MenuItem primaryText={<a href="/">Reviewer</a>} />
                <MenuItem primaryText={<a href="/">Participant</a>} />
              </Menu>
            </Popover>
          </ListItem>
          <ListItem
            className="item"
            primaryText={<a href="/">Paper</a>}
            leftIcon={<AvLibraryBooks />}
          />
          <ListItem
            className="item"
            primaryText={<a href="/">Newfeed</a>}
            leftIcon={<ActionChromeReaderMode />}
          />
          <ListItem
            className="item"
            primaryText={<a href="/">Statistic</a>}
            leftIcon={<EditorShowChart />}
          />
        </List>
      </div>
    );
  }
}

export default ListExampleSimple;
