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
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { mutations, queries } from '../helpers';
import { connect } from 'react-redux';

class RoomList extends Component {
  constructor() {
    super();
    this.state = {
      openDelete: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleOpenDelete(room_id) {
    this.setState({ openDelete: true });
    this.setState({
      room_id: room_id,
    });
  }
  handleClose() {
    this.setState({ openDelete: false });
  }
  handleDelete() {
    this.setState({ openDelete: false });
    const { DELETE_ROOM_MUTATION } = this.props;
    DELETE_ROOM_MUTATION({
      variables: {
        id: this.state.room_id,
      },
      refetchQueries: [
        {
          query: queries.GET_ROOMS_BY_CONFERENCE_ID_QUERY,
          variables: {
            conference_id: this.props.id,
          },
        },
      ],
    });
  }
  render() {
    const {
      loading,
      getRoomsByConferenceID,
    } = this.props.GET_ROOMS_BY_CONFERENCE_ID_QUERY;

    if (loading) return <div>loading...</div>;
    const listRoom = getRoomsByConferenceID;
    const actionDelete = [
      <RaisedButton
        label="Yes"
        primary={true}
        onClick={this.handleDelete}
        type="submit"
      />,
      <RaisedButton label="No" onClick={this.handleClose} />,
    ];
    return (
      <div className="d-flex">
        <div className="list staff">
          <Table fixedHeader={true} selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn className="index-column">
                  ID
                </TableHeaderColumn>
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
                    <TableRowColumn className="index-column">
                      {index + 1}
                    </TableRowColumn>
                    <TableRowColumn>{room.name}</TableRowColumn>
                    <TableRowColumn>{room.seats}</TableRowColumn>
                    <TableRowColumn>
                      {room.status === 'on' ? 'Available' : 'Not Available'}
                    </TableRowColumn>
                    <TableRowColumn>
                      <Link
                        to={`/conference/rooms-management/room-detail/${room.id}`}
                      >
                        <RaisedButton label="Edit" primary={true} />
                      </Link>
                      <RaisedButton
                        label="Delete"
                        onClick={() => this.handleOpenDelete(room.id)}
                      />
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Dialog
            title="Do you want to delete this room?"
            modal={true}
            onRequestClose={this.handleClose}
            open={this.state.openDelete}
            actions={actionDelete}
          />
          <div className="d-flex btn-group">
            <Link to={`/conference/rooms-management/room-detail`}>
              <RaisedButton label="Add Room" primary={true} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};
export default compose(
  connect(mapStateToProps, undefined),
  graphql(mutations.DELETE_ROOM_MUTATION, {
    name: 'DELETE_ROOM_MUTATION',
  }),
  graphql(queries.GET_ROOMS_BY_CONFERENCE_ID_QUERY, {
    options: ownProps => ({
      variables: { conference_id: ownProps.id },
    }),
    name: 'GET_ROOMS_BY_CONFERENCE_ID_QUERY',
  }),
)(RoomList);
