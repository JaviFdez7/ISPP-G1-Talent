import { verifyJWT } from '../../user/helpers/handleJWT';
import { History } from '../models/history';
import { type Request, type Response, type NextFunction } from 'express';
import { ApiResponse } from '../../../utils/ApiResponse';

export const checkDeleteHistory: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId.toString();
    const id = req.params.id.toString();
    const token = req.headers.authorization ?? '';
    if (token.length === 0) {
      const message = 'No token provided';
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401);
    }
    const decodedToken = verifyJWT(token);
    const history = await History.findById(id);
    if (decodedToken.sub !== userId) {
      const message = 'Permission denied';
      ApiResponse.sendError(res, [{ title: 'Forbidden', detail: message }], 401);
    } else if (!history) {
      const message = 'History not found';
      ApiResponse.sendError(res, [{ title: 'Not Found', detail: message }], 404);
    } else if (history.favorite) {
      const message = 'Cannot delete favorite history';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
    } else
      next();
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Error deleting history',
      detail: error.message
    }]);
  }
}
