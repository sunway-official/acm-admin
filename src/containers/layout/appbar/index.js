import React from 'react';
import List from './list';
import MenuAppBar from './menu';
import { AppBar, Drawer } from 'material-ui';
import { ActionReorder } from 'material-ui/svg-icons';
import { images } from '../../../theme';

import style from './style.css';

export default class AppBarExampleIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleTouchTap = event => {
    event.preventDefault();

    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <AppBar
          className="navbar main"
          iconElementLeft={
            <ActionReorder
              style={{ color: 'grey' }}
              className="menu-icon"
              onClick={this.handleToggle}
            />
          }
        >
          <img className="logo" src={images.defaultLogo} alt="logo" />
          <Drawer
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
            docked={false}
          >
            <AppBar
              title="ACM"
              className="sidebar"
              onClick={this.handleToggle}
            />
            <List />
          </Drawer>
          <MenuAppBar />
        </AppBar>
      </div>
    );
  }
}
