import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import { Toggle, ListItem } from 'material-ui';
import GET_ALL_ROLES_ACTIVE_BY_USER_ID_QUERY from './helpers/getAllRolesActiveByUserID';

class RolesInfo extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  state = {
    toggle: false,
  };

  async handleUpdate(role_id) {
    try {
      await this.props.UPDATE_STATUS_ROlE_OF_USER({
        variables: {
          user_id: this.props.id,
          role_id: role_id,
          status: 'on',
          conference_id: this.props.conference_id,
        },
        refetchQueries: [
          {
            query: GET_ALL_ROLES_ACTIVE_BY_USER_ID_QUERY,
            variables: {
              user_id: this.props.id,
              conference_id: this.props.conference_id,
            },
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }
  render() {
    const { loading, error, getAllRoles } = this.props.GET_ALL_ROLES;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>error</div>;
    }
    const allRoles = getAllRoles;
    const names = ['Participant', 'Organizer', 'Speaker'];
    return (
      <div>
        {allRoles.map(data => {
          if (names.includes(data.name)) {
            return <div key={data.id} />;
          } else {
            return (
              <ListItem
                key={data.id}
                primaryText={data.name}
                rightToggle={
                  <Toggle onToggle={() => this.handleUpdate(data.id)} />
                }
              />
            );
          }
        })}
      </div>
    );
  }
}

const GET_ALL_ROLES = gql`
  query getAllRoles {
    getAllRoles {
      id
      name
    }
  }
`;

const UPDATE_STATUS_ROlE_OF_USER = gql`
  mutation updateStatusRoleOfUser(
    $user_id: ID!
    $role_id: ID!
    $status: Status!
    $conference_id: ID!
  ) {
    updateStatusRoleOfUser(
      user_id: $user_id
      role_id: $role_id
      status: $status
      conference_id: $conference_id
    ) {
      id
    }
  }
`;

const mapStateToProps = state => {
  const userID = state.user.data.id;
  return {
    id: userID,
    roles: state.roles.data,
    conference_id: state.conference.id,
  };
};

export default compose(
  connect(mapStateToProps, undefined),
  graphql(UPDATE_STATUS_ROlE_OF_USER, {
    name: 'UPDATE_STATUS_ROlE_OF_USER',
  }),
  graphql(GET_ALL_ROLES, {
    name: 'GET_ALL_ROLES',
  }),
)(RolesInfo);
