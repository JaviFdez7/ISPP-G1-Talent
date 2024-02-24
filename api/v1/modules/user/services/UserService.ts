import { User, Representative, Candidate } from '../models/user';

// Auxiliary function to obtain the appropriate model based on the role
const getModelForRole = (role: string) => {
  switch (role) {
    case 'Representative':
      return Representative;
    case 'Candidate':
      return Candidate;
    default:
      return User;
  }
};

export const getAllUser = async () => {
  return await User.find({});
};

export const getUserById: any = async (id: any) => {
  return await User.findById(id);
};

export const createUser: any = async (data: any, role: string) => {
  try {
    const Model = getModelForRole(role);
    const user = new Model(data);
    await user.save();
    return user;
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
};

export const updateUser: any = async (id: any, data: any, role: string) => {
  try {
    const Model = getModelForRole(role) as typeof User;
    const updatedUser = await Model.findByIdAndUpdate(id, data, { new: true });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser: any = async (id: any, role: string) => {
  try {
    const Model = getModelForRole(role) as typeof User;
    await Model.findByIdAndDelete(id);
    return 'User deleted successfully.';
  } catch (error) {
    console.error('Error deleting user', error)
    throw error;
  }

};
export default {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
