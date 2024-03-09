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
import {
  checkCreateCandidate,
  checkCreateRepresentative,
  checkUpdateCandidate,
  checkUpdateRepresentative,
  checkLoginUser,
  checkCreateProfessionalExperience,
  checkUpdateProfessionalExperience,
  checkDeleteProfessionalExperience,
  checkGetUserById,
  checkGetProfessionalExperienceByUserId, 
  checkDeleteUser} from './middlewares/UserMiddleware';

const router = express.Router();

// Define routes for the User module
//TODO: método Logout, método getAllProfessionalExpByUserId
//Revisar rutas de experience(experiences o experience)
router.get('/', getAllUser);//X
router.get('/:id', checkGetUserById, getUserById);//X
router.get('/:id/experiences', checkGetProfessionalExperienceByUserId, getProfessionalExperiencesByUserId);//X
router.post('/candidate', checkCreateCandidate, createCandidate);//X
router.post('/representative', checkCreateRepresentative, createRepresentative);//X
router.post('/login', checkLoginUser, loginUser);//X
router.post('/experience', checkCreateProfessionalExperience, createProfessionalExperience);//X
router.patch('/candidate/:id', checkUpdateCandidate, updateCandidate);//X
router.patch('/representative/:id', checkUpdateRepresentative, updateRepresentative);//X
router.patch('/experience/:id', checkUpdateProfessionalExperience, updateProfessionalExperience);//X
router.delete('/:id', checkDeleteUser, deleteUser);//X
router.delete('/experience/:id', checkDeleteProfessionalExperience, deleteProfessionalExperience);//X

export default router;
