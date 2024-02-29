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
  getProfessionalExperienceByUserId,
  createProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience
} from './controllers/UserController';

const router = express.Router();

// Define routes for the User module
//TODO: método Logout, método getAllProfessionalExpByUserId
//Revisar rutas de experience(experiences o experience)
router.get('/', getAllUser);
router.get('/:id', getUserById);
router.get('/:id/experiences', getProfessionalExperienceByUserId);
router.post('/candidate', createCandidate);
router.post('/representative', createRepresentative);
router.post('/login', loginUser);
router.post('/experience', createProfessionalExperience);
router.patch('/candidate/:id', updateCandidate);
router.patch('/representative/:id', updateRepresentative);
router.patch('/experience/:id', updateProfessionalExperience);
router.delete('/:id', deleteUser);
router.delete('/experience/:id', deleteProfessionalExperience);

export default router;
