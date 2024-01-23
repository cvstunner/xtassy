import express from 'express';
import formidable from 'express-formidable';
import {isAuthorized, isLowPrivileged} from '../utils/middlewares/auth.js';
import {createProduct, getProducts, getSingleProduct, getProductPhoto, updateProduct, deleteProduct} from '../controllers/product.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:slug', getSingleProduct);
router.get('/photo/:pid', getProductPhoto);
router.post('/', isAuthorized, isLowPrivileged, formidable(), createProduct);
router.put('/:pid', isAuthorized, isLowPrivileged, formidable(), updateProduct);
router.delete('/:pid', isAuthorized, isLowPrivileged, deleteProduct);

export default router;