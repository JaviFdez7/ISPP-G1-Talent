import { ProfessionalExperience } from '../models/professional-experience';

export const getAllProfessionalExperience: any = async () => {
  return await ProfessionalExperience.find({});
};

export const getProfessionalExperienceById: any = async (id: any) => {
  return await ProfessionalExperience.findById(id);
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
  getAllProfessionalExperience,
  getProfessionalExperienceById,
  createProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience
};
