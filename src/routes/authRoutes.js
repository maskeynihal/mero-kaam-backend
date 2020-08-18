import { Router } from 'express';

import * as LoginController from '@/controllers/auth/loginController';
import * as RegisterController from '@/controllers/auth/registerController';

const router = Router();

router.get('/register', RegisterController.create);

export default router;
