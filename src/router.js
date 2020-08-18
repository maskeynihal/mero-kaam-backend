import { Router } from 'express';

import authRoutes from '@/routes/authRoutes';
import todoRoutes from '@/routes/todoRoutes';

import auth from '@/middleware/authenticate';

const router = Router();

router.use('/auth', authRoutes);
router.use('/todo', auth, todoRoutes);

export default router;
