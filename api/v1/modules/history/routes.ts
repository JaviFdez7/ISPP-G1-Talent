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
import { checkDeleteHistory,
	 checkAuthorization,
	checkCorrectHistory } from './validators/HistoryMiddleware'

const router = express.Router()

// Define routes for the History module
router.get('/:userId/history', checkAuthorization,getHistoryFromUser) // X
router.get('/:userId/not_favorites', checkAuthorization,getNotFavoritesFromUser) // X
router.get('/:userId/favorites', checkAuthorization,getFavoritesFromUser)
router.post('/:userId/history', checkAuthorization,createHistory) // X
router.patch('/:userId/history/:id/favorite',checkAuthorization,checkCorrectHistory ,toogleFavorite)
router.patch('/:userId/history/:id', checkAuthorization,checkCorrectHistory,updateHistory) // X
router.delete('/:userId/history/:id', checkAuthorization,checkDeleteHistory, checkDeleteHistory,deleteHistory) // X

router.get('/:userId/team_creator/history', checkAuthorization,getTeamCreatorHistoryFromUser) // X
router.get('/:userId/team_creator/not_favorites', checkAuthorization,getNotFavoritesTeamCreatorFromUser) // X
router.get('/:userId/team_creator/favorites', checkAuthorization,getFavoritesTeamCreatorFromUser)
router.post('/:userId/team_creator/history', checkAuthorization,createTeamCreatorHistory) // X
router.patch('/:userId/team_creator/history/:id/favorite', checkAuthorization,checkCorrectHistory,toogleFavoriteTeamCreator)
router.patch('/:userId/team_creator/history/:id', checkAuthorization,checkCorrectHistory,updateTeamCreatorHistory) // X
router.delete(
	'/:userId/team_creator/history/:id',checkAuthorization,checkCorrectHistory,
	checkDeleteHistory,
	deleteTeamCreatorHistory
) // X

export default router
