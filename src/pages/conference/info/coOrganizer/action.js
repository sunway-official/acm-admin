import React, { Component } from 'react';
import { RaisedButton, Dialog } from 'material-ui';
import CoOrganizerInfo from './coOrganizerInfo';
import showResults from '../showResults';

export default class Index extends Component {
  state = {
    openEdit: false,
    openDelete: false,
  };
  c;

  handleOpenDelete = () => {
    this.setState({ openDelete: true });
  };
  handleOpenEdit = () => {
    this.setState({ openEdit: true });
  };

  handleClose = () => {
    this.setState({ openDelete: false, openEdit: false });
  };
  render() {
    const actions = [
      <RaisedButton label="Cancel" default={true} onClick={this.handleClose} />,
      <RaisedButton label="Submit" primary={true} onClick={showResults} />,
    ];
    return (
      <div>
        <RaisedButton
          label="Edit"
          primary={true}
          onClick={this.handleOpenEdit}
        />
        <Dialog
          title="Delete"
          actions={actions}
          modal={true}
          open={this.state.openEdit}
          onRequestClose={this.handleClose}
        >
          <CoOrganizerInfo onSubmit={showResults} />
        </Dialog>
        <RaisedButton
          label="Delete"
          default={true}
          onClick={this.handleOpenDelete}
        />
        <Dialog
          title="Delete"
          actions={actions}
          modal={true}
          open={this.state.openDelete}
          onRequestClose={this.handleClose}
        >
          Do you want to delete this Co-Organizer ?
        </Dialog>
      </div>
    );
  }
}
