import express from 'express'

import { protect, admin } from '../middleware/authMiddleware.js'
import {
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplierById,
    getSuppliers,
    sendSupplierMail,
    getAllIds
} from '../controllers/supplierController.js'


const router = express.Router()

router
  .route('/')
  .get(protect, admin,getSuppliers)
  .post(protect, admin, createSupplier)

router.post('/mail',protect, admin, sendSupplierMail) 
router.get('/getIds',protect, admin, getAllIds) 
router
  .route('/:id')
  .get(protect, admin, getSupplierById)
  .delete(protect, admin, deleteSupplier)
  .put(protect, admin, updateSupplier)

export default router
