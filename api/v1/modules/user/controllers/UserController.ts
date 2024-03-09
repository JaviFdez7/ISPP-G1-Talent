// eslint-disable-next-line @typescript-eslint/await-thenable
import e, { type Request, type Response } from 'express';
import UserService from '../services/UserService';

// Default controller functions
export const getAllUser: any = async (req: Request, res: Response) => {
  try {
    const data = await UserService.getAllUser();
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const getUserById: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await UserService.getUserById(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const createCandidate: any = async (req: Request, res: Response) => {
  try {
    const role: string = 'Candidate';
    const data = await UserService.createUser(req.body, role);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const createRepresentative: any = async (req: Request, res: Response) => {
  try {
    const role: string = 'Representative';
    const data = await UserService.createUser(req.body, role);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const updateCandidate: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const role: string = 'Candidate';
    const data = await UserService.updateUser(id, req.body, role);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const updateRepresentative: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const role: string = 'Representative';
    const data = await UserService.updateUser(id, req.body, role);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const loginUser: any = async (req: Request, res: Response) => {
  try {
    const data = await UserService.loginUser(req.body);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const deleteUser: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await UserService.deleteUser(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const getProfessionalExperiencesByUserId: any = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const data = await UserService.getProfessionalExperiencesByUserId(userId);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const createProfessionalExperience: any = async (req: Request, res: Response) => {
  try {
    const data = await UserService.createProfessionalExperience(req.body);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const updateProfessionalExperience: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await UserService.updateProfessionalExperience(id, req.body);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const deleteProfessionalExperience: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await UserService.deleteProfessionalExperience(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export default {
  getAllUser,
  getUserById,
  createCandidate,
  createRepresentative,
  updateCandidate,
  updateRepresentative,
  deleteUser,
  loginUser,
  getProfessionalExperiencesByUserId,
  createProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience
};
