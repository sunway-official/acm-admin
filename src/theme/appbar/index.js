import React from 'react';
import List from './list';
import Menu from './menu';
import { AppBar, Drawer, SvgIcon } from 'material-ui';
import style from './style.css';

const ReorderIcon = props => (
  <SvgIcon {...props}>
    <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z" />
  </SvgIcon>
);

const ClearIcon = props => (
  <SvgIcon {...props}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </SvgIcon>
);
export default class AppBarExampleIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <AppBar
          className="navbar"
          iconElementLeft={
            <ReorderIcon className="menu-icon" onClick={this.handleToggle} />
          }
        >
          <Drawer open={this.state.open}>
            <AppBar
              title="ACM"
              className="sidebar"
              iconElementLeft={<ClearIcon onClick={this.handleToggle} />}
            />
            <List />
          </Drawer>
          <Menu />
        </AppBar>
      </div>
    );
  }
}
