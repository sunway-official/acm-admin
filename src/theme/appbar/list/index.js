import React from 'react';
import { List, ListItem } from 'material-ui';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import style from './style.css';
class ListExampleSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <List className="list">
          <ListItem
            className="item"
            primaryText="Inbox"
            leftIcon={<ContentInbox />}
          />
          <ListItem
            className="item"
            primaryText="Inbox"
            leftIcon={<ContentInbox />}
          />
          <ListItem
            className="item"
            primaryText="Inbox"
            leftIcon={<ContentInbox />}
          />
          <ListItem
            className="item"
            primaryText="Inbox"
            leftIcon={<ContentInbox />}
          />
          <ListItem
            className="item"
            primaryText="Starred"
            leftIcon={<ActionGrade />}
          />
        </List>
      </div>
    );
  }
}

export default ListExampleSimple;
