import express    from 'express';
import formidable from 'express-formidable';
import {isAuthorized, isMediumPrivileged, isHighPrivileged} from '../utils/middlewares/auth.js';
import {getAllAdmins, updateAdmin, deleteAdmin, deleteUser, setPrivilege, addBanner, getBanners} from '../controllers/admin.js';

const router = express.Router();

router.get('/', isAuthorized, isHighPrivileged, getAllAdmins);
router.get('/banner', getBanners);
router.post('/banner', isAuthorized, isMediumPrivileged, formidable(), addBanner);
router.put('/:id', isAuthorized, isHighPrivileged, updateAdmin); 
router.patch('/:id', isAuthorized, isHighPrivileged, setPrivilege); 
router.delete('/:p/:id', isAuthorized, isHighPrivileged, deleteAdmin); 
router.delete('/:id', isAuthorized, isMediumPrivileged, deleteUser); 

export default router;