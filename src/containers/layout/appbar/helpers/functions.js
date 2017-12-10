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

export default {
  getRolesId,
  checkRoleUser,
};
