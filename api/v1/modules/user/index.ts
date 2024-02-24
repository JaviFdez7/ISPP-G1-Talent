import express from 'express';
import User from './routes';

const router = express.Router();

router.use('/v1/user', User);

export default router;
