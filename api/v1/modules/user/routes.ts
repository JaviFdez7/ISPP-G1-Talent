/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getAllUser,
  getUserById,
  getProfessionalExperiencesByUserId,
  createCandidate,
  createRepresentative,
  updateCandidate,
  updateRepresentative,
  deleteUser,
  loginUser
} from './controllers/UserController';
import {
  checkCreateCandidate,
  checkCreateRepresentative,
  checkUpdateCandidate,
  checkUpdateRepresentative,
  checkLoginUser,
  checkGetUserById,
  checkGetProfessionalExperienceByUserId,
  checkDeleteUser
} from './middlewares/UserMiddleware';

const router = express.Router();

/*
 * Define routes for the User module
 * TODO: método Logout, método getAllProfessionalExpByUserId
 * Revisar rutas de experience(experiences o experience)
 */
router.get('/', getAllUser);// X
router.get('/:id', checkGetUserById, getUserById);// X
router.get('/:id/professional-experiences', checkGetProfessionalExperienceByUserId, getProfessionalExperiencesByUserId);// X
router.post('/candidate', checkCreateCandidate, createCandidate);// X
router.post('/representative', checkCreateRepresentative, createRepresentative);// X
router.post('/login', checkLoginUser, loginUser);// X
router.patch('/candidate/:id', checkUpdateCandidate, updateCandidate);// X
router.patch('/representative/:id', checkUpdateRepresentative, updateRepresentative);// X
router.delete('/:id', checkDeleteUser, deleteUser);// X

export default router;
