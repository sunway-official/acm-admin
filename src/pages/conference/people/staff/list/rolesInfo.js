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
          status: 'off',
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
    const roleArrayNames = ['Participant', 'Organizer', 'Speaker'];
    const allRolesId = allRoles.map(role => {
      console.log(role.id);
    });
    console.log(allRolesId);
    return (
      <div>
        {allRoles.map((role, index) => {
          if (roleArrayNames.includes(role.name)) {
            return <div key={index} />;
          } else {
            return (
              <div>
                {this.props.roles.map(data => {
                  return (
                    <ListItem
                      primaryText={role.name}
                      rightToggle={
                        <Toggle
                          defaultToggled={
                            role.id === data.role.id ? true : false
                          }
                          onToggle={() => this.handleUpdate(role.id)}
                        />
                      }
                    />
                  );
                })}
              </div>
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
    conference_id: state.conference.id,
    roles: state.roles.data,
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
