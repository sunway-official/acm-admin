import React from 'react';
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
// import ActionGrade from 'material-ui/svg-icons/action/grade';
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
          <ListItem
            className="item"
            primaryText="Information"
            leftIcon={<ActionInfoOutline />}
          />
          <ListItem
            className="item"
            primaryText="Schedule"
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
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.handleRequestClose}
              className="people"
            >
              <Menu>
                <MenuItem primaryText="Staff" />
                <MenuItem primaryText="Speaker" />
                <MenuItem primaryText="Author" />
                <MenuItem primaryText="Review" />
                <MenuItem primaryText="Participant" />
              </Menu>
            </Popover>
          </ListItem>
          <ListItem
            className="item"
            primaryText="Paper"
            leftIcon={<AvLibraryBooks />}
          />
          <ListItem
            className="item"
            primaryText="Newfeed"
            leftIcon={<ActionChromeReaderMode />}
          />
          <ListItem
            className="item"
            primaryText="Statistic"
            leftIcon={<EditorShowChart />}
          />
        </List>
      </div>
    );
  }
}

export default ListExampleSimple;
