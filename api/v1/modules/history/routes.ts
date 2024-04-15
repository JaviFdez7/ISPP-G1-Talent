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
	getTeamCreatorHistoryFromUser,
	getFavoritesTeamCreatorFromUser,
	getNotFavoritesTeamCreatorFromUser,
	createTeamCreatorHistory,
	toogleFavoriteTeamCreator,
	updateTeamCreatorHistory,
	deleteTeamCreatorHistory,
} from './controllers/HistoryController'
import { checkDeleteHistory, checkDeleteTeamCreatorHistory } from './validators/HistoryMiddleware'

const router = express.Router()

// Define routes for the History module
router.get('/:userId/history', getHistoryFromUser) // X
router.get('/:userId/not_favorites', getNotFavoritesFromUser) // X
router.get('/:userId/favorites', getFavoritesFromUser)
router.post('/:userId/history', createHistory) // X
router.patch('/:userId/history/:id/favorite', toogleFavorite)
router.patch('/:userId/history/:id', updateHistory) // X
router.delete('/:userId/history/:id', checkDeleteHistory, deleteHistory) // X

router.get('/:userId/team_creator/history', getTeamCreatorHistoryFromUser) // X
router.get('/:userId/team_creator/not_favorites', getFavoritesTeamCreatorFromUser) // X
router.get('/:userId/team_creator/favorites', getNotFavoritesTeamCreatorFromUser)
router.post('/:userId/team_creator/history', createTeamCreatorHistory) // X
router.patch('/:userId/team_creator/history/:id/favorite', toogleFavoriteTeamCreator)
router.patch('/:userId/team_creator/history/:id', updateTeamCreatorHistory) // X
router.delete(
	'/:userId/team_creator/history/:id',
	checkDeleteTeamCreatorHistory,
	deleteTeamCreatorHistory
) // X

export default router
