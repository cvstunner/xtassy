import express from 'express';
import {isAuthorized, isAdmin, isLowPrivileged, isMediumPrivileged, isHighPrivileged} from '../utils/middlewares/auth.js';
import {signUp, signIn, setStatus} from '../controllers/auth.js';

const router = express.Router();

router.get('/', signIn);
router.get('/user', isAuthorized, setStatus);
router.get('/admin', isAuthorized, isLowPrivileged, setStatus);
router.get('/admin/:p', isAuthorized, isAdmin, setStatus);
router.post('/', signUp);

export default router;