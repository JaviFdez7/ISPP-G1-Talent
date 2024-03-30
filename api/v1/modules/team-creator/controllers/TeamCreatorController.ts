// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express';
import TeamCreatorService from '../services/TeamCreatorService';
import { verifyJWT } from '../../user/helpers/handleJWT';
// Default controller functions
/*
export const getAllTeamCreator: any = async (req: Request, res: Response) => {
  try {
    const data = await TeamCreatorService.getAllTeamCreator();
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
*/

export const getTeamCreatorById: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await TeamCreatorService.getTeamCreatorById(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
export const getAllTeamCreatorOfRepresentative: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await TeamCreatorService.getAllTeamCreatorOfRepresentative(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
export const createTeamCreator: any = async (req: Request, res: Response) => {
  try {
    
    const token = req.headers.authorization ?? '';
    const decodedToken = verifyJWT(token);
    const userId = decodedToken.sub;
    const data = await TeamCreatorService.createTeamCreator(req.body,userId);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};


export const deleteTeamCreator: any = async (req: Request, res: Response) => {
  try {
   
    const id = req.params.id;
    const data = await TeamCreatorService.deleteTeamCreator(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export default {
  //getAllTeamCreator,
  getTeamCreatorById,
  createTeamCreator,
  //deleteTeamCreator
};
