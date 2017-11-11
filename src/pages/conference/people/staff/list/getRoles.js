import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import GET_ALL_ROLES_BY_USER_ID from './helpers/getAllRolesByUserID';
class GetRoles extends Component {
  render() {
    const { loading, error } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>error</div>;
    }
    const roles = this.props.data.getAllRolesByUserID;
    return (
      <div>
        {roles.map(data => {
          console.log(data.role);
          return (
            <div key={data.role.id}>
              <div>{data.role.name}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default graphql(GET_ALL_ROLES_BY_USER_ID, {
  options: ownProps => ({
    variables: { user_id: ownProps.id },
  }),
})(GetRoles);
