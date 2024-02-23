// Default service functions
export const getAllUser: any = async () => {
  throw new Error('Not Implemented');
};

export const getUserById: any = async (id: any) => {
  throw new Error('Not Implemented, id: ' + id);
};

export const createUser: any = async (data: any) => {
  throw new Error('Not Implemented, data: ' + data);
};

export const updateUser: any = async (id: any, data: any) => {
  throw new Error('Not Implemented: id: ' + id + ', data: ' + data);
};

export const deleteUser: any = async (id: any) => {
  throw new Error('Not Implemented: id: ' + id);
};
export default {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
