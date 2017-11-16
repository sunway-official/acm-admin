import React, { Component } from 'react';
import { Dialog, SelectField, MenuItem } from 'material-ui';
import { graphql, gql } from 'react-apollo';

class AddDialog extends Component {
  render() {
    const { loading, error, getAllUsers } = this.props.GET_ALL_USERS;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>error</div>;
    }
    const allUsers = getAllUsers;
    return (
      <Dialog open={this.props.open}>
        <SelectField>
          {allUsers.map((user, index) => {
            return (
              <MenuItem
                key={index}
                value={index}
                primaryText={user.lastname + ' ' + user.firstname}
              />
            );
          })}
        </SelectField>
      </Dialog>
    );
  }
}
const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      firstname
      lastname
    }
  }
`;
export default graphql(GET_ALL_USERS, {
  name: 'GET_ALL_USERS',
})(AddDialog);
