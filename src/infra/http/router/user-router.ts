import { Router } from 'express';
import { createUserController } from '../controller/create-user.controller';
import { createSessionController } from '../controller/create-session.controller';

const router = Router();

router.post('/register', createUserController.handle);
router.post('/session', createSessionController.handle);

export default router;
