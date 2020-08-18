import { Router } from 'express';

import * as LoginController from '@/controllers/auth/loginController';
import * as RegisterController from '@/controllers/auth/registerController';

const router = Router();

router.post('/register', RegisterController.create);

router.post('/login', LoginController.login);

export default router;
