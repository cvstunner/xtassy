import express from 'express';
import {isAuthorized, isLowPrivileged} from '../utils/middlewares/auth.js';
import {getAllUsers} from '../controllers/user.js';

const router = express.Router();

router.get('/', isAuthorized, isLowPrivileged, getAllUsers);
{/* router.get('/:slug', getSingleCategory); */}
{/* router.post('/', isAuthorized, isAdmin, createCategory); */}
{/* router.put('/:id', isAuthorized, isAdmin, updateCategory); */}
{/* router.delete('/:id', isAuthorized, isAdmin, deleteCategory); */}

export default router;