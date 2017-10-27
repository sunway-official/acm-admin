import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import { GET_ALL_STAFF_IN_CONFERENCE } from './index';
import DialogEdit from './dialogEdit';

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
import { style } from './style.css';

class Index extends Component {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
  }
  state = {
    openDelete: false,
    openDialog: false,
    staff: {},
  };
  handleOpenDelete = UserId => {
    this.setState({ openDelete: true });
    this.setState({
      UserId: UserId,
    });
  };
  handleOpenDialog(staff) {
    this.setState({ openDialog: true, staff: staff });
  }
  handleClose = () => {
    this.setState({ openDelete: false, openDialog: false });
  };
  delete() {
    this.setState({ openDelete: false });
    const { DELETE_USER } = this.props;
    DELETE_USER({
      variables: {
        id: this.state.UserId,
      },
      update: (store, { data: { deleteUser } }) => {
        const data = store.readQuery({
          query: GET_ALL_STAFF_IN_CONFERENCE,
        });
        data.getAllStaffInConference = this.state.staff.filter(
          item => item !== this.state.staff,
        );
        store.writeQuery({ query: GET_ALL_STAFF_IN_CONFERENCE, data });
      },
    });
  }
  render() {
    const allStaff = this.props.allStaff;
    const actionDelete = [
      <RaisedButton
        label="Submit"
        primary={true}
        onClick={this.handleClose}
        type="submit"
      />,
      <RaisedButton label="Cancel" onClick={this.handleClose} />,
    ];
    return (
      <div className="d-flex">
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <div className="list staff">
          <Table fixedHeader={true}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>No.</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
                <TableHeaderColumn>Action</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {allStaff.map((staff, index) => (
                <TableRow key={staff.id}>
                  <TableRowColumn>{index + 1}</TableRowColumn>
                  <TableRowColumn>
                    {staff.firstname} {staff.lastname}
                  </TableRowColumn>
                  <TableRowColumn>{staff.email}</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      primary={true}
                      label="edit"
                      onClick={() => this.handleOpenDialog(staff)}
                    />
                    <RaisedButton
                      label="delete"
                      onClick={() => this.handleOpenDelete(staff.id)}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogEdit
            openDialog={this.state.openDialog}
            handleClose={() => this.handleClose()}
            allStaff={this.state.staff}
          />

          <Dialog
            title="Do you want to delete this staff?"
            modal={true}
            onRequestClose={this.handleClose}
            open={this.state.openDelete}
            actions={actionDelete}
          />
        </div>
      </div>
    );
  }
}
const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
export default graphql(DELETE_USER, {
  name: 'DELETE_USER',
})(Index);
