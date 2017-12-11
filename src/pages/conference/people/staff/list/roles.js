import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { queries } from '../helpers';
import { CircularProgress } from 'material-ui';
class GetRoles extends Component {
  render() {
    const { loading, error } = this.props.data;
    if (loading) {
      return (
        <div>
          <CircularProgress size={30} />
        </div>
      );
    }
    if (error) {
      return <div>error</div>;
    }
    let roles;
    if (this.props.data.getAllRolesActiveByUserID) {
      roles = this.props.data.getAllRolesActiveByUserID;
    }
    return (
      <div>
        {roles.map(data => {
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

export default graphql(queries.GET_ALL_ROLES_ACTIVE_BY_USER_ID_QUERY, {
  options: ownProps => ({
    variables: {
      user_id: ownProps.id,
      conference_id: ownProps.conference_id,
    },
  }),
})(GetRoles);
