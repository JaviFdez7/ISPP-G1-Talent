/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express'
import {
	getHistoryFromUser,
	getNotFavoritesFromUser,
	getFavoritesFromUser,
	createHistory,
	toogleFavorite,
	updateHistory,
	deleteHistory,
} from './controllers/HistoryController'
import { checkDeleteHistory } from './validators/HistoryMiddleware'

const router = express.Router()

// Define routes for the History module
router.get('/:userId/history', getHistoryFromUser);// X
router.get('/:userId/not_favorites', getNotFavoritesFromUser);// X
router.get('/:userId/favorites', getFavoritesFromUser)
router.post('/:userId/history', createHistory);// X
router.patch('/:userId/history/:id/favorite', toogleFavorite);
router.patch('/:userId/history/:id', updateHistory);// X
router.delete('/:userId/history/:id', checkDeleteHistory, deleteHistory);// X

export default router
