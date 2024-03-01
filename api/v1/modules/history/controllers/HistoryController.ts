// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express';
import HistoryService from '../services/HistoryService';
import { verifyJWT } from '../../user/helpers/handleJWT';
// Default controller functions
export const getHistoryFromUser: any = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization ?? '';
    const decodedToken = verifyJWT(token);
    const userId = decodedToken.sub;
    const data = await HistoryService.getHistoryFromUser(userId);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
export const getNotFavoritesFromUser: any = async (req: Request, res: Response) => {
  try {
    const data = await HistoryService.getNotFavoritesFromUser();
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
}



export const getFavoritesFromUser: any = async (req: Request, res: Response) => {
  try {
    const data = await HistoryService.getFavoritesFromUser();
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const createHistory: any = async (req: Request, res: Response) => {
  try {
    const data = await HistoryService.createHistory(req.body);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const markAsFavorite: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await HistoryService.toggleFavorite(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const updateHistory: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await HistoryService.updateHistory(id, req.body);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const deleteHistory: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await HistoryService.deleteHistory(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
export default {
  getHistoryFromUser,
  getNotFavoritesFromUser,
  createHistory,
  updateHistory,
  deleteHistory,
  markAsFavorite
};
