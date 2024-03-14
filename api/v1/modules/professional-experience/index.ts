import express from 'express';
import ProfessionalExperience from './routes';

const router = express.Router();

router.use('/professional-experience', ProfessionalExperience);

export default router;
