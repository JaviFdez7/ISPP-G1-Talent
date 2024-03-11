// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express';
import HistoryService from '../services/HistoryService';
import { verifyJWT } from '../../user/helpers/handleJWT';
import { ApiResponse } from '../../../utils/ApiResponse';

// Default controller functions
export const getHistoryFromUser: any = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const data = await HistoryService.getHistoryFromUser(userId);
    ApiResponse.sendSuccess(res, data, 200, {
      self: `${req.protocol}://${req.get('host')}${req.originalUrl}`
    });
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Internal Server Error',
      detail: error.message
    }]);
  }
};
export const getNotFavoritesFromUser: any = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const data = await HistoryService.getNotFavoritesFromUser(userId);
    ApiResponse.sendSuccess(res, data, 200, {
      self: `${req.protocol}://${req.get('host')}${req.originalUrl}`
    });
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Internal Server Error',
      detail: error.message
    }]);
  }
}



export const getFavoritesFromUser: any = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const data = await HistoryService.getFavoritesFromUser(userId);
    ApiResponse.sendSuccess(res, data, 200, {
      self: `${req.protocol}://${req.get('host')}${req.originalUrl}`
    });
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Internal Server Error',
      detail: error.message
    }]);
  }
}

export const createHistory: any = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const data = await HistoryService.createHistory(userId, req.body);
    ApiResponse.sendSuccess(res, data, 200, {
      self: `${req.protocol}://${req.get('host')}${req.originalUrl}`
    });
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Internal Server Error',
      detail: error.message
    }]);
  }
};

export const toogleFavorite: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await HistoryService.toggleFavorite(id);
    ApiResponse.sendSuccess(res, data, 200, {
      self: `${req.protocol}://${req.get('host')}${req.originalUrl}`
    });
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Internal Server Error',
      detail: error.message
    }]);
  }
}

export const updateHistory: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await HistoryService.updateHistory(id, req.body);
    ApiResponse.sendSuccess(res, data, 200, {
      self: `${req.protocol}://${req.get('host')}${req.originalUrl}`
    });
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Internal Server Error',
      detail: error.message
    }]);
  }
};

export const deleteHistory: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await HistoryService.deleteHistory(id);
    ApiResponse.sendSuccess(res, data, 200, {
      self: `${req.protocol}://${req.get('host')}${req.originalUrl}`
    });
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Internal Server Error',
      detail: error.message
    }]);
  }
};
export default {
  getHistoryFromUser,
  getNotFavoritesFromUser,
  createHistory,
  updateHistory,
  deleteHistory,
  markAsFavorite: toogleFavorite
};
