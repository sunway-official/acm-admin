export const getArrayRolesID = roles => {
  const arr = [];
  roles.map(data => arr.push(data.role.id));

  return arr;
};

export default {
  getArrayRolesID,
};
