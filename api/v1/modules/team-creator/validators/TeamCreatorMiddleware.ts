import { verifyJWT } from '../../user/helpers/handleJWT';
import { ApiResponse } from '../../../utils/ApiResponse';
import { Candidate, Representative } from '../../user/models/user';
import e, { type Request, type Response, type NextFunction } from 'express';

export const checkCreateTeam: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
    
        const data = req.body;
     
        const token = req.headers.authorization ?? '';
        
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

        if (token.length === 0) {
            ApiResponse.sendError(res,[{
                title: 'Internal Server Error',
                detail:'No token provided.'
              }])
              return;
         
          }
      
          const decodedToken = verifyJWT(token);
        
          if (decodedToken.sub !== data.userId.toString()) {
            ApiResponse.sendError(res,[{
                title: 'Internal Server Error',
                detail:'Unauthorized'
              }])
              return;
          }
          const existingRepresentative = await Representative.findById(decodedToken.sub);
          if (!existingRepresentative){
            ApiResponse.sendError(res,[{
                title: 'Internal Server Error',
                detail:'Representative user not exists.'
              }])
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