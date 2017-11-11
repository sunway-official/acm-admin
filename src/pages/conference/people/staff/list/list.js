import React, { Component } from 'react';
import DialogEdit from './dialogEdit';
import GetRoles from './getRoles';
import { userActions } from 'store/ducks/user';
import { conferenceOperations } from 'store/ducks/conference';
import { connect } from 'react-redux';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  RaisedButton,
} from 'material-ui';
import { style } from './style.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.state = {
      openDialog: false,
      staffId: 0,
    };
  }
  handleOpenDialog(staff, staffId) {
    this.setState({ openDialog: !this.state.openDialog, staffId: staffId });
    this.props.setUser(staff);
    this.props.getConferenceId(this.props.conference_id);
  }
  handleClose = () => {
    this.setState({ openDialog: !this.state.openDialog });
  };

  render() {
    const staffs = this.props.staffs;
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
              {staffs.map((staff, index) => (
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
                      onClick={() => {
                        this.handleOpenDialog(staff, staff.id);
                      }}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogEdit
            openDialog={this.state.openDialog}
            handleClose={() => {
              this.handleClose();
            }}
            staff_id={this.state.staffId}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(userActions.setUser(user)),
    getConferenceId: conference_id =>
      dispatch(conferenceOperations.getIdOperation(conference_id)),
  };
};

export default connect(undefined, mapDispatchToProps)(List);
