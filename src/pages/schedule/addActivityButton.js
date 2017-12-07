import React from 'react';
import { FloatingActionButton, MenuItem, Menu, Popover } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';
import { Link } from 'react-router-dom';
const style = {
  marginTop: '20px',
  smallIcon: {
    width: 36,
    height: 36,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
};
class AddDialog extends React.PureComponent {
  state = {
    openAdd: false,
  };
  handleTouchTap = event => {
    event.preventDefault();
    this.setState({
      openAdd: true,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose = () => {
    this.setState({
      openAdd: false,
    });
  };

  render() {
    return (
      <div>
        <FloatingActionButton
          style={style}
          className="position-fixed"
          onClick={this.handleTouchTap}
          mini={true}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Popover
          open={this.state.openAdd}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <Link to="/conference/activities/addActivityPaper">
              <MenuItem primaryText="Add activity with paper" />
            </Link>
            <Link to="/conference/activities/addActivityTitle">
              <MenuItem primaryText="Add activity with title" />
            </Link>
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default AddDialog;
