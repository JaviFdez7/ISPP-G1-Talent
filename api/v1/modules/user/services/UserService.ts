import { type Types } from 'mongoose';
import { encrypt, compare } from '../helpers/handleBcrypt';
import { generateJWT, verifyJWT } from '../helpers/handleJWT';
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

export const getAllUser: any = async () => {
  return await User.find({});
};

export const getUserById: any = async (id: any) => {
  return await User.findById(id);
};

export const createUser: any = async (data: any, role: string) => {
  try {
    const Model = getModelForRole(role);
    const password: string = data.password;
    const hash = await encrypt(password);
    data.password = hash;
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

export const loginUser: any = async (data: any) => {
  try {
    const username: string = data.username;
    const password: string = data.password;
    const user = await User.findOne({ username });

    if (!user) {
      return 'User not found';
    }

    const checkPassword = await compare(password, user.password);
    if (!checkPassword) {
      return 'Invalid password';
    }
    const token = generateJWT(user.email);
    const result = { token, user };
    return result;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
export default {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};
