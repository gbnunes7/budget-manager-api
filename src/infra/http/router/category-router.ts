import { Router } from 'express';
import { createCategoryController } from '../controller/create-category.controller';
import { deleteCategoryController } from '../controller/delete-category.controller';

const router = Router();

router.post('/category', createCategoryController.handle);
router.delete('/category/:id', deleteCategoryController.handle);

export default router;
