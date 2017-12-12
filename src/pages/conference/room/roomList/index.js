import React, { Component } from 'react';
import { RaisedButton, Dialog } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { mutations, queries } from '../helpers';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Loading from 'components/render/renderLoading';
import { alertOptions, MyExclamationTriangle, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';

const style = {
  textAlign: 'left',
  lineHeight: '200%',
  paddingLeft: '1vw',
};

const sorted = [
  {
    id: 'name',
    desc: false,
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
  showAlertError = text => {
    this.msg.error(text, {
      type: 'error', // type of alert
      icon: <MyExclamationTriangle />,
    });
  };
  showAlertSuccess = () => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
    });
  };
  handleOpenDelete(room_id) {
    this.setState({ openDelete: true });
    this.setState({
      room_id: room_id,
    });
  }
  handleClose() {
    this.setState({ openDelete: false });
  }
  async handleDelete() {
    this.setState({ openDelete: false });
    const { DELETE_ROOM_MUTATION } = this.props;
    try {
      await DELETE_ROOM_MUTATION({
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
      this.showAlertSuccess();
    } catch (error) {
      let temp = error.graphQLErrors[0].message;
      this.showAlertError(temp.substring(7, temp.length));
    }
  }
  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name', // String-based value accessors!
        minWidth: 100,
        Cell: props => <div style={style}>{props.value}</div>, // Custom cell components!
      },
      {
        Header: 'Seats',
        accessor: 'seats',
        minWidth: 100,
        Cell: props => <div className="center-column">{props.value}</div>, // Custom cell components!
      },
      {
        Header: 'Status',
        accessor: 'status',
        minWidth: 100,
        Cell: props => <div className="center-column">{props.value}</div>, // Custom cell components!
      },
      {
        Header: 'Action',
        minWidth: 100,
        filterable: false,
        accessor: 'id', // String-based value accessors!
        Cell: props => (
          <div className="action-column">
            <Link
              to={`/conference/rooms-management/room-detail/${props.value}`}
            >
              <RaisedButton label="Edit" primary={true} />
            </Link>
            <RaisedButton
              secondary={true}
              className="marginLeft"
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

    if (loading) return <Loading />;
    const listRoom = getRoomsByConferenceID;
    const actionDelete = [
      <RaisedButton
        label="Yes"
        primary={true}
        onClick={this.handleDelete}
        type="submit"
      />,
      <RaisedButton
        className="marginLeft"
        label="No"
        onClick={this.handleClose}
      />,
    ];
    return (
      <div className="react-table">
        <ReactTable
          noDataText="No rows found"
          filterable
          resizable={false}
          data={listRoom}
          columns={columns}
          defaultSorted={sorted}
          defaultPageSize={5}
          className="-striped -highlight"
        />
        <Dialog
          title="Do you want to delete this room?"
          modal={true}
          onRequestClose={this.handleClose}
          open={this.state.openDelete}
          actions={actionDelete}
        />
        <div className="d-flex justify-content-center btn-group list-btn-add">
          <Link to={`/conference/rooms-management/room-detail`}>
            <RaisedButton label="Add Room" primary={true} />
          </Link>
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
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
