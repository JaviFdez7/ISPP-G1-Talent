import { generateJWT } from '../helpers/handleJWT';
import { User, ProfessionalExperience } from '../models/user';
import { getModelForRole } from '../helpers/handleRoles';

export const getAllUser: any = async () => {
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

export const getProfessionalExperienceByUserId: any = async (userId: any) => {
  try {
    return await ProfessionalExperience.find({ userId: userId });
  } catch (error) {
    console.error('Error when obtaining professional experience:', error);
    throw error;
  }
};

export const createProfessionalExperience: any = async (data: any) => {
  try {
    const experience = new ProfessionalExperience(data);
    await experience.save();
    return experience;
  } catch (error) {
    console.error('Error inserting professional experience:', error);
    throw error;
  }
};

export const updateProfessionalExperience: any = async (id: any, data: any) => {
  try {
    const updatedExperience = await ProfessionalExperience.findByIdAndUpdate(id, data, { new: true });
    return updatedExperience;
  } catch (error) {
    console.error('Error updating professional experience:', error);
    throw error;
  }
};

export const deleteProfessionalExperience: any = async (id: any) => {
  try {
    await ProfessionalExperience.findByIdAndDelete(id);
    return 'Professional experience deleted successfully.';
  } catch (error) {
    console.error('Error deleting professional experience', error)
    throw error;
  }
};
export default {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getProfessionalExperienceByUserId,
  createProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience
};
