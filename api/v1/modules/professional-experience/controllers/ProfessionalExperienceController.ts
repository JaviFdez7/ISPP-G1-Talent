// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express';
import ProfessionalExperienceService from '../services/ProfessionalExperienceService';
import ProfessionalExperienceMiddleware from '../validators/ProfessionalExperienceMiddleware';

// Default controller functions
export const getAllProfessionalExperience: any = async (req: Request, res: Response) => {
  try {
    const data = await ProfessionalExperienceService.getAllProfessionalExperience();
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const getProfessionalExperienceById: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await ProfessionalExperienceService.getProfessionalExperienceById(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const createProfessionalExperience: any = async (req: Request, res: Response) => {
  try {
    const data = await ProfessionalExperienceService.createProfessionalExperience(req.body);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const updateProfessionalExperience: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await ProfessionalExperienceService.updateProfessionalExperience(id, req.body);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const deleteProfessionalExperience: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await ProfessionalExperienceService.deleteProfessionalExperience(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
export default {
  getAllProfessionalExperience,
  getProfessionalExperienceById,
  createProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience
};
