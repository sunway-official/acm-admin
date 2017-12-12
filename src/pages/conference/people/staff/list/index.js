import React, { Component } from 'react';
import Edit from '../edit';
import Roles from './roles';
import { userActions } from 'store/ducks/user';
import { conferenceOperations } from 'store/ducks/conference';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { RaisedButton } from 'material-ui';
import { queries } from '../helpers';
import { graphql, compose } from 'react-apollo';
import Loading from 'components/render/renderLoading';

const style = {
  textAlign: 'center',
  lineHeight: '200%',
};

const sorted = [
  {
    id: 'name',
    desc: true,
  },
];
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
    const {
      loading,
      getAllStaffInConference,
    } = this.props.GET_ALL_STAFF_IN_CONFERENCE;
    let staffs;
    if (getAllStaffInConference) {
      staffs = getAllStaffInConference;
    }
    if (loading)
      return (
        <div>
          <Loading />
        </div>
      );
    const conference_id = this.props.conference_id;
    const columns = [
      {
        Header: 'Name',
        accessor: 'firstname',
        minWidth: 400,
        Cell: props => <div style={style}>{props.value}</div>,
      },
      {
        Header: 'Mail',
        accessor: 'email',
        minWidth: 400,
        Cell: props => <div style={style}>{props.value}</div>,
      },
      {
        Header: 'Position',
        accessor: '',
        minWidth: 400,
        Cell: props => (
          <div style={style}>
            <Roles id={props.value.id} conference_id={conference_id} />
          </div>
        ),
      },
      {
        Header: 'Action',
        minWidth: 150,
        filterable: false,
        accessor: '',
        Cell: props => (
          <div style={style}>
            <RaisedButton
              label="Edit"
              primary={true}
              onClick={() => {
                this.handleOpenDialog(props.value, props.value.id);
              }}
            />
          </div>
        ),
      },
    ];
    return (
      <div className="react-table">
        <ReactTable
          filterable
          data={staffs}
          columns={columns}
          defaultSorted={sorted}
          defaultPageSize={10}
          className="-striped -highlight"
          showPaginationTop
        />
        <Edit
          openDialog={this.state.openDialog}
          handleClose={() => {
            this.handleClose();
          }}
          staff_id={this.state.staffId}
          conference_id={conference_id}
        />
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

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(queries.GET_ALL_STAFF_IN_CONFERENCE, {
    name: 'GET_ALL_STAFF_IN_CONFERENCE',
    options: ownProps => ({
      variables: { conference_id: ownProps.conference_id },
    }),
  }),
)(List);
