import { Router } from 'express';

import * as TodoController from '@/controllers/todoController';
const router = Router();

router.get('/', TodoController.index);
router.post('/', TodoController.create);
router.get('/:id', TodoController.show);
router.put('/edit/:id', TodoController.update);
router.delete('/:id', TodoController.remove);
export default router;
