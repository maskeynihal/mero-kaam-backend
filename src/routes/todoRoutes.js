import { Router } from 'express';

import * as TodoController from '@/controllers/todoController';
const router = Router();

router.get('/', TodoController.index);

export default router;
