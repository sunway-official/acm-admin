import React, { Component } from 'react';
import { Toggle, ListItem } from 'material-ui';
class RolesInfo extends Component {
  render() {
    return (
      <div>
        <ListItem
          primaryText="Moderator"
          // rightToggle={<Toggle />}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem rightToggle={<Toggle />} key="1" primaryText="bar" />,
            <ListItem rightToggle={<Toggle />} key="2" primaryText="pub" />,
          ]}
        />
      </div>
    );
  }
}

export default RolesInfo;
