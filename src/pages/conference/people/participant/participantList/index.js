import React, { Component } from 'react';
import { RaisedButton, Dialog } from 'material-ui';
import * as moment from 'moment';
import ParticipantDetail from '../participantDetail';
import { ActionVisibility } from 'material-ui/svg-icons';
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
    desc: false,
  },
];
const customTitleStyle = {
  background: 'rgb(62, 85, 102)',
  color: '#FFFFFF',
};
class ParticipantList extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      openDelete: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
  }
  handleOpenDelete(participantDetail) {
    this.setState({ openDelete: true });
    this.setState({
      participantDetail: participantDetail,
    });
  }
  handleClose() {
    this.setState({ openDelete: false });
  }
  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: '', // String-based value accessors!
        minWidth: 100,
        Cell: props => (
          <div style={style}>
            {props.value.lastname} {props.value.firstname}
          </div> // Custom cell components!
        ),
      },
      {
        Header: 'Email',
        accessor: 'email',
        minWidth: 100,
        Cell: props => <div style={style}>{props.value}</div>, // Custom cell components!
      },
      {
        Header: 'Date Of Birth',
        accessor: 'dob',
        minWidth: 100,
        Cell: props => (
          <div className="center-column">
            {!props.value
              ? 'undefine'
              : moment(props.value).format('DD-MM-YYYY')}
          </div> // Custom cell components!
        ),
      },
      {
        Header: 'Action',
        minWidth: 100,
        filterable: false,
        accessor: '', // String-based value accessors!
        Cell: props => (
          <div className="action-column">
            <RaisedButton
              label="View Detail"
              default={true}
              onClick={() => this.handleOpenDelete(props.value)}
              icon={<ActionVisibility />}
            />
          </div>
        ),
      },
    ];
    const listParticipant = this.props.listParticipant;
    const closeDialog = [
      <RaisedButton label="Close" onClick={this.handleClose} />,
    ];
    return (
      <div className="react-table">
        <ReactTable
          noDataText="No row found"
          filterable
          resizable={false}
          data={listParticipant}
          columns={columns}
          defaultSorted={sorted}
          defaultPageSize={5}
          showPaginationTop
          className="-striped -highlight"
        />
        <Dialog
          title="Participant Information"
          modal={true}
          onRequestClose={this.handleClose}
          open={this.state.openDelete}
          actions={closeDialog}
          autoScrollBodyContent={true}
          titleStyle={customTitleStyle}
        >
          <ParticipantDetail participantDetail={this.state.participantDetail} />
        </Dialog>
      </div>
    );
  }
}

export default ParticipantList;
