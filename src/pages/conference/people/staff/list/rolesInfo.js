import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { UPDATE_USER_ROLE_STATUS, GET_ALL_ROLES } from './helpers';

import functions from './helpers/functions';
import RoleItem from './roleItem';
import Loading from 'components/render/renderLoading';

class RolesInfo extends Component {
  render() {
    const { loading, error, getAllRoles } = this.props.GET_ALL_ROLES;

    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <div>error</div>;
    }
    const { roles } = this.props;
    const rolesActive = functions.getArrayRolesID(roles);
    const allRoles = functions.changeRoleStatus(
      functions.filterRole(getAllRoles),
      rolesActive,
    );
    return (
      <div>
        {allRoles.map((role, index) => {
          return (
            <div key={index}>
              <RoleItem role={role} rolesActive={rolesActive} roles={roles} />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roles: state.roles.data,
});

export default compose(
  connect(mapStateToProps, undefined),
  graphql(UPDATE_USER_ROLE_STATUS, {
    name: 'UPDATE_USER_ROLE_STATUS',
  }),
  graphql(GET_ALL_ROLES, {
    name: 'GET_ALL_ROLES',
  }),
)(RolesInfo);
