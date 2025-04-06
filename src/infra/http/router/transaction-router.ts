import { Router } from 'express';
import { createTransactionController } from '../controller/create-transaction.controller-spec';
import { deleteTransactionController } from '../controller/delete-transaction.controller';
import { filterTransactionController } from '../controller/filter-transaction.controller';

const router = Router();

router.post('/transactions', createTransactionController.handle);
router.delete(
  '/transactions/:transactionId',
  deleteTransactionController.handle,
);
router.post('/transactions/filters', filterTransactionController.handle);

export default router;
