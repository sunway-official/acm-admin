import React, { PureComponent } from 'react';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
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

import { conferenceCoOranizerActions } from 'store/ducks/conference/info/coOrganizer';
import CoOrganizerInfo from '../coOrganizer';
import { queries } from '../helpers';

class CoOrganizerList extends PureComponent {
  constructor() {
    super();

    this.state = {
      openDelete: false,
      coOrganizer: {},
      title: '',
      isAdding: false,
      isDeleting: false,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.handleOpenAdding = this.handleOpenAdding.bind(this);
    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpenAdding() {
    this.setState({ isAdding: true, title: 'Add new Co-Organizer' }, () => {
      this.props.toggleModalForm();
    });
  }
  handleOpenEdit(coOrganizer) {
    this.setState({ isAdding: false, title: 'Edit Information' }, () => {
      this.props.toggleModalForm();
    });
    this.setState({
      coOrganizer: coOrganizer,
    });
  }
  handleClose() {
    this.props.toggleModalForm();
  }
  handleOpenDelete(coOrganizerId, coOrganizerName) {
    this.setState({
      coOrganizerId: coOrganizerId,
      coOrganizerName: coOrganizerName,
      isDeleting: true,
    });
  }
  handleCloseDelete() {
    this.setState({ isDeleting: false });
  }
  async handleDelete() {
    try {
      await this.props.DELETE_COORGANIZER({
        variables: {
          id: this.state.coOrganizerId,
        },
        update: (store, { data: { deleteCoOrganizerDetail } }) => {
          const data = store.readQuery({
            query: queries.GET_CONFERENCE_BY_ID_QUERY,
          });
          data.getConferenceByID.coOrganizerDetails = this.props.coOrganizerDetails.filter(
            item => item.id !== this.state.coOrganizerId,
          );
          store.writeQuery({ query: queries.GET_CONFERENCE_BY_ID_QUERY, data });
        },
      });
      this.setState({
        isDeleting: false,
      });
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    const coOrganizerDetails = this.props.coOrganizerDetails;
    const conferenceId = this.props.conferenceId;
    //khai bao conference_id dua ben index (coOrganizerDetails)
    // [0] la de khai bao mac dinh la o conference dau tien
    const actionDelete = [
      <RaisedButton
        label="Yes"
        primary={true}
        onClick={this.handleDelete}
        type="submit"
      />,
      <RaisedButton label="No" onClick={this.handleCloseDelete} />,
    ];
    const actions = [
      <IconButton
        tooltip="No"
        className="cancel-btn dialog"
        onClick={this.handleClose}
      >
        <NavigationClose />
      </IconButton>,
    ];
    return (
      <div className="d-flex">
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
                        onClick={() => this.handleOpenEdit(coOrganizer)}
                      />
                      <RaisedButton
                        label="Delete"
                        onClick={() =>
                          this.handleOpenDelete(
                            coOrganizer.id,
                            coOrganizer.name,
                          )}
                      />
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Dialog
            title={<p>Do you want to delete {this.state.coOrganizerName} ?</p>}
            modal={true}
            onRequestClose={this.handleCloseDelete}
            open={this.state.isDeleting}
            actions={actionDelete}
          />

          <Dialog
            title={this.state.title}
            actions={actions}
            modal={true}
            open={this.props.openModalForm}
            onRequestClose={this.handleClose}
          >
            <CoOrganizerInfo
              coOrganizerDetails={this.state.coOrganizer}
              onSubmit={this.handleClose}
              isAdd={this.state.isAdding}
              conferenceId={conferenceId}
              //truyen conference_id qua ben conference info de cho xu ly conference dang dung dua tren id
            />
          </Dialog>
          <div className="d-flex btn-group">
            <RaisedButton
              label="Add Co-Organizer"
              primary={true}
              onClick={this.handleOpenAdding}
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

const mapStateToProps = state => ({
  openModalForm: state.conferenceCoOranizer.openCoOrganizerFormModal,
});

const mapDispatchToProps = dispatch => ({
  toggleModalForm: bindActionCreators(
    conferenceCoOranizerActions.toggleCoOrganizerFormModal,
    dispatch,
  ),
});

export default compose(
  graphql(DELETE_COORGANIZER, {
    name: 'DELETE_COORGANIZER',
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(CoOrganizerList);
