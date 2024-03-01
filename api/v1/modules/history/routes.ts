/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getHistoryFromUser,
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
router.get('/favorites', getFavoritesFromUser);
router.post('/', createHistory);//X
router.patch('/:id/favorite', markAsFavorite);
router.patch('/:id', updateHistory);
router.delete('/:id', checkDeleteHistory, deleteHistory);

export default router;
