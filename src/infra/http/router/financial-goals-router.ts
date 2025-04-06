import { Router } from 'express';
import { createFinancialGoalsController } from '../controller/create-financial-goals.controller';
import { deleteFinancialGoalsController } from '../controller/delete-financial-goals.controller';

const router = Router();

router.post('/financial-goals', createFinancialGoalsController.handle);
router.delete('/financial-goals/:id', deleteFinancialGoalsController.handle);

export default router;
