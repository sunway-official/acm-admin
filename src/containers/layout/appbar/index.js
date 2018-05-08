import React from 'react';
import List from './list';
import MenuAppBar from './menu';
import { AppBar, Drawer } from 'material-ui';
import { ActionReorder } from 'material-ui/svg-icons';
import { images } from '../../../theme';
import { connect } from 'react-redux';
import './style.css';
import { sidebarActions } from 'store/ducks/sidebar';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => {
    // this.setState({ open: !this.state.open });
    this.props.setSidebar();
  };

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
        <AppBar
          className="navbar main"
          iconElementLeft={
            <ActionReorder
              style={{ color: 'grey' }}
              className="menu-icon"
              onClick={() => {
                this.handleToggle();
              }}
            />
          }
        >
          <img className="logo" src={images.defaultLogo} alt="logo" />
          <Drawer
            open={this.props.openModal}
            onRequestChange={() => this.handleToggle()}
            docked={false}
            className="over-flow-hide"
          >
            <AppBar
              title={
                <img
                  className="logo sidebar"
                  src={images.defaultLogoSidebar}
                  alt="logo"
                />
              }
              titleStyle={{ color: 'white', display: 'block' }}
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
const mapStateToProps = state => {
  return {
    openModal: state.sidebar.openModal,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setSidebar: () => dispatch(sidebarActions.setSidebar()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
