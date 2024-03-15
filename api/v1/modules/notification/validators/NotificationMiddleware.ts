import { verifyJWT } from '../../user/helpers/handleJWT';
import { Notification } from '../models/notification';
import { type Request, type Response, type NextFunction } from 'express';
import { ApiResponse } from '../../../utils/ApiResponse';

export const checkReadingMailbox: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const candidateId = req.params.candidateId.toString();
      const token = req.headers.authorization ?? '';
      if (token.length === 0) {
        const message = 'No token provided';
        ApiResponse.sendError(res, [{
          title: 'Unauthorized', detail: message}], 401);
      }
      const decodedToken = verifyJWT(token);
    if (decodedToken.sub !== candidateId) {
        const message = 'Permission denied';
        ApiResponse.sendError(res, [{
          title: 'Forbidden', detail: message}], 401);
    }else {
        next();
      }
    } catch (error: any) {
      ApiResponse.sendError(res, [{
        title: 'Error reading mailbox',
        detail: error.message
      }]);
    }
  }