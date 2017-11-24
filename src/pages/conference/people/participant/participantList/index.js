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
import * as moment from 'moment';
import ParticipantDetail from '../participantDetail';

const customTitleStyle = {
  background: 'rgb(255, 87, 34)',
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
    const listParticipant = this.props.listParticipant;
    const closeDialog = [
      <RaisedButton label="Close" onClick={this.handleClose} />,
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
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Date Of Birth</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {listParticipant.map((participant, index) => {
                const participantDetail = participant;
                return (
                  <TableRow key={participant.id}>
                    <TableRowColumn className="index-column">
                      {index + 1}
                    </TableRowColumn>
                    <TableRowColumn>
                      {participant.lastname} {participant.firstname}
                    </TableRowColumn>
                    <TableRowColumn>{participant.email}</TableRowColumn>
                    <TableRowColumn>
                      {!participant.dob
                        ? 'undefine'
                        : moment(participant.dob).format('DD-MM-YYYY')}
                    </TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton
                        label="View Detail"
                        primary={true}
                        onClick={() => this.handleOpenDelete(participantDetail)}
                      />
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Dialog
            title="Participant Information"
            modal={true}
            onRequestClose={this.handleClose}
            open={this.state.openDelete}
            actions={closeDialog}
            autoScrollBodyContent={true}
            titleStyle={customTitleStyle}
          >
            <ParticipantDetail
              participantDetail={this.state.participantDetail}
            />
          </Dialog>
        </div>
      </div>
    );
  }
}

export default ParticipantList;
