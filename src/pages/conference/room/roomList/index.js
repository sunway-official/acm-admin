import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  RaisedButton,
} from 'material-ui';

class RoomList extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const listRoom = this.props.listRoom;
    return (
      <div className="d-flex">
        <div className="list staff">
          <Table fixedHeader={true}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Seat</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {listRoom.map((room, index) => {
                return (
                  <TableRow key={room.id}>
                    <TableRowColumn>{index + 1}</TableRowColumn>
                    <TableRowColumn>{room.name}</TableRowColumn>
                    <TableRowColumn>{room.seats}</TableRowColumn>
                    <TableRowColumn>
                      {room.status === 'on' ? 'Available' : 'Not Available'}
                    </TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton label="Edit" primary={true} />
                      <RaisedButton label="Delete" />
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="d-flex btn-group">
            <RaisedButton label="Add Room" primary={true} />
          </div>
        </div>
      </div>
    );
  }
}

export default RoomList;
