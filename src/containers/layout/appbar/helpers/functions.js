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
      component: 'conference-info',
      roles: ['1', '2', '3', '4', '5', '6', '7', '8'],
    },
    {
      component: 'switch-conferences',
      roles: ['1'],
    },
    {
      component: 'edit-conference-info',
      roles: ['1'],
    },
    {
      component: 'view-co-organizer',
      roles: ['1'],
    },
    {
      component: 'activities',
      roles: ['1'],
    },
    {
      component: 'people',
      roles: ['1'],
    },
    {
      component: 'papers',
      roles: ['1', '7'],
    },
    {
      component: 'rooms',
      roles: ['1'],
    },
    {
      component: 'topics',
      roles: ['1'],
    },
    {
      component: 'landing-page',
      roles: ['1'],
    },
  ];
};

export const checkRoleAllComponents = rolesUser => {
  const rolesComponents = getRolesComponent();
  const result = [];
  // eslint-disable-next-line
  rolesComponents.map(rolesComponent => {
    result[rolesComponent.component] = checkRoleUser(
      rolesUser,
      rolesComponent.roles,
    );
  });
  return result;
};

export default {
  getRolesId,
  checkRoleUser,
  getRolesComponent,
  checkRoleAllComponents,
};
