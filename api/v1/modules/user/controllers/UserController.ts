// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express';
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
    const role: string = 'Candidate';
    const id = req.params.id;
    const data = await UserService.updateUser(id, req.body, role);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const updateRepresentative: any = async (req: Request, res: Response) => {
  try {
    const role: string = 'Representative';
    const id = req.params.id;
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
    if (data === 'User not found') {
      res.status(404).send(data);
    } else if (data === 'Invalid password') {
      res.status(401).send(data);
    } else {
      res.status(200).send(data);
    }
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
export default {
  getAllUser,
  getUserById,
  createCandidate,
  createRepresentative,
  updateCandidate,
  updateRepresentative,
  deleteUser,
  loginUser
};
