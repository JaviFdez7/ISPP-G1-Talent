// eslint-disable-next-line @typescript-eslint/await-thenable
import e, { type Request, type Response } from 'express';
import UserService from '../services/UserService';
import UserMiddleware from '../middlewares/UserMiddleware';

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
    const token = req.headers.authorization ?? '';
    const check = await UserMiddleware.checkGetUserById(id, token);
    if (check === 'User not found') {
      res.status(404).send(check);
    } else if (check === 'Unauthorized' || check === 'No token provided') {
      res.status(401).send(check);
    } else {
      const data = await UserService.getUserById(id);
      res.status(200).send(data);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const createCandidate: any = async (req: Request, res: Response) => {
  try {
    const check = await UserMiddleware.checkCreateCandidate(req.body);
    if (check === 'Missing required fields') {
      res.status(400).send(check);
    } else if (check === 'Username already exists' || check === 'User with that email already exists' || check === 'User with that GitHub username already exists') {
      res.status(409).send(check);
    } else {
      const role: string = 'Candidate';
      const data = await UserService.createUser(req.body, role);
      res.status(200).send(data);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const createRepresentative: any = async (req: Request, res: Response) => {
  try {
    const check = await UserMiddleware.checkCreateRepresentative(req.body);
    if (check === 'Missing required fields') {
      res.status(400).send(check);
    } else if (check === 'Username already exists' || check === 'User with that email already exists') {
      res.status(409).send(check);
    } else {
      const role: string = 'Representative';
      const data = await UserService.createUser(req.body, role);
      res.status(200).send(data);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const updateCandidate: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization ?? '';
    const check = await UserMiddleware.checkUpdateCandidate(id, token, req.body);
    if (check === 'User not found') {
      res.status(404).send(check);
    } else if (check === 'No data to update') {
      res.status(400).send(check);
    } else if (check === 'Unauthorized' || check === 'No token provided') {
      res.status(401).send(check);
    } else {
      const role: string = 'Candidate';
      const data = await UserService.updateUser(id, req.body, role);
      res.status(200).send(data);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const updateRepresentative: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization ?? '';
    const check = await UserMiddleware.checkUpdateRepresentative(id, token, req.body);
    if (check === 'User not found') {
      res.status(404).send(check);
    } else if (check === 'No data to update') {
      res.status(400).send(check);
    } else if (check === 'Unauthorized' || check === 'No token provided') {
      res.status(401).send(check);
    } else {
      const role: string = 'Representative';
      const data = await UserService.updateUser(id, req.body, role);
      res.status(200).send(data);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const loginUser: any = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization ?? '';
    const check = await UserMiddleware.checkLoginUser(token, req.body);
    if (check === 'User not found') {
      res.status(404).send(check);
    } else if (check === 'Invalid password') {
      res.status(401).send(check);
    } else if (check === 'User already logged in') {
      res.status(401).send(check);
    } else {
      const data = await UserService.loginUser(req.body);
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
    const token = req.headers.authorization ?? '';
    const check = await UserMiddleware.checkDeleteUser(id, token);
    if (check === 'User not found') {
      res.status(404).send(check);
    } else if (check === 'Unauthorized' || check === 'No token provided') {
      res.status(401).send(check);
    } else {
      const data = await UserService.deleteUser(id);
      res.status(200).send(data);
    }
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
