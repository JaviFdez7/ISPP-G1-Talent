import { verifyJWT } from '../../user/helpers/handleJWT';
import { ProfessionalExperience } from '../models/professional-experience';
import { Candidate } from '../../user/models/user';
import e, { type Request, type Response, type NextFunction } from 'express';
import { ApiResponse } from '../../../utils/ApiResponse';

export const checkGetProfessionalExperienceById: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const experience = await ProfessionalExperience.findById(id);
    if (!experience) {
      const message = 'Professional experience not found';
      ApiResponse.sendError(res, [{ title: 'Not Found', detail: message }], 404);
      return;
    }
    else{
      next();
    }
  } catch (error:any) {
    ApiResponse.sendError(res, [{
      title: 'Error getting professional experience',
      detail: error.message
    }]);
  }
}

export const checkCreateProfessionalExperience: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
 
    const token = req.headers.authorization ?? '';

    if (!data) {
      const message = 'No data to insert';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 404);
      return;
    } else if (!data.startDate || !data.companyName || !data.userId || !data.professionalArea) {
      const message = 'Missing required fields';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 404);
      return;
    }

    const userId = data.userId
    const existingCandidate = await Candidate.findById(userId);
    if (!existingCandidate) {
      const message = 'Invalid candidate';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 404);
      return;
    }else if (token.length === 0) {
      const message = 'No token provided';
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401);
      return;
    }

    const decodedToken = verifyJWT(token);
  
    if (decodedToken.sub !== data.userId.toString()) {
      const message = 'Incorrect token';
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401);
      return;
    }else{
      next();
    }
  } catch (error:any) {
    ApiResponse.sendError(res, [{
      title: 'Error inserting professional experience',
      detail: error.message
    }]);
  }
};

export const checkUpdateProfessionalExperience: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const token = req.headers.authorization ?? '';
    const data = req.body;
    const experience = await ProfessionalExperience.findById(id);
    if (!experience) {
      const message = 'Professional experience not found';
      ApiResponse.sendError(res, [{ title: 'Not Found', detail: message }], 404);
      return;
    }
    else if (!data) {
      const message = 'No data to update';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
      return;
    }
    else if (token.length === 0) {
      const message = 'No token provided';
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401);
      return;
    }
    const decodedToken = verifyJWT(token);
    const candidate = await Candidate.findOne({ _id: req.body.userId, profesionalExperiences: experience._id });
    if (decodedToken.sub !== candidate?._id.toString()) {
      const message = 'Incorrect token';
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401);
      return;
    }else{
      next();
    }
  } catch (error:any) {
    ApiResponse.sendError(res, [{
      title: 'Error updating professional experience',
      detail: error.message
    }]);
  }
};

export const checkDeleteProfessionalExperience: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const token = req.headers.authorization ?? '';
    const experience = await ProfessionalExperience.findById(id);
    if (!experience) {
      const message = 'Professional experience not found';
      ApiResponse.sendError(res, [{ title: 'Not Found', detail: message }], 404);
      return;
    }
    else if (token.length === 0) {
      const message = 'No token provided';
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401);
      return;
    }
    const decodedToken = verifyJWT(token);
    if (!decodedToken.sub) {
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: 'Invalid token payload' }], 401);
      return;
    }
    const userId = decodedToken.sub.toString();
    const candidate = await Candidate.findOne({ _id: userId, profesionalExperiences: experience._id });
    if (decodedToken.sub !== candidate?._id.toString()) {
      const message = 'Incorrect token';
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401);
      return;
    }else{
      next();
    }
  } catch (error:any) {
    ApiResponse.sendError(res, [{
      title: 'Error deleting professional experience',
      detail: error.message
    }]);
  }
}

export default {
  checkDeleteProfessionalExperience,
  checkUpdateProfessionalExperience,
  checkCreateProfessionalExperience,
  checkGetProfessionalExperienceById
};
