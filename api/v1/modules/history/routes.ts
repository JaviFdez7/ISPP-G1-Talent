/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getHistoryFromUser,
  getHistoryFromUserByFavoriteState,
  getFavoritesFromUser,
  createHistory,
  markAsFavorite,
  updateHistory,
  deleteHistory
} from './controllers/HistoryController';
import { checkDeleteHistory } from './validators/HistoryMiddleware';

const router = express.Router();

// Define routes for the History module
router.get('/', getHistoryFromUser);//X
router.get('/:favorite', getHistoryFromUserByFavoriteState);//X
router.post('/', createHistory);//X
router.patch('/:id/favorite', markAsFavorite);
router.patch('/:id', updateHistory);//X
router.delete('/:id', checkDeleteHistory, deleteHistory);//X

export default router;
