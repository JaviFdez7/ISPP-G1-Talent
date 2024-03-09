import express from 'express';
import History from './routes';

const router = express.Router();

router.use('/user', History);

export default router;
