// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express';
import NotificationService from '../services/NotificationService';
import { ApiResponse } from '../../../utils/ApiResponse';

// Default controller functions
export const getAllNotification: any = async (req: Request, res: Response) => {
  try {
    const data = await NotificationService.getAllNotification();
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
export const getNotificationsOfCandidate: any = async (req: Request, res: Response) => {
  try {
    const candidateId = req.params.id;
    const data = await NotificationService.getNotificationsByCandidateId(candidateId);
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

export const getNotificationById: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await NotificationService.getNotificationById(id);
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

export const createNotification: any = async (req: Request, res: Response) => {
  try {
    const data = await NotificationService.createNotification(req.body);
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

export const updateNotification: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await NotificationService.updateNotification(id, req.body);
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

export const deleteNotification: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await NotificationService.deleteNotification(id);
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
  getAllNotification,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
};
