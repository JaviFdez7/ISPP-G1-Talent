/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
 // getAllTeamCreator,
 getTeamCreatorById,
  createTeamCreator,
  //updateTeamCreator,
  deleteTeamCreator
} from './controllers/TeamCreatorController';
import {
  checkIsRepresentative,
  checkValidToken,
  checkDataCreateTeam,

} from './validators/TeamCreatorMiddleware';
const router = express.Router();
router.use(express.json());
// Define routes for the TeamCreator module
//router.get('/', getAllTeamCreator);
router.get('/:id',checkValidToken,checkIsRepresentative, getTeamCreatorById);
router.post('/',checkValidToken,checkIsRepresentative,checkDataCreateTeam, createTeamCreator);
//router.patch('/:id', updateTeamCreator);
router.delete('/:id',checkValidToken,checkIsRepresentative, deleteTeamCreator);

export default router;
