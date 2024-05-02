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
  updateUserProfilePicture,
  updateUserPassword,
  deleteUser,
  loginUser
} from './controllers/UserController';
import {
  checkCreateCandidate,
  checkCreateRepresentative,
  checkUpdateCandidate,
  checkUpdateRepresentative,
  checkUpdateUserProfilePicture,
  checkUpdatePassword,
  checkLoginUser,
  checkGetUserById,
  checkGetProfessionalExperienceByUserId,
  checkDeleteUser} from './middlewares/UserMiddleware';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// Define routes for the User module
// TODO: método Logout, método getAllProfessionalExpByUserId
// Revisar rutas de experience(experiences o experience)
router.get('/', getAllUser);//X
router.get('/:id', checkGetUserById, getUserById);//X
router.get('/:id/professional-experiences', checkGetProfessionalExperienceByUserId, getProfessionalExperiencesByUserId);//X
router.post('/candidate', checkCreateCandidate, createCandidate);//X
router.post('/representative', checkCreateRepresentative, createRepresentative);//X
router.post('/login', checkLoginUser, loginUser);//X
router.patch('/candidate/:id', checkUpdateCandidate, updateCandidate);//X
router.patch('/representative/:id', checkUpdateRepresentative, updateRepresentative);//X
router.patch('/candidate/:id/profile-picture', checkUpdateUserProfilePicture,updateUserProfilePicture);
router.patch('/:id/password', checkUpdatePassword, updateUserPassword);
router.delete('/:id', checkDeleteUser, deleteUser);//X

export default router;
