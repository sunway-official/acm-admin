import React, { Component } from 'react';
import { RaisedButton, Dialog } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { mutations, queries } from '../helpers';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const style = {
  textAlign: 'left',
  lineHeight: '200%',
  paddingLeft: '1vw',
};

const sorted = [
  {
    id: 'name',
    desc: true,
  },
];
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
    const columns = [
      {
        Header: 'ID',
        accessor: 'id', // String-based value accessors!
        minWidth: 100,
        filterable: false,
        Cell: props => <div className="id-column">{props.value}</div>, // Custom cell components!
      },
      {
        Header: 'Name',
        accessor: 'name', // String-based value accessors!
        maxWidth: 400,
        minWidth: 300,
        Cell: props => <div style={style}>{props.value}</div>, // Custom cell components!
      },
      {
        Header: 'Seats',
        accessor: 'seats',
        maxWidth: 400,
        minWidth: 300,
        Cell: props => <div style={style}>{props.value}</div>, // Custom cell components!
      },
      {
        Header: 'Status',
        accessor: 'status',
        maxWidth: 370,
        minWidth: 270,
        Cell: props => <div style={style}>{props.value}</div>, // Custom cell components!
      },
      {
        Header: 'Action',
        maxWidth: 400,
        minWidth: 300,
        filterable: false,
        accessor: 'id', // String-based value accessors!
        Cell: props => (
          <div className="action-column">
            <Link
              to={`/conference/rooms-management/room-detail/${props.value}`}
            >
              <RaisedButton
                label="Edit"
                primary={true}
                className="list-btn-action"
              />
            </Link>
            <RaisedButton
              label="Delete"
              onClick={() => this.handleOpenDelete(props.value)}
            />
          </div>
        ),
      },
    ];
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
          <ReactTable
            noDataText="Please add new room!"
            filterable
            resizable={false}
            data={listRoom}
            columns={columns}
            defaultSorted={sorted}
            defaultPageSize={5}
            //className="-striped -highlight"
          />
          <Dialog
            title="Do you want to delete this room?"
            modal={true}
            onRequestClose={this.handleClose}
            open={this.state.openDelete}
            actions={actionDelete}
          />
          <div className="d-flex btn-group list-btn-add">
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

// <Table fixedHeader={true} selectable={false}>
// <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
//   <TableRow>
//     <TableHeaderColumn className="index-column">
//       ID
//     </TableHeaderColumn>
//     <TableHeaderColumn>Name</TableHeaderColumn>
//     <TableHeaderColumn>Seat</TableHeaderColumn>
//     <TableHeaderColumn>Status</TableHeaderColumn>
//     <TableHeaderColumn>Actions</TableHeaderColumn>
//   </TableRow>
// </TableHeader>
// <TableBody displayRowCheckbox={false}>
//   {listRoom.map((room, index) => {
//     return (
//       <TableRow key={room.id}>
//         <TableRowColumn className="index-column">
//           {index + 1}
//         </TableRowColumn>
//         <TableRowColumn>{room.name}</TableRowColumn>
//         <TableRowColumn>{room.seats}</TableRowColumn>
//         <TableRowColumn>
//           {room.status === 'on' ? 'Available' : 'Not Available'}
//         </TableRowColumn>
//         <TableRowColumn>
//           <Link
//             to={`/conference/rooms-management/room-detail/${room.id}`}
//           >
//             <RaisedButton label="Edit" primary={true} />
//           </Link>
//           <RaisedButton
//             label="Delete"
//             onClick={() => this.handleOpenDelete(room.id)}
//           />
//         </TableRowColumn>
//       </TableRow>
//     );
//   })}
// </TableBody>
// </Table>
