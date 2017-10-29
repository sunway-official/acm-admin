import React, { Component } from 'react';
import { graphql, gql, compose } from 'react-apollo';
import DialogEdit from './dialogEdit';
import GetRoles from './getRoles';
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

  render() {
    const { loading } = this.props.data;
    if (loading) return <div>Loading...</div>;
    // const roles = this.props.data.getAllRolesByUserID[0].role;
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
                <TableHeaderColumn>Mail</TableHeaderColumn>
                <TableHeaderColumn>Position</TableHeaderColumn>
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
                    <GetRoles id={staff.id} />
                  </TableRowColumn>
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
const GET_ALL_ROLES_BY_USER_ID = gql`
  query getAllRolesByUserID($user_id: ID!) {
    getAllRolesByUserID(user_id: $user_id) {
      role {
        name
      }
    }
  }
`;
export default compose(
  graphql(DELETE_USER, {
    name: 'DELETE_USER',
  }),
  graphql(GET_ALL_ROLES_BY_USER_ID, {
    options: ownProps => ({
      variables: { user_id: 1 },
      name: 'GET_ALL_ROLES_BY_USER_ID',
    }),
  }),
)(Index);
