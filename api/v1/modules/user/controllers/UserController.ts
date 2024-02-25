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

export const createUser: any = async (req: Request, res: Response) => {
  try {
    const data = await UserService.createUser(req.body);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const updateUser: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await UserService.updateUser(id, req.body);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

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
  createUser,
  updateUser,
  deleteUser,
  loginUser
};
