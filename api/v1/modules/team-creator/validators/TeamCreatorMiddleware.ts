import { verifyJWT } from '../../user/helpers/handleJWT';
import { ApiResponse } from '../../../utils/ApiResponse';
import { Candidate, Representative } from '../../user/models/user';
import e, { type Request, type Response, type NextFunction } from 'express';
import { TeamCreator } from '../models/TeamCreatorModel';


export const checkTeamCreatorById: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id.toString();
      const teamCreator = await TeamCreator.findById(id);
      if (!teamCreator) {
       
        ApiResponse.sendError(res,[{
            title: 'Internal Server Error',
            detail:'TeamCreator not found'
          }])
          return;
      }
      next();
    } catch (error: any) {
    
      ApiResponse.sendError(res,[{
        title: 'Internal Server Error',
        detail:error.message
      }])
      return;
    }
  }
  export const checkValidToken: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization ?? '';
    
        if (token.length === 0) {
            ApiResponse.sendError(res,[{
                title: 'Internal Server Error',
                detail:'No token provided.'
              }])
              return;
         
          }
          const decodedToken = verifyJWT(token);
        
      next();
    } catch (error: any) {
    
      ApiResponse.sendError(res,[{
        title: 'Internal Server Error',
        detail:error.message
      }])
      return;
    }
  }


  export const checkIsRepresentative: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization ?? '';

        const decodedToken = verifyJWT(token);
        
        const existingRepresentative = await Representative.findById(decodedToken.sub);
        if (!existingRepresentative){
          ApiResponse.sendError(res,[{
              title: 'Internal Server Error',
              detail:'Representative user not exists.'
            }])
          return;
        }
        else{
          next();
        }
    } catch (error: any) {
    
      ApiResponse.sendError(res,[{
        title: 'Internal Server Error',
        detail:error.message
      }])
      return;
    }
  }


  export const checkAuthorization: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id.toString();
        const token = req.headers.authorization ?? '';

        const decodedToken = verifyJWT(token);
        
   
        const representativeUser = await Representative.findById(userId);
    if (decodedToken.sub !== representativeUser?._id.toString()) {
   
      ApiResponse.sendError(res,[{
        title: 'Internal Server Error',
        detail:'Unauthorized.'
      }])
      return;
  }
    
    else{
      next();
    }

    } catch (error: any) {
    
      ApiResponse.sendError(res,[{
        title: 'Internal Server Error',
        detail:error.message
      }])
      return;
    }
  }











export const checkDataCreateTeam: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
    
        const data = req.body;
        if(!data) {
          ApiResponse.sendError(res,[{
            title: 'Internal Server Error',
            detail:'No data to insert'
          }])
          return;
        }
       
        for (let i=0; i<data.length; i++){
            let profile = data[i];
            
            if (profile.languages.length==0 && profile.technologies.length==0 && profile.yearsOfExperience=='' && profile.field==''){
                ApiResponse.sendError(res,[{
                    title: 'Internal Server Error',
                    detail:'profile requested is empty.'
                  }])
                  return;
            }
        }
        
        next();
      } catch (error: any) {
        console.error('Error inserting professional experience:', error);
        ApiResponse.sendError(res,[{
            title: 'Internal Server Error',
            detail: error.message
          }])
          return;
      }


}