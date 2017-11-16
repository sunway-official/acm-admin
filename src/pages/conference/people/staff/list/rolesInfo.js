import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { Toggle, ListItem } from 'material-ui';
import {
  GET_ALL_ROLES_ACTIVE_BY_USER_ID_QUERY,
  UPDATE_USER_ROLE_STATUS,
  GET_ALL_ROLES,
} from './helpers';

import functions from './helpers/functions';

const changeRoleStatus = (allRoles, rolesActive) => {
  const results = [];
  let temp = {};
  allRoles.map(role => {
    if (rolesActive.includes(role.id)) {
      temp = {
        id: role.id,
        name: role.name,
        status: 'on',
      };
    } else {
      temp = {
        id: role.id,
        name: role.name,
        status: 'off',
      };
    }
    results.push(temp);
  });
  return results;
};
const filterRole = allRoles => {
  const roleArrayNames = ['Participant', 'Organizer', 'Speaker'];
  const results = [];
  allRoles.map(role => {
    if (!roleArrayNames.includes(role.name)) {
      results.push(role);
    }
  });
  return results;
};
class RolesInfo extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  async handleUpdate(role) {
    console.log('update', role);
    try {
      await this.props.UPDATE_USER_ROLE_STATUS({
        variables: {
          user_id: this.props.id,
          role_id: role.id,
          status: role.status == 'on' ? 'off' : 'on',
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
    const { roles } = this.props;
    const rolesActive = functions.getArrayRolesID(roles);
    const allRoles = changeRoleStatus(filterRole(getAllRoles), rolesActive);
    console.log(allRoles);
    return (
      <div>
        {allRoles.map((role, index) => {
          return (
            <div key={index}>
              <ListItem
                primaryText={role.name}
                rightToggle={
                  <Toggle
                    defaultToggled={
                      rolesActive.includes(role.id) ? true : false
                    }
                    onToggle={() => this.handleUpdate(role)}
                  />
                }
              />
            </div>
          );
        })}
      </div>
    );
  }
}

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
  graphql(UPDATE_USER_ROLE_STATUS, {
    name: 'UPDATE_USER_ROLE_STATUS',
  }),
  graphql(GET_ALL_ROLES, {
    name: 'GET_ALL_ROLES',
  }),
)(RolesInfo);
