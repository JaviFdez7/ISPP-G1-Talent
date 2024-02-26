import { AnalysisModel,Analysis } from '../analysis.model';
import { GetUserAnaliseInfo } from './GitHubService';
// Default service functions
export const getAllAnalysis = async (): Promise<any[]> => {
  try {
    const analyses = await AnalysisModel.find().exec();
    return analyses;
  } catch (error) {
    throw new Error(`Error al obtener todos los análisis: ${error}`);
  }
};

export const getAnalysisById: any = async (id: any) => {
  if (!id) {
    throw new Error('No se proporcionó un ID válido.');
  }

  try {
    const analysis = await AnalysisModel.findById(id);
    if (!analysis) {
      throw new Error(`No se encontró el análisis con el ID: ${id}`);
    }
    return analysis;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener el análisis por ID: ${error.message}`);
    } else {
      throw new Error('Error desconocido al obtener el análisis por ID.');
    }
  }
};
export const getAnalysisByGitHubUsername = async (githubUsername: string) => {
  if (!githubUsername) {
    throw new Error('No se proporcionó un nombre de usuario de GitHub válido.');
  }

  try {
    const analysis = await AnalysisModel.findOne({ githubUsername: githubUsername }); 
    if (!analysis) {
      throw new Error(`No se encontró el análisis para el usuario de GitHub: ${githubUsername}`);
    }

    return analysis;
  } catch (error) {
    throw new Error(`Error al obtener el análisis por nombre de usuario de GitHub: ${error instanceof Error ? error.message : error}`);
  }
};
export const createAnalysis: any = async (githubUsername: string) => {
  try {
    
  const userInfo: Analysis = await GetUserAnaliseInfo(githubUsername);
  console.log(userInfo)
    const userAnalysis = new AnalysisModel({
      githubUsername: userInfo.githubUsername, 
      followers: userInfo.followers, 
      contributions: {
    
        totalCommits: userInfo.contributions.totalCommits,
        totalPullRequests: userInfo.contributions.totalPullRequests,
      },
      topRepositories: userInfo.topRepositories,
      topLanguages: userInfo.topLanguages,
      technologies: userInfo.technologies,
    });

    const savedRecord = await userAnalysis.save();

 
    return savedRecord;
  } catch (error) {
    console.error('Error saving analysis:', error);
    throw error; // Propagar el error para manejarlo más arriba si es necesario
  }
};

export const updateAnalysisByGitHubUsername: any = async (githubUsername: string) => {
  if (!githubUsername) {
    throw new Error('No se proporcionó un nombre de usuario de GitHub válido.');
  }

  try {
    const analysis = await AnalysisModel.findOne({ githubUsername: githubUsername }); 
    if (!analysis) {
      throw new Error(`No se encontró el análisis para el usuario de GitHub: ${githubUsername}`);
    }
    else{
      const userInfo: Analysis = await GetUserAnaliseInfo(githubUsername);

      const filter = { githubUsername: githubUsername };

      const updatedDocument = await AnalysisModel.findOneAndUpdate(filter, userInfo, { new: true, omitUndefined: true  });
      return updatedDocument;
      
    }
    return analysis;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener el análisis por ID: ${error.message}`);
    } else {
      throw new Error('Error desconocido al obtener el análisis por ID.');
    }
  }
};

export const deleteAnalysis: any = async (githubUsername: string) => {
  if (!githubUsername) {
    throw new Error('No se proporcionó un nombre de usuario de GitHub válido.');
  }

  try {
    const deletedAnalysis = await AnalysisModel.findOneAndDelete({ githubUsername: githubUsername });

    if (!deletedAnalysis) {
      throw new Error(`No se encontró ningún análisis para el usuario de GitHub: ${githubUsername}`);
    }

    return deletedAnalysis;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al eliminar el análisis por nombre de usuario: ${error.message}`);
    } else {
      throw new Error('Error desconocido al eliminar el análisis por nombre de usuario.');
    }
  }
};

async function main() {
  try {
    // Prueba getAllAnalysis
    console.log('Obteniendo todos los análisis...');
    const allAnalysis = await getAnalysisByGitHubUsername('JaviFdez7');
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
  updateAnalysisByGitHubUsername,
  deleteAnalysis
};
