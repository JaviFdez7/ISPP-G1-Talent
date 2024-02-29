import { verifyJWT } from '../../user/helpers/handleJWT';
import { History } from '../models/history';
import { type Request, type Response } from 'express';

export const checkDeleteHistory: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id.toString();
    const token = req.headers.authorization ?? '';
    const decodedToken = verifyJWT(token);
    const history = await History.findById(id);
    if (!history) {
      res.status(404).send('History not found');
    } else if (token.length === 0) {
      res.status(401).send('No token provided');
    } else if (decodedToken.sub !== history.userId) {
      res.status(401).send('Unauthorized');
    } else if (history.favorite ) {
      res.status(400).send('Cannot delete a favorite history');
    }
  } catch (error) {
    console.error('Error deleting user', error)
    throw error;
  }
}