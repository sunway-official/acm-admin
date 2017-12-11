export const getArrayRolesID = roles => {
  const arr = [];
  roles.map(data => arr.push(data.role.id));

  return arr;
};
export const changeRoleStatus = (allRoles, rolesActive) => {
  const results = [];
  let temp = {};
  // eslint-disable-next-line array-callback-return
  allRoles.map(role => {
    // eslint-disable-next-line array-callback-return
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
export const filterRole = allRoles => {
  const roleArrayNames = ['Participant', 'Organizer', 'Speaker'];
  const results = [];
  // eslint-disable-next-line array-callback-return
  allRoles.map(role => {
    if (!roleArrayNames.includes(role.name)) {
      results.push(role);
    }
  });
  return results;
};
export default {
  getArrayRolesID,
  changeRoleStatus,
  filterRole,
};
