// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express';
import ProfessionalExperienceService from '../services/ProfessionalExperienceService';
import { ApiResponse } from '../../../utils/ApiResponse';

// Default controller functions
export const getAllProfessionalExperience: any = async (req: Request, res: Response) => {
  try {
    const data = await ProfessionalExperienceService.getAllProfessionalExperience();
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

export const getProfessionalExperienceById: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await ProfessionalExperienceService.getProfessionalExperienceById(id);
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

export const createProfessionalExperience: any = async (req: Request, res: Response) => {
  try {
    const data = await ProfessionalExperienceService.createProfessionalExperience(req.body);
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

export const updateProfessionalExperience: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await ProfessionalExperienceService.updateProfessionalExperience(id, req.body);
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

export const deleteProfessionalExperience: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await ProfessionalExperienceService.deleteProfessionalExperience(id);
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
  getAllProfessionalExperience,
  getProfessionalExperienceById,
  createProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience
};