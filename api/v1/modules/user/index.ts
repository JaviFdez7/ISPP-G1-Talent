import express from 'express';
import User from './routes';

const router = express.Router();

router.use('/user', User);

export default router;
