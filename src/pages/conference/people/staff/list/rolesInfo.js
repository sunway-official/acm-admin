import React, { Component } from 'react';
import { Toggle, ListItem } from 'material-ui';
class RolesInfo extends Component {
  state = {
    open1: false,
    open: false,
    toggled: true,
  };
  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleNestedListToggle = item => {
    this.setState({
      open: item.state.open1,
    });
  };
  handleToggle1 = () => {
    this.setState({ open1: !this.state.open1 });
  };

  handleNestedListToggle1 = item => {
    this.setState({
      open1: item.state.open1,
    });
  };
  render() {
    const roles = [
      {
        key: 1,
        primaryText: 'ABC',
        open: this.state.open,
        onNestedListToggle: this.handleNestedListToggle,
        onToggle: this.handleToggle,
        features: [
          {
            key: 1,
            primaryText: 'a',
          },
          {
            key: 2,
            primaryText: 'b',
          },
        ],
      },
      {
        key: 2,
        primaryText: 'DCD',
        open: this.state.open1,
        onNestedListToggle: this.handleNestedListToggle1,
        onToggle: this.handleToggle1,
        features: [
          {
            key: 3,
            primaryText: 'd',
          },
          {
            key: 4,
            primaryText: 'e',
          },
        ],
      },
    ];
    return (
      <div>
        {roles.map(role => {
          return (
            <div className="m-auto" style={{ width: '80%' }} key={role.key}>
              <ListItem
                className="123"
                primaryText={role.primaryText}
                open={role.open}
                onNestedListToggle={role.onNestedListToggle}
                rightToggle={
                  <Toggle
                    toggled={role.open}
                    onToggle={role.onToggle}
                    labelPosition="left"
                  />
                }
                nestedItems={role.features.map(feature => {
                  return (
                    <ListItem
                      className="Test"
                      key={feature.key}
                      primaryText={feature.primaryText}
                      rightToggle={
                        <Toggle defaultToggled={this.state.toggled} />
                      }
                      innerDivStyle={{ width: '75%' }}
                    />
                  );
                })}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default RolesInfo;
