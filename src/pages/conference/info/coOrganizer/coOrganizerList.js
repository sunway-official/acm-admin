import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  RaisedButton,
  Dialog,
} from 'material-ui';
import CoOrganizerInfo from './coOrganizerInfo';

class CoOrganizerList extends Component {
  state = {
    openEdit: false,
    openDelete: false,
    coOrganizer: {},
  };

  handleOpenDelete = () => {
    this.setState({ openDelete: true });
  };
  handleOpenEdit = coOrganizer => {
    this.setState({ openEdit: true });
    this.setState({
      coOrganizer: coOrganizer,
    });
  };

  handleClose = () => {
    this.setState({ openDelete: false, openEdit: false });
  };
  render() {
    const data = this.props.coOrganizerDetails;
    const actions = [
      <RaisedButton label="Cancel" default={true} onClick={this.handleClose} />,
      <RaisedButton label="Submit" primary={true} />,
    ];
    return (
      <div className="d-flex">
        <div className="list staff">
          <Table fixedHeader={true}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Website</TableHeaderColumn>
                <TableHeaderColumn>Phone-number</TableHeaderColumn>
                <TableHeaderColumn>Action</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {data.map(coOrganizer => {
                return (
                  <TableRow key={coOrganizer.id}>
                    <TableRowColumn>{coOrganizer.name}</TableRowColumn>
                    <TableRowColumn>{coOrganizer.email}</TableRowColumn>
                    <TableRowColumn>{coOrganizer.website}</TableRowColumn>
                    <TableRowColumn>{coOrganizer.phone}</TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton
                        label="edit"
                        primary={true}
                        onClick={() => this.handleOpenEdit(coOrganizer)}
                      />
                      <Dialog
                        title="Edit"
                        actions={actions}
                        modal={true}
                        open={this.state.openEdit}
                        onRequestClose={this.handleClose}
                      >
                        <CoOrganizerInfo data={this.state.coOrganizer} />
                      </Dialog>
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default CoOrganizerList;
