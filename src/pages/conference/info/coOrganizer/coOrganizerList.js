import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { GET_CONFERENCE_BY_ID_QUERY } from '../index';
import { style } from './style.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  RaisedButton,
  Dialog,
  IconButton,
} from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons';
import CoOrganizerInfo from './coOrganizerInfo';

class CoOrganizerList extends Component {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
  }

  state = {
    openEdit: false,
    openDelete: false,
    openAdd: false,
    coOrganizer: {},
  };

  handleOpenDelete = coOrganizerId => {
    this.setState({ openDelete: true });
    this.setState({
      coOrganizerId: coOrganizerId,
    });
  };
  handleOpen = (coOrganizer, isAdd) => {
    if (isAdd) {
      this.setState({ openAdd: true });
    } else {
      this.setState({ openEdit: true });
    }
    this.setState({
      coOrganizer: coOrganizer,
    });
  };

  handleClose = () => {
    this.setState({ openDelete: false, openEdit: false, openAdd: false });
  };
  delete() {
    this.setState({ openDelete: false });
    // console.log(this.props.coOrganizerDetails[2].id);
    const { DELETE_COORGANIZER } = this.props;
    DELETE_COORGANIZER({
      variables: {
        id: this.state.coOrganizerId,
      },
      update: (store, { data: { deleteCoOrganizerDetail } }) => {
        const data = store.readQuery({
          query: GET_CONFERENCE_BY_ID_QUERY,
        });
        data.getConferenceByID.coOrganizerDetails = this.state.coOrganizer.filter(
          item => item !== this.state.coOrganizer,
        );
        store.writeQuery({ query: GET_CONFERENCE_BY_ID_QUERY, data });
      },
    });
  }
  render() {
    const coOrganizerDetails = this.props.coOrganizerDetails;
    const conferenceId = coOrganizerDetails[0].conference.id;
    //khai bao conference_id dua ben index (coOrganizerDetails)
    // [0] la de khai bao mac dinh la o conference dau tien
    const actionsDelete = [
      <RaisedButton
        label="Submit"
        primary={true}
        onClick={this.delete}
        type="submit"
      />,
      <RaisedButton label="Cancel" onClick={this.handleClose} />,
    ];
    const actions = [
      <IconButton
        tooltip="Close"
        className="cancel-btn dialog"
        onClick={this.handleClose}
      >
        <NavigationClose />
      </IconButton>,
    ];
    return (
      <div className="d-flex">
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <div className="list staff">
          <Table fixedHeader={true}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Website</TableHeaderColumn>
                <TableHeaderColumn>Phone-number</TableHeaderColumn>
                <TableHeaderColumn>Action</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {coOrganizerDetails.map(coOrganizer => {
                return (
                  <TableRow key={coOrganizer.id}>
                    <TableRowColumn>{coOrganizer.name}</TableRowColumn>
                    <TableRowColumn>{coOrganizer.email}</TableRowColumn>
                    <TableRowColumn>{coOrganizer.website}</TableRowColumn>
                    <TableRowColumn>{coOrganizer.phone}</TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton
                        label="Edit"
                        primary={true}
                        onClick={() => this.handleOpen(coOrganizer)}
                      />
                      <RaisedButton
                        label="Delete"
                        onClick={() => this.handleOpenDelete(coOrganizer.id)}
                      />
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Dialog
            title="Do you want to delete this Co-Organizer?"
            modal={true}
            onRequestClose={this.handleClose}
            open={this.state.openDelete}
            actions={actionsDelete}
          />

          <Dialog
            title="Edit Information"
            actions={actions}
            modal={true}
            open={this.state.openEdit || this.state.openAdd}
            onRequestClose={this.handleClose}
          >
            <CoOrganizerInfo
              coOrganizerDetails={this.state.coOrganizer}
              onSubmit={this.handleClose}
              isAdd={this.state.openAdd}
              isEdit={this.state.openEdit}
              conferenceId={conferenceId}
              //truyen conference_id qua ben conference info de cho xu ly conference dang dung dua tren id
            />
          </Dialog>
          <div className="d-flex btn-group">
            <RaisedButton
              label="Add Co-Organizer"
              primary={true}
              onClick={() =>
                this.handleOpen(this.props.coOrganizerDetails, true)}
            />
          </div>
        </div>
      </div>
    );
  }
}

const DELETE_COORGANIZER = gql`
  mutation deleteCoOrganizerDetail($id: ID!) {
    deleteCoOrganizerDetail(id: $id) {
      id
      name
      email
      website
      phone
      conference {
        id
      }
    }
  }
`;
export default graphql(DELETE_COORGANIZER, {
  name: 'DELETE_COORGANIZER',
})(CoOrganizerList);
