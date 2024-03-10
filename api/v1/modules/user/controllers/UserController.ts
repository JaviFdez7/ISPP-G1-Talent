// eslint-disable-next-line @typescript-eslint/await-thenable
import e, { type Request, type Response } from 'express';
import UserService from '../services/UserService';
import UserMiddleware from '../middlewares/UserMiddleware';
import { ApiResponse } from '../../../utils/ApiResponse';

// Default controller functions
export const getAllUser: any = async (req: Request, res: Response) => {
  try {
    const data = await UserService.getAllUser();
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

export const getUserById: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization ?? '';
    const check = await UserMiddleware.checkGetUserById(id, token);
    if (check === 'User not found') {
      ApiResponse.sendError(res, [{
        title: 'Finding error',
        detail: check
      }], 404);
    } else if (check === 'Unauthorized' || check === 'No token provided') {
      ApiResponse.sendError(res, [{
        title: 'Authorization error',
        detail: check
      }], 401);
    } else {
      const data = await UserService.getUserById(id);
      ApiResponse.sendSuccess(res, data, 200, {
        self: `${req.protocol}://${req.get('host')}${req.originalUrl}`
      });
    }
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Internal Server Error',
      detail: error.message
    }]);
  }
};

export const createCandidate: any = async (req: Request, res: Response) => {
  try {
    const check = await UserMiddleware.checkCreateCandidate(req.body);
    if (check === 'Missing required fields') {
      res.status(400).send(check);

    } else if (check?.existingUsername === 'Username already exists' || check?.existingEmail === 'User with that email already exists' || check?.existingGithubUser === 'User with that GitHub username already exists') {
      res.status(409).json(check);
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
    } else if (check?.existingUsername === 'Username already exists' || check?.existingEmail === 'User with that email already exists') {
      res.status(409).json(check);//llamar como json
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
    if (check?.user === 'User not found') {
      res.status(404).json(check);
    } else if (check?.checkPassword === 'Invalid password') {
      res.status(401).json(check);
    } else if (check?.userLog === 'User already logged in') {
      res.status(401).json(check);
    } else {
      const data = await UserService.loginUser(req.body);
      //data tiene token y user
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

export const getProfessionalExperiencesByUserId: any = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const token = req.headers.authorization ?? '';
    const check = await UserMiddleware.checkGetProfessionalExperienceByUserId(userId,token);
    if(check==='Profesional Experience not found'){
      res.status(404).send(check);
    }else if(check==='No token provided' || check==='Unauthorized'){
      res.status(401).send(check);
    }else{
      const data = await UserService.getProfessionalExperiencesByUserId(userId);
      res.status(200).send(data);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const createProfessionalExperience: any = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization ?? '';
    const check= await UserMiddleware.checkCreateProfessionalExperience(req.body,token)
    if(check==='Invalid candidate' || check==='Missing required fields' || check==='No data to update'){
      res.status(400).send(check);
    }else if (check === 'Unauthorized' || check === 'No token provided') {
      res.status(401).send(check);
    }else{
      const data = await UserService.createProfessionalExperience(req.body);
      res.status(200).send(data);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const updateProfessionalExperience: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization ?? '';
    const check = await UserMiddleware.checkUpdateProfessionalExperience(id, token,req.body);
    if (check === 'Professional experience not found') {
      res.status(404).send(check);
    }else if (check === 'No data to update' || check==='Missing required fields') {
      res.status(400).send(check);
    } else if (check === 'Unauthorized' || check === 'No token provided') {
      res.status(401).send(check);
    } else {
      const data = await UserService.updateProfessionalExperience(id, req.body);
      res.status(200).send(data);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const deleteProfessionalExperience: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization ?? '';
    const check = await UserMiddleware.checkDeleteProfessionalExperience(id, token);
    if (check === 'Professional experience not found') {
      res.status(404).send(check);
    } else if (check === 'Unauthorized' || check === 'No token provided') {
      res.status(401).send(check);
    } else {
      const data = await UserService.deleteProfessionalExperience(id);
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
  loginUser,
  getProfessionalExperiencesByUserId,
  createProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience
};
