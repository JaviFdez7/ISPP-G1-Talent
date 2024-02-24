// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express';
import AnalysisService from '../services/AnalysisService';

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

export const createAnalysis: any = async (req: Request, res: Response) => {
  try {
    const data = await AnalysisService.createAnalysis(req.body);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const updateAnalysis: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await AnalysisService.updateAnalysis(id, req.body);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const deleteAnalysis: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await AnalysisService.deleteAnalysis(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
export default {
  getAllAnalysis,
  getAnalysisById,
  createAnalysis,
  updateAnalysis,
  deleteAnalysis
};
