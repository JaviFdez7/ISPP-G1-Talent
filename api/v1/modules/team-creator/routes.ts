/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
 // getAllTeamCreator,
 getTeamCreatorById,
  createTeamCreator,
  //updateTeamCreator,
  deleteTeamCreator
} from './controllers/TeamCreatorController';

const router = express.Router();
router.use(express.json());
// Define routes for the TeamCreator module
//router.get('/', getAllTeamCreator);
router.get('/:id', getTeamCreatorById);
router.post('/', createTeamCreator);
//router.patch('/:id', updateTeamCreator);
router.delete('/:id', deleteTeamCreator);

export default router;
