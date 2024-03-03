// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express';
import AnalysisService from '../services/AnalysisService';
import dotenv from 'dotenv'

// Default controller functions
export const getAllAnalysis: any = async (req: Request, res: Response) => {
  try {
   
    const data = await AnalysisService.getAllAnalysis();
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const getAnalysisById: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await AnalysisService.getAnalysisById(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const getAnalysisByGitHubUsername: any = async (req: Request, res: Response) => {
  try {

    const githubUsername = (req.params.username).toString();

    const data = await AnalysisService.getAnalysisByGitHubUsername(githubUsername);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const createAnalysis: any = async (req: Request, res: Response) => {
  try {
 
    const githubUsername = req.body.username;
    let user_apikey = req.body.apikey;
    user_apikey = user_apikey || process.env.GH_TOKEN;
   
    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}`, {
        headers: {
          Authorization: `token ${user_apikey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Invalid API key or username does not exist.');
      }

      const userData = await response.json();
      console.log("User exists and API key is valid. User login:", userData.login);
    } catch (authError: any) {
      console.error("Error:", authError.message);
      return res.status(401).send(authError.message);
    }
    const data = await AnalysisService.createAnalysis(githubUsername,user_apikey);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};



export const deleteAnalysis: any = async (req: Request, res: Response) => {
  try {
    const githubUsername = req.params.username;
    const data = await AnalysisService.deleteAnalysis(githubUsername);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
export default {
  getAllAnalysis,
  getAnalysisById,
  getAnalysisByGitHubUsername,
  createAnalysis,
  deleteAnalysis
};
