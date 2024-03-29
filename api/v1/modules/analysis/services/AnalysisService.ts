import type { AnalysisDocument, RepositoryInfo }  from '../models/analysis.model';
import  {AnalysisModel} from '../models/analysis.model';
import { GetUserAnaliseInfo } from './GitHubService';
// Default service functions
export const getAllAnalysis = async (): Promise<any[]> => {
  try {
    const analyses = await AnalysisModel.find().exec();
    return analyses;
  } catch (error) {
    throw new Error(`Error when getting all analyses: ${error}`);
  }
};

export const getAnalysisById: any = async (id: any) => {
  if (!id) {
    throw new Error('A valid ID was not provided');
  }

  try {
    const analysis = await AnalysisModel.findById(id);
    if (!analysis) {
      throw new Error(`Analysis with the ID: ${id} was not found`);
    }
    return analysis;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error when getting the analysis by ID: ${error.message}`);
    } else {
      throw new Error('Unknown error when getting the analysis by ID.');
    }
  }
};
export const getAnalysisByGitHubUsername = async (githubUsername: string) => {
  if (!githubUsername) {
    throw new Error('A valid GitHub username was not provided.');
  }

  try {
    const analysis = await AnalysisModel.findOne({ githubUsername: githubUsername }); 
    if (!analysis) {
      throw new Error(`Analysis for the GitHub user: ${githubUsername} was not found`);
    }

    return analysis;
  } catch (error) {
    throw new Error(`Error when getting the analysis by GitHub username: ${error instanceof Error ? error.message : error}`);
  }
};
export const createAnalysis: any = async (githubUsername: string,user_apikey?: string) => {
  if (!githubUsername) {
    throw new Error('A valid GitHub username was not provided.');
  }
  try {
    const analysis = await AnalysisModel.findOne({ githubUsername: githubUsername }); 
    const userInfo: AnalysisDocument = await GetUserAnaliseInfo(githubUsername,user_apikey);
    if (!analysis) {

  
      const userAnalysis = new AnalysisModel({
        githubUsername: userInfo.githubUsername,
        avatarUrl: userInfo.avatarUrl,
        followers: userInfo.followers,
        contributions: userInfo.contributions,
        globalTopLanguages: userInfo.globalTopLanguages,
        globalTechnologies: userInfo.globalTechnologies,
        topRepositories: userInfo.topRepositories.map(repo => ({
          name: repo.name,
          url: repo.url,
          stars: repo.stars,
          forks: repo.forks,
          languages: repo.languages,
          technologies: repo.technologies,
        })),
      });

    const savedRecord = await userAnalysis.save();
  

 
    return savedRecord;
  }else{

    const filter = { githubUsername: githubUsername };

    const updatedDocument = await AnalysisModel.findOneAndUpdate(filter, userInfo, { new: true, omitUndefined: true  });
    return updatedDocument;
  }
  } catch (error) {
    console.error('Error saving analysis:', error);
    throw error; 
  }
};



export const deleteAnalysis: any = async (githubUsername: string) => {
  if (!githubUsername) {
    throw new Error('A valid GitHub username was not provided.');
  }

  try {
    const deletedAnalysis = await AnalysisModel.findOneAndDelete({ githubUsername: githubUsername });

    if (!deletedAnalysis) {
      throw new Error(`No analysis was found for the GitHub user: ${githubUsername}`);
    }

    return deletedAnalysis;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error when deleting the analysis by username: ${error.message}`);
    } else {
      throw new Error('Unknown error when deleting the analysis by username.');
    }
  }
};

async function main() {
  try {
    // Prueba getAllAnalysis
    console.log('Obteniendo todos los análisis...');
    const allAnalysis = await createAnalysis("JaviFdez7");
    console.log(allAnalysis)
  }catch (error) {
    console.error('Error durante las pruebas:', error);
  }
}
//main()

export default {
  getAllAnalysis,
  getAnalysisById,
  getAnalysisByGitHubUsername,
  createAnalysis,
  deleteAnalysis
};
