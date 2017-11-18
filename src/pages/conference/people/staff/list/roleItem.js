import React, { Component } from 'react';
import { ListItem, Toggle } from 'material-ui';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import {
  GET_ALL_ROLES_ACTIVE_BY_USER_ID_QUERY,
  UPDATE_USER_ROLE_STATUS,
  GET_ALL_ROLES,
} from './helpers';
class RoleItem extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  async handleUpdate(role) {
    try {
      await this.props.UPDATE_USER_ROLE_STATUS({
        variables: {
          user_id: this.props.id,
          role_id: role.id,
          status: role.status === 'on' ? 'off' : 'on',
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
  state = {
    role: {},
  };
  render() {
    const role = this.props.role;
    const rolesActive = this.props.rolesActive;
    const roles = this.props.roles;
    return (
      <ListItem
        primaryText={role.name}
        rightToggle={
          <Toggle
            defaultToggled={rolesActive.includes(role.id) ? true : false}
            onToggle={() => this.handleUpdate(role)}
          />
        }
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    id: state.user.data.id,
    conference_id: state.conference.id,
  };
};
export default compose(
  connect(mapStateToProps, undefined),
  graphql(UPDATE_USER_ROLE_STATUS, {
    name: 'UPDATE_USER_ROLE_STATUS',
  }),
)(RoleItem);
