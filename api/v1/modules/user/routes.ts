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
  loginUser,
  getProfessionalExperiencesByUserId,
  createProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience
} from './controllers/UserController';

const router = express.Router();

// Define routes for the User module
// TODO: método Logout, método getAllProfessionalExpByUserId
// Revisar rutas de experience(experiences o experience)
router.get('/', getAllUser);//X
router.get('/:id', getUserById);//X
router.get('/:id/experiences', getProfessionalExperiencesByUserId);//X
router.post('/candidate', createCandidate);//X
router.post('/representative', createRepresentative);//X
router.post('/login', loginUser);//X
router.post('/experience', createProfessionalExperience);//X
router.patch('/candidate/:id', updateCandidate);//X
router.patch('/representative/:id', updateRepresentative);//X
router.patch('/experience/:id', updateProfessionalExperience);//X
router.delete('/:id', deleteUser);//X
router.delete('/experience/:id', deleteProfessionalExperience);//X

export default router;
