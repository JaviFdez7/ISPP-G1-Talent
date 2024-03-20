import { verifyJWT } from '../../user/helpers/handleJWT';
import { ProfessionalExperience } from '../models/professional-experience';
import { Candidate } from '../../user/models/user';
import e, { type Request, type Response, type NextFunction } from 'express';

export const checkGetProfessionalExperienceById: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const experience = await ProfessionalExperience.findById(id);
    if (!experience) {
      const message = 'Professional experience not found';
      res.status(404).send(message);
      return message;
    }
    next();
  } catch (error) {
    console.error('Error deleting user', error)
    throw error;
  }
}

export const checkCreateProfessionalExperience: any = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    console.log(req.body)
    const data = req.body;
 
    const token = req.headers.authorization ?? '';
    
    if(!data) {
      const message = 'No data to insert';
      res.status(400).send(message);
      return message;
    }
    
    if (!data.startDate  || !data.companyName || !data.userId || !data.professionalArea ) {
      const message = 'Missing required fields';
      res.status(400).send(message);
      return message;
    }
    
    
    const userId = data.userId
    const existingCandidate = await Candidate.findById(userId);
    if (!existingCandidate) {
      const message = 'Invalid candidate';
      res.status(400).send(message);
      return message;
    }
   
    if (token.length === 0) {
      const message = 'No token provided';
      res.status(401).send(message);
      return message;
    }

    const decodedToken = verifyJWT(token);
  
    if (decodedToken.sub !== data.userId.toString()) {
      const message = 'Unauthorized';
      res.status(401).send(message);
      return message;
    }
    
    next();
  } catch (error) {
    console.error('Error inserting professional experience:', error);
    throw error;
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
      res.status(404).send(message);
      return message;
    }
    if (!data) {
      const message = 'No data to update';
      res.status(400).send(message);
      return message;
    }
    if (token.length === 0) {
      const message = 'No token provided';
      res.status(401).send(message);
      return message;
    }
    const decodedToken = verifyJWT(token);
    const candidate = await Candidate.findOne({ _id: req.body.userId, profesionalExperiences: experience._id });
    if (decodedToken.sub !== candidate?._id.toString()) {
      const message = 'Unauthorized';
      res.status(401).send(message);
      return message;
    }
    next();
  } catch (error) {
    console.error('Error updating professional experience:', error);
    throw error;
  }
};

export const checkDeleteProfessionalExperience: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const token = req.headers.authorization ?? '';
    const experience = await ProfessionalExperience.findById(id);
    if (!experience) {
      const message = 'Professional experience not found';
      res.status(404).send(message);
      return message;
    }
    if (token.length === 0) {
      const message = 'No token provided';
      res.status(401).send(message);
      return message;
    }
    const decodedToken = verifyJWT(token); 
    const candidate = await Candidate.findOne({ _id: req.body.userId, profesionalExperiences: experience._id });
    if (decodedToken.sub !== candidate?._id.toString()) {
      const message = 'Unauthorized';
      res.status(401).send(message);
      return message;
    }
    next();  
  } catch (error) {
    console.error('Error deleting professional experience', error)
    throw error;
  }

}
  
export default {
  checkDeleteProfessionalExperience,
  checkUpdateProfessionalExperience,
  checkCreateProfessionalExperience,
  checkGetProfessionalExperienceById
};
