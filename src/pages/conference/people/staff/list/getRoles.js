import React from 'react';
import { graphql, gql } from 'react-apollo';

const GetRoles = props => {
  const { loading, error } = props.data;
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  const roles = props.data.getAllRolesByUserID;
  return (
    <div>
      {roles.map(role => {
        return (
          <div key={role.role.id}>
            <div>{role.role.name}</div>
          </div>
        );
      })}
    </div>
  );
};

const GET_ALL_ROLES_BY_USER_ID = gql`
  query getAllRolesByUserID($user_id: ID!) {
    getAllRolesByUserID(user_id: $user_id) {
      role {
        name
        id
      }
    }
  }
`;

export default graphql(GET_ALL_ROLES_BY_USER_ID, {
  options: ownProps => ({
    variables: { user_id: ownProps.id },
    name: GET_ALL_ROLES_BY_USER_ID,
  }),
})(GetRoles);
