import express from 'express';
const router = express.Router();
import { getAllOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder } from '../controllers/ordersController.js';

import ROLES_LIST from '../config/roles_list.js';
import verifyRoles from '../middleware/verifyRoles.js';

// Get all orders (public access)
router.route('/')
    .get(getAllOrders);

// Get order by ID (public access)
router.route('/:id')
    .get(getOrderById);

// Create new order (requires authentication)
router.route('/')
    .post(verifyRoles(ROLES_LIST.User), createOrder);

// Update order status (requires authentication)
router.route('/:id')
    .put(verifyRoles(ROLES_LIST.User), updateOrderStatus);

// Delete order (requires Admin role)
router.route('/:id')
    .delete(verifyRoles(ROLES_LIST.Admin), deleteOrder);

export default router;
