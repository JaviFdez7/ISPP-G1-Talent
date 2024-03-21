import { type AnalysisDocument, AnalysisModel } from '../models/analysis.model';
import { createNotification } from '../../notification/services/NotificationService';
import { Candidate, Representative } from '../../user/models/user';
import { GetUserAnaliseInfo } from './GitHubService';
import { verifyJWT } from '../../user/helpers/handleJWT';
// Default service functions
export const getAllAnalysis = async (): Promise<any[]> => {
  try {
    const analyses = await AnalysisModel.find().exec();
    return analyses;
  } catch (error) {
    throw new Error(`Error when getting all analyses: ${error}`);
  }
};

export const getAnalysisById: any = async (id: any, token: string) => {
  if (!id){
    throw new Error('A valid ID was not provided');
  }

  try {
    const analysis = await AnalysisModel.findById(id);
    if (!analysis){
      throw new Error(`Analysis with the ID: ${id} was not found`);
    }

    const representative = await Representative.findById(verifyJWT(token).sub);
    const candidate = await Candidate.findOne({ githubUser: analysis.githubUsername });
    if (representative !== null && candidate !== null) {
      await createNotification({
        representativeId: representative._id,
        candidateId: candidate._id,
        message: `${(representative as any).companyName} has seen your profile.`
      });
    }
    return analysis;
  } catch (error: any) {
    if (error instanceof Error)
      throw new Error(`Error when getting the analysis by ID: ${error.message}`);
    else
      throw new Error('Unknown error when getting the analysis by ID.');
  }
};
export const getAnalysisByGitHubUsername = async (githubUsername: string) => {
  if (!githubUsername){
    throw new Error('A valid GitHub username was not provided.');
  }

  try {
    const analysis = await AnalysisModel.findOne({ githubUsername });
    if (!analysis){
      throw new Error(`Analysis for the GitHub user: ${githubUsername} was not found`);
    }

    return analysis;
  } catch (error: any) {
    throw new Error(`Error when getting the analysis by GitHub username: ${error instanceof Error ? error.message : error}`);
  }
};
export const createAnalysis: any = async (githubUsername: string, token: string, user_apikey?: string) => {
  if (!githubUsername){
    throw new Error('A valid GitHub username was not provided.');
  }

  try {
    const analysis = await AnalysisModel.findOne({ githubUsername });
    const userInfo: AnalysisDocument = await GetUserAnaliseInfo(githubUsername, user_apikey);
    if (!analysis) {
      const userAnalysis = new AnalysisModel({
        githubUsername: userInfo.githubUsername,
        avatarUrl: userInfo.avatarUrl,
        followers: userInfo.followers,
        globalIssuesClosed: userInfo.globalIssuesClosed,
        contributions: userInfo.contributions,
        globalTopLanguages: userInfo.globalTopLanguages,
        globalTechnologies: userInfo.globalTechnologies,
        topRepositories: userInfo.topRepositories.map(repo => ({
          name: repo.name,
          url: repo.url,
          stars: repo.stars,
          forks: repo.forks,
          languages: repo.languages,
          technologies: repo.technologies
        }))
      });

      const savedRecord = await userAnalysis.save();

      return savedRecord;
    } else {
      const filter = { githubUsername };

      const updatedDocument = await AnalysisModel.findOneAndUpdate(filter, userInfo, { new: true, omitUndefined: true });
      const representative = await Representative.findById(verifyJWT(token).sub);
      const candidate = await Candidate.findOne({ githubUser: githubUsername });
      if (representative !== null && candidate !== null) {
        await createNotification({
          representativeId: representative._id,
          candidateId: candidate._id,
          message: `${(representative as any).companyName} has seen your profile.`
        });
      }
      return updatedDocument;
    }
  } catch (error) {
    console.error('Error saving analysis:', error);
    throw error;
  }
};

export const deleteAnalysis: any = async (githubUsername: string) => {
  if (!githubUsername)
    throw new Error('A valid GitHub username was not provided.');

  try {
    const deletedAnalysis = await AnalysisModel.findOneAndDelete({ githubUsername });

    if (!deletedAnalysis)
      throw new Error(`No analysis was found for the GitHub user: ${githubUsername}`);

    return deletedAnalysis;
  } catch (error: any) {
    if (error instanceof Error)
      throw new Error(`Error when deleting the analysis by username: ${error.message}`);
    else
      throw new Error('Unknown error when deleting the analysis by username.');
  }
};

export default {
  getAllAnalysis,
  getAnalysisById,
  getAnalysisByGitHubUsername,
  createAnalysis,
  deleteAnalysis
};
