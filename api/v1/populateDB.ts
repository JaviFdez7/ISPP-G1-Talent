import { connect } from 'mongoose';
import { AnalysisModel } from './modules/analysis/models/analysis.model'; 
import { User,ProfessionalExperience } from './modules/user/models/user';
import { History } from './modules/history/models/history';
import fs from 'fs';

export async function populate() {
  const analysis_data = JSON.parse(fs.readFileSync('./populate_data/analysis_data.json', 'utf8'));
  const users_data = JSON.parse(fs.readFileSync('./populate_data/user_data.json', 'utf8'));
  const history_data = JSON.parse(fs.readFileSync('./populate_data/history_data.json', 'utf8'));
  const professional_experience_data = JSON.parse(fs.readFileSync('./populate_data/professional_experience_data.json', 'utf8'));


  try {
    await User.insertMany(users_data);
    await AnalysisModel.insertMany(analysis_data);
    await History.insertMany(history_data);
    await ProfessionalExperience.insertMany(professional_experience_data);
    console.log("Database successfully populated.");
  } catch (err) {
    console.error("Error populating the database:", err);
  }
}
