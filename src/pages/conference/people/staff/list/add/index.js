import React, { Component } from 'react';
import { FloatingActionButton, Dialog, RaisedButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui';
import Status from '../status';
const tableData = [
  {
    name: 'Pham Van Tri',
  },
  {
    name: 'Le Thi Thuy Dung',
  },
  {
    name: 'Le Quoc Manh',
  },
  {
    name: 'Le Dinh Nhat Khanh',
  },
  {
    name: 'Ly Bao Khanh',
  },
  {
    name: 'Thai Thi Hong Minh',
  },
  {
    name: 'Lu Thanh Vinh',
  },
  {
    name: 'Tran Van Thuc',
  },
  {
    name: 'Ly Bao Khanh',
  },
  {
    name: 'Thai Thi Hong Minh',
  },
  {
    name: 'Lu Thanh Vinh',
  },
  {
    name: 'Tran Van Thuc',
  },
];
export default class Index extends Component {
  state = {
    open: false,
    fixedHeader: true,
    multiSelectable: true,
    showCheckboxes: true,
    height: '300px',
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const actions = [
      <RaisedButton label="Add" primary={true} onClick={this.handleClose} />,
      <RaisedButton label="Cancel" default={true} onClick={this.handleClose} />,
    ];
    return (
      <div>
        <FloatingActionButton onClick={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add New Staff"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>
                    <Status />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Dialog>
      </div>
    );
  }
}
