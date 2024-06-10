import express from 'express';
import {isAuthorized, isLowPrivileged} from '../utils/middlewares/auth.js';
import {createCategory, getCategories, getSingleCategory, updateCategory, deleteCategory} from '../controllers/category.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:slug', getSingleCategory);
router.post('/', isAuthorized, isLowPrivileged, createCategory);
router.put('/:id', isAuthorized, isLowPrivileged, updateCategory);
router.delete('/:id', isAuthorized, isLowPrivileged, deleteCategory);

export default router;
