import express from 'express';
const router = express.Router();
import { getAllProducts, createNewProduct, updateProduct, deleteProduct, getProduct } from '../../controllers/productsController.js';

import ROLES_LIST from '../../config/roles_list.js';
import verifyRoles from '../../middleware/verifyRoles.js';

router.route('/')
    .get(getAllProducts)
    .post(createNewProduct)
    .put(updateProduct)
    .delete(deleteProduct);

router.route('/:id')
    .get(getProduct);

export default router;
