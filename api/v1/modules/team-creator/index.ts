import express from 'express';
import TeamCreator from './routes';

const router = express.Router();

router.use('/team-creator', TeamCreator);

export default router;
