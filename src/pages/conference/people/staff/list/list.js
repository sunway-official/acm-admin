import React, { Component } from 'react';
import DialogEdit from './dialogEdit';
import GetRoles from './getRoles';
import { userActions } from 'store/ducks/user';
import { conferenceOperations } from 'store/ducks/conference';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { RaisedButton } from 'material-ui';
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
    const conference_id = this.props.conference_id;
    const staffs = this.props.staffs;
    console.log(staffs);
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
        Cell: props => (
          <div style={style}>{props.value + console.log(props.value)}</div>
        ),
      },
      {
        Header: 'Position',
        accessor: '',
        minWidth: 400,
        Cell: props => (
          <div style={style}>
            <GetRoles id={props.value.id} conference_id={conference_id} />
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
        <DialogEdit
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

export default connect(undefined, mapDispatchToProps)(List);
