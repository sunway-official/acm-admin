import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { style } from '../style.css';
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
  state = {
    openEdit: false,
    openDelete: false,
    coOrganizer: {},
  };

  handleOpenDelete = () => {
    this.setState({ openDelete: true });
  };
  handleOpenEdit = coOrganizer => {
    this.setState({ openEdit: true });
    this.setState({
      coOrganizer: coOrganizer,
    });
  };

  handleClose = () => {
    this.setState({ openDelete: false, openEdit: false });
  };
  render() {
    const data = this.props.coOrganizerDetails;
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
              {data.map(coOrganizer => {
                return (
                  <TableRow key={coOrganizer.id}>
                    <TableRowColumn>{coOrganizer.name}</TableRowColumn>
                    <TableRowColumn>{coOrganizer.email}</TableRowColumn>
                    <TableRowColumn>{coOrganizer.website}</TableRowColumn>
                    <TableRowColumn>{coOrganizer.phone}</TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton
                        label="edit"
                        primary={true}
                        onClick={() => this.handleOpenEdit(coOrganizer)}
                      />
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Dialog
            title="Edit Information"
            actions={actions}
            modal={true}
            open={this.state.openEdit}
            onRequestClose={this.handleClose}
          >
            <CoOrganizerInfo data={this.state.coOrganizer} />
          </Dialog>
        </div>
      </div>
    );
  }
}

const insertCoOrganizerDetail = gql`
  mutation insertCoOrganizerDetail(
    $name: String!
    $email: String!
    $website: String!
    $phone: String!
  ) {
    insertCoOrganizerDetail(
      name: $name
      email: $email
      website: $website
      phone: $phone
    ) {
      id
      name
      email
      website
      phone
    }
  }
`;

export default graphql(insertCoOrganizerDetail)(CoOrganizerList);
