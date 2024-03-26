import { generateJWT } from '../helpers/handleJWT';
import { User } from '../models/user';
import { ProfessionalExperience } from '../../professional-experience/models/professional-experience';

import { getModelForRole } from '../helpers/handleRoles';
import { createAnalysis } from '../../analysis/services/AnalysisService';

export const getAllUser: any = async () => await User.find({});

export const getUserById: any = async (id: any) => await User.findById(id);

export const getProfessionalExperiencesByUserId: any = async (userId: any) => {
  try {
    return await ProfessionalExperience.find({ userId });
  } catch (error) {
    console.error('Error when obtaining professional experience:', error);
    throw error;
  }
};

export const createUser: any = async (data: any, role: string) => {
  try {
    const Model = getModelForRole(role);
    if (role === 'Candidate') {
      const analysis = await createAnalysis(data?.githubUser, data?.githubToken);
      data.analisisId=analysis._id;
    }
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

export const updateUserProfilePicture: any = async (id: any, picture: string) => {
  try {
    const updatedUser = await Candidate.findByIdAndUpdate(id, { profilePicture: picture }, { new: true });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user profile picture:', error);
    throw error;
  }
};

export const updateUserPassword: any = async (id: any, password: string) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { password }, { new: true });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user password:', error);
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
    const user = await User.findOne({ username: data.username });
    const id = user?._id.toString();
    const token = generateJWT(id);
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
  getProfessionalExperiencesByUserId,
  createUser,
  updateUser,
  updateUserProfilePicture,
  updateUserPassword,
  deleteUser,
  loginUser
};
