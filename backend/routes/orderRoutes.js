import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  // updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  removeOrder,
  updateStatus,
  getCount
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.get('/count', protect, getCount)
router.route('/:id').get(protect, getOrderById).delete(protect, removeOrder)
router.route('/updateStatus').put(protect, admin, updateStatus)
// router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, updateOrderToDelivered)

export default router
