import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui';
import Action from './action';

const tableData = [
  {
    name: 'asd',
    email: 'email',
    website: 'website',
    phoneNumber: 'phone',
  },
];
// const CoOrganizerList = ({ data: { loading, error, getConferenceByID } }) => {
//   if (loading) return <p>Loading ... </p>;
//   if (error) return <p>{error.message}</p>;
//   const data = getConferenceByID;
const CoOrganizerList = () => {
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
            {tableData.map(coOrganizer => (
              <TableRow key={coOrganizer.name}>
                <TableRowColumn>{coOrganizer.name}</TableRowColumn>
                <TableRowColumn>{coOrganizer.email}</TableRowColumn>
                <TableRowColumn>{coOrganizer.website}</TableRowColumn>
                <TableRowColumn>{coOrganizer.phone}</TableRowColumn>
                <TableRowColumn>
                  <Action />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// const GET_ALL_COORGANIZER_DETAILS = gql`
//   query getConferenceByID($id: ID!) {
//     getConferenceByID(id: $id) {
//       coOrganizerDetails {
//         id
//         name
//         email
//         website
//         phone
//       }
//     }
//   }
// `;

// export default graphql(GET_ALL_COORGANIZER_DETAILS, {
//   options: ownProps => ({ variables: { id: ownProps.match.params.id } }),
// })(CoOrganizerList);

export default CoOrganizerList;
