/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getAllProfessionalExperience,
  getProfessionalExperienceById,
  createProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience
} from './controllers/ProfessionalExperienceController';
import {
  checkGetProfessionalExperienceById,
  checkCreateProfessionalExperience,
  checkUpdateProfessionalExperience,
  checkDeleteProfessionalExperience
} from './validators/ProfessionalExperienceMiddleware';

const router = express.Router();

// Define routes for the ProfessionalExperience module
router.get('/', getAllProfessionalExperience);
router.get('/:id', checkGetProfessionalExperienceById, getProfessionalExperienceById);
router.post('/', checkCreateProfessionalExperience, createProfessionalExperience);
router.patch('/:id', checkUpdateProfessionalExperience, updateProfessionalExperience);
router.delete('/:id', checkDeleteProfessionalExperience, deleteProfessionalExperience);

export default router;
