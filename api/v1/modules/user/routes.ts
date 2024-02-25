/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} from './controllers/UserController';

const router = express.Router();

// Define routes for the User module
router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/register', createUser);
router.post('/login', loginUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
