import { Router } from 'express';
import { createBalanceController } from '../controller/create-balance.controller';

const router = Router();

router.post('/balance', createBalanceController.handle);

export default router;
