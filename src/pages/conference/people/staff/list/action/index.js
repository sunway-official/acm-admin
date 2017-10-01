import React, { Component } from 'react';
import { RaisedButton, Dialog } from 'material-ui';
import { Link } from 'react-router-dom';

export default class Index extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const actions = [
      <RaisedButton label="Cancel" default={true} onClick={this.handleClose} />,
      <RaisedButton label="Submit" primary={true} onClick={this.handleClose} />,
    ];
    return (
      <div>
        <Link to="/userProfile" className="link">
          <RaisedButton label="Edit" primary={true} />
        </Link>
        <RaisedButton label="Delete" default={true} onClick={this.handleOpen} />
        <Dialog
          title="Delete"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Do you want to delete this staff ?
        </Dialog>
      </div>
    );
  }
}
