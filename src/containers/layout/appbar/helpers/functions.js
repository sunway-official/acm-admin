import React from 'react';
import { ConferenceInfo } from './renders';

export const getRolesId = roles => {
  const rolesId = [];
  roles.forEach(data => {
    rolesId.push(data.role.id);
  });
  return rolesId;
};

export const checkRoleUser = (rolesUser, rolesComponent) => {
  for (let i = 0; i < rolesUser.length; i += 1) {
    const role = rolesUser[i];
    if (rolesComponent.includes(role)) return true;
  }
  return false;
};

/**
  1,'Organizer'
  2,'Speaker'
  3,'Moderator'
  4,'Supporter'
  5,'Ticket Checker'
  6,'Reviewer'
  7,'Author'
  8,'Participant'
 */

export const getRolesComponent = () => {
  return [
    {
      name: 'conference-info',
      roles: ['1', '2', '3', '4', '5', '6', '7', '8'],
      component: <ConferenceInfo />,
    },
    {
      name: 'activities',
      roles: ['1'],
      component: null,
    },
    {
      name: 'people',
      roles: ['1'],
      component: null,
    },
    {
      name: 'papers',
      roles: ['1', '7'],
      component: null,
    },
    {
      name: 'rooms',
      roles: ['1'],
      component: null,
    },
    {
      name: 'topics',
      roles: ['1'],
      component: null,
    },
  ];
};

export const checkRoleAllComponents = rolesUser => {
  console.log(rolesUser);
  const rolesComponents = getRolesComponent();
  const checkRolesComponents = [];
  rolesComponents.map(rolesComponent => {
    const checkRole = checkRoleUser(rolesUser, rolesComponent.roles);
    checkRolesComponents.push({
      name: rolesComponent.name,
      isShow: checkRole,
      component: checkRole ? rolesComponent.component : null,
    });
  });
  return checkRolesComponents;
};

export default {
  getRolesId,
  checkRoleUser,
  getRolesComponent,
  checkRoleAllComponents,
};
