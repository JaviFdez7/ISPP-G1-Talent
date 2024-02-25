import mongoose from 'mongoose';
import Analysis from '../models/analysis';

// Default service functions
export const getAllAnalysis: any = async () => {
  return await Analysis.find({});
};

export const getAnalysisById: any = async (id: any) => {
  return await Analysis.findById(id);
};

export const createAnalysis: any = async (githubUsername: String,contributions:Number) => {
  try {
    const analysis = new Analysis({ githubUsername,contributions });

    await analysis.save();

    console.log('Analysis successfully inserted into the database');
  } catch (error) {
      console.error('Error inserting analysis:', error);
  }
};

//TODO
export const updateAnalysis: any = async (id: any, data: any) => {
  throw new Error('Not Implemented: id: ' + id + ', data: ' + data);
};

export const deleteAnalysis: any = async (id: any) => {
  await Analysis.findByIdAndDelete(id);
  return { message: 'Analysis deleted successfully' };
};
export default {
  getAllAnalysis,
  getAnalysisById,
  createAnalysis,
  updateAnalysis,
  deleteAnalysis
};
