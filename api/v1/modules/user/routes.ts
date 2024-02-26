/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getAllUser,
  getUserById,
  createCandidate,
  createRepresentative,
  updateCandidate,
  updateRepresentative,
  deleteUser,
  loginUser
} from './controllers/UserController';

const router = express.Router();

// Define routes for the User module
router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/candidate', createCandidate);
router.post('/representative', createRepresentative);
router.post('/login', loginUser);
router.patch('/candidate/:id', updateCandidate);
router.patch('/representative/:id', updateRepresentative);
router.delete('/:id', deleteUser);

export default router;
